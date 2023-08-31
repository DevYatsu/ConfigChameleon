import JsonViewer from "../components/JsonViewer.tsx";
import Loader from "../components/Loader.tsx";
import { QueryFunction, useQuery } from "npm:@tanstack/react-query";

export default function Wrapper(
  { cacheKeyword, queryFn }: {
    cacheKeyword: string | string[];
    queryFn: QueryFunction<any, string[], any>;
  },
) {
  const { isLoading, isError, data } = useQuery({
    queryKey: typeof cacheKeyword === "string" ? [cacheKeyword] : cacheKeyword,
    queryFn: queryFn,
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

  return <JsonViewer data={data} />;
}
