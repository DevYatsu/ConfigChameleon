export default function FileInput({ filetype }: { filetype: string }) {
  return (
    <form>
      <label class="block">
        <span class="sr-only">Choose {filetype} file</span>
        <input
          type="file"
          accept={`.${filetype}`}
          class="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600
    "
        />
      </label>
    </form>
  );
}
