export default function B(
  { onClick }: { onClick: (event: MouseEvent) => void | Promise<void> },
) {
  return (
    <button
      onClick={onClick}
      class="relative inline-block px-4 py-2 font-medium group"
    >
      <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0">
      </span>
      <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black">
      </span>
      <span class="relative text-black group-hover:text-white">
        Refresh <span class="group-hover:hidden">?</span>
      </span>
    </button>
  );
}
