import { PageProps } from "$fresh/server.ts";

export default function Page(props: PageProps) {
  console.log(props);
  return <div>csv page</div>;
}
