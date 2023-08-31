type AsyncFunction<A, O> = (...args: any) => Promise<O>;

type CacheValue = { value: any; subkeys: CacheStorage };
type CacheStorage = Record<string, CacheValue>;

export default async function useCachedQuery<T>(
  { cacheKeyword, queryFn }: {
    cacheKeyword: string | string[];
    queryFn: AsyncFunction<any, T>;
  },
) {
  const responseObj: {
    data: T | null;
    isError: boolean;
    isLoading: boolean;
    error: any;
  } = {
    data: null,
    isError: false,
    isLoading: true,
    error: null,
  };

  try {
    const value = await queryFn();

    if (typeof cacheKeyword === "string") {
      setCachedLocalStorageItem(cacheKeyword, value);
    } else {
      // todo!!!
      setCachedLocalStorageItem(cacheKeyword, value);
    }
  } catch (error) {
    responseObj.error = error;
    responseObj.isError = true;
  } finally {
    responseObj.isLoading = false;
  }

  return responseObj;
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

  if (typeof keyword === "string") {
    storage[keyword] = { value, subkeys: {} };
    localStorage.setItem(CACHED_STORAGE_NAME, JSON.stringify(storage));
  } else {
    // need update here
    // todo!

    for (let i = 0; i < keyword.length; i++) {
      if (i === keyword.length - 1) {
        storage[keyword[i]] = { value: value, subkeys: {} }; // update here
        break;
      }
      if (i === 0) {
        storage[keyword[i]] = { value: null, subkeys: {} };
        break;
      }

      let temp_val: CacheValue = storage[keyword[0]];
      for (const j = 1; j < i; i++) {
        temp_val = temp_val.subkeys[keyword[j]];
      }
      storage[i] = { value: null, subkeys: {} }; // update here
    }

    localStorage.setItem(CACHED_STORAGE_NAME, JSON.stringify(storage));
  }
};
