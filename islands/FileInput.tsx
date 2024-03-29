import { useEffect, useState } from "preact/hooks";
import { asset, Head } from "$fresh/runtime.ts";
import { ErrorToast } from "../utils/Toast.ts";
import { fetchDataAndDownloadFile, isFileSizeTooLarge } from "../utils/file.ts";
import Loader from "../components/Loader.tsx";
import { signal } from "@preact/signals";

const isLoading = signal(false);
const initialFile = signal<File | null>(null);

export default function FileInput(
  { filetype, outputType }: { filetype: string; outputType: string },
) {
  const handleFileChange = (e: any) => {
    if (!e.target?.files[0]) {
      return;
    }

    const file: File = e.target.files[0];
    if (file.type.indexOf(filetype) === -1) {
      ErrorToast(`Invalid file type! Expected '${filetype}' file`);
      initialFile.value = null;

      return;
    }
    if (isFileSizeTooLarge(file, 15 * 1024 * 1024)) {
      ErrorToast("File Size exceeds 10 MB! Cannot Proceed file!");
      initialFile.value = null;
      return;
    }
    if (file) {
      initialFile.value = file;
    }
  };

  useEffect(() => {
    if (initialFile.value) {
      if (initialFile.value.size === 0) {
        ErrorToast("Cannot process empty file");
        return;
      }
      isLoading.value = true;
      DownloadFile();
    }
    async function DownloadFile() {
      try {
        await fetchDataAndDownloadFile(
          initialFile.value,
          filetype,
          outputType,
        );
      } catch (error) {
        console.log(error);
        initialFile.value = null;
      } finally {
        isLoading.value = false;
      }
    }
  }, [initialFile.value]);

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={asset(
            "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css",
          )}
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={asset(
            "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css",
          )}
        />
      </Head>
      <div class="flex justify-center py-8 px-5 h-full">
        {isLoading.value
          ? (
            <div class="pt-52">
              <Loader />
            </div>
          )
          : <Input filetype={filetype} onInput={handleFileChange} />}
      </div>
    </>
  );
}

function Input(
  { filetype, onInput }: { filetype: string; onInput: (e: unknown) => void },
) {
  return (
    <div class="input-div file-input-container">
      <input
        class="input file-input"
        name="file"
        type="file"
        accept={`.${filetype}`}
        onInput={onInput}
        aria-label={"file input"}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        stroke-linejoin="round"
        stroke-linecap="round"
        viewBox="0 0 24 24"
        stroke-width="2"
        fill="none"
        stroke="currentColor"
        class="icon"
      >
        <polyline points="16 16 12 12 8 16"></polyline>
        <line y2="21" x2="12" y1="12" x1="12"></line>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
        <polyline points="16 16 12 12 8 16"></polyline>
      </svg>
    </div>
  );
}
