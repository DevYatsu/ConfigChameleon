import JsonViewer from "../components/JsonViewer.tsx";
import Loader from "../components/Loader.tsx";
import useCachedQuery, { AsyncFunction } from "../hooks/useCachedQuery.ts";

export default function Wrapper(
  { queryKey, queryFn }: {
    queryKey: string | string[];
    queryFn: AsyncFunction<any, any>;
  },
) {
  const { isLoading, isError, data } = useCachedQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <JsonViewer
        data={{
          error: [[[[[[[[[[[["Failed to fetch data"]]]]]]]]]]]],
        }}
      />
    );
  }

  if (data === null) {
    return <JsonViewer data={{}} />;
  }

  return <JsonViewer data={data} />;
}
