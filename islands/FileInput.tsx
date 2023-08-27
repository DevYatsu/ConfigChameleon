import { useEffect, useState } from "preact/hooks";
import { downloadFile, getNameWithoutExtension } from "../utils/file.ts";
import { Head } from "$fresh/runtime.ts";
import { ErrorToast, SuccessToast } from "../utils/Toast.ts";

export default function FileInput(
  { filetype, outputType }: { filetype: string; outputType: string },
) {
  const [initialFile, setInitialFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => { // cant find the OnChange event type with preact
    const file: File = e?.target?.files[0];
    console.dir(e?.target);
    if (file.type.indexOf(filetype) === -1) {
      ErrorToast(`Invalid file type! Expected '${filetype}' file`);
      throw new Error(`Invalid file type! Expected '${filetype}' file`);
    }
    if (file) {
      setInitialFile(file);
    }
  };

  useEffect(() => {
    const fetchDataAndDownload = async () => {
      if (initialFile) {
        const formData = new FormData();
        formData.append("file", initialFile);

        const url = `/${filetype}/${outputType}`;

        try {
          const response = await fetch(url, { method: "POST", body: formData });

          if (!response.ok) {
            const err = await response.text();
            ErrorToast(err);
            throw new Error(err);
          }

          const blob = await response.blob();

          const outputFileName = `${
            getNameWithoutExtension(initialFile)
          }.${outputType}`;
          SuccessToast(
            `${initialFile.name} was successfully converted to ${outputType}`,
          );
          downloadFile(outputFileName, blob);
        } catch (error) {
          ErrorToast(error);
          console.error("Error fetching or downloading:", error);
        }
      }
    };

    fetchDataAndDownload();
  }, [initialFile]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        />
      </Head>
      <div class="flex justify-center py-8 px-5 h-full">
        <div class="input-div">
          <input
            class="input"
            name="file"
            type="file"
            accept={`.${filetype}`}
            onInput={handleFileChange}
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
      </div>
    </>
  );
}
