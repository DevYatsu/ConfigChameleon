import { useEffect, useState } from "preact/hooks";

export default function FileInput(
  { filetype, outputType }: { filetype: string; outputType: string },
) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => { // cant find the OnChange event type with preact
    const file = e?.target?.files[0];
    if (file.type.indexOf("json") === -1) {
      throw new Error("Invalid File Type!");
    }
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);

      const url = `/${filetype}/${outputType}`;

      fetch(url, { method: "POST", body: formData }).then((res) =>
        console.log(res)
      ).catch((err) => console.log(err));
    }
  }, [file]);

  return (
    <div class="flex justify-center py-8 px-5 h-full">
      <div class="input-div">
        <input
          class="input"
          name="file"
          type="file"
          accept={`.${filetype}`}
          onChange={handleFileChange}
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
  );
}
