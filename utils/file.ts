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
