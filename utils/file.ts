import { ErrorToast, SuccessToast } from "./Toast.ts";

export const fetchDataAndDownloadFile = async (
  initialFile: File | null,
  filetype: string,
  outputType: string,
) => {
  if (initialFile) {
    const formData = new FormData();
    formData.append("file", initialFile);

    const url = `/${filetype}/${outputType}`;

    if (outputType.toLowerCase() === "beautifier") {
      outputType = filetype;
    }

    try {
      const response = await fetch(url, { method: "POST", body: formData });

      if (!response.ok) {
        const err = await response.text();
        ErrorToast(
          `${err}`,
        );
        return;
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
      ErrorToast(`Error: Are you sure the file content is valid ${filetype} ?`);
      console.error("Error fetching or downloading:", error);
    }
  }
};

export function isFileSizeTooLarge(file: File, maxSizeInBytes: number) {
  return file.size > maxSizeInBytes;
}

export function getNameWithoutExtension(arr: File): string {
  const nameArr = arr.name.split(".");
  nameArr.pop();
  return nameArr.join(".");
}

export function downloadFile(name: string, blob: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = name;

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
}

const getFileExtensionFromMimeType = function (mimeType: string): string {
  const parts = mimeType.split("/");
  if (parts.length === 2) {
    return parts[1];
  }
  return mimeType;
};

export function generateFile(content: string, mimeType: string) {
  const encoder = new TextEncoder();
  const Uint8Array = encoder.encode(content);
  const options = {
    lastModified: Date.now(),
    type: mimeType,
  };

  const blob = new Blob([Uint8Array], {
    ...options,
  });

  return new File(
    [blob],
    `converted_file${getFileExtensionFromMimeType(mimeType)}`,
    options,
  );
}
