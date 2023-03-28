import { useCallback, useEffect, useState } from 'react';

/** a Hook for SIMPLE caching & retrieved data from localStorage */
const useCachedState = (key: string, initialValue: any, append?: string) :
[string, (value:any)=>void, ()=>void] => {

  const getValue = () => {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(_key);
        /* Parse stored json or if none, return initialValue */
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      // If error also return initialValue and handle error - needs work
      return initialValue;
    }
    return initialValue;
  };
    
  const _key = append ? `${key}_${append}` : key;
  const [storedValue, setStoredValue] = useState(()=> getValue());

  const setValue = useCallback(
    (value: any) => {
      try {
        if (typeof window !== 'undefined') {
          // For same API as useState
          const valueToStore = value instanceof Function ? value(storedValue) : value;
          setStoredValue(valueToStore);
          localStorage.setItem(_key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // TODO: handle the error cases needs work
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [_key, storedValue]
  );

  /* Clear the cache, either specific keys (as an array) or all if no keys provided */
  const clear = (keys: string[] = []) => {
    if (typeof window === 'undefined') return;
    if (keys.length > 0) {
      keys.forEach((k: string) => {
        window.localStorage.removeItem(k);
      });
    } else window.localStorage.clear();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') setValue(storedValue);
  }, [_key, setValue, storedValue]);

  return [storedValue, setValue, clear];
};

export default useCachedState;
