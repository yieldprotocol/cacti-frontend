import { useEffect, useState } from 'react';

const getStorageValue = (key: string, defaultValue: string) => {
  if (typeof window === 'undefined') return defaultValue;
  const itemInLocalStorage: string | boolean | null = JSON.parse(localStorage.getItem(key)!);
  return itemInLocalStorage ?? defaultValue;
};

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState<string | boolean>(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
