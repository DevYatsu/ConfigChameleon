import JsonViewer from "../components/JsonViewer.tsx";
import Loader from "../components/Loader.tsx";
import useQuery, { QueryFunction } from "../hooks/useQuery.ts";

export default function Wrapper<A,>(
  { queryKey, queryFn }: {
    queryKey: string | string[];
    queryFn: QueryFunction<Record<string, string | [] | object | number>>;
  },
) {
  const { isLoading, isError, error, data } = useQuery(queryKey, queryFn);
  console.log({ isLoading, isError, data });

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

  return <JsonViewer data={data} />;
}
