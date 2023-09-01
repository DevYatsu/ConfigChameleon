import { useEffect, useState } from "preact/hooks";

type AsyncFunction<A, O> = (...args: A[]) => Promise<O>;

interface CacheValue {
  value: any;
  subkeys: CacheStorage;
}
type CacheStorage = Record<string, CacheValue>;

export default function useCachedQuery<T>(
  { cacheKeyword, queryFn }: {
    cacheKeyword: string | string[];
    queryFn: AsyncFunction<any, T>;
  },
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await queryFn();
        setCachedLocalStorageItem(cacheKeyword, value);
        setData(value);
      } catch (error) {
        setError(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cacheKeyword, queryFn]);

  return { data, isLoading, isError, error };
}

const CACHED_STORAGE_NAME = "cached_local_storage";
const getCachedLocalStorage = (): CacheStorage => {
  const cachedValue = localStorage.getItem(CACHED_STORAGE_NAME);

  if (cachedValue === null) {
    return {};
  }

  try {
    return JSON.parse(
      cachedValue,
    );
  } catch (_error) {
    return {};
  }
};

const setCachedLocalStorageItem = <T>(
  keyword: string | string[],
  value: T,
) => {
  const storage = getCachedLocalStorage();

  const isArray = Array.isArray(keyword);

  if (isArray) {
    let tempStorage = storage;
    const lastIndex = keyword.length - 1;

    for (let i = 0; i <= lastIndex; i++) {
      const key = keyword[i];
      if (i === lastIndex) {
        tempStorage[key] = { value, subkeys: {} };
      } else {
        tempStorage[key] = tempStorage[key] || { value: null, subkeys: {} };
        tempStorage = tempStorage[key].subkeys;
      }
    }
  } else {
    storage[keyword as string] = { value, subkeys: {} };
  }

  localStorage.setItem(CACHED_STORAGE_NAME, JSON.stringify(storage));
};
