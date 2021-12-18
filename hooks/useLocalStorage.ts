import { useState } from 'react';

const LOCAL_STORAGE_KEY_PREFIX = 'astralstonk';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const realKey = `${LOCAL_STORAGE_KEY_PREFIX}:${key}`;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(realKey);

      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);

      return initialValue;
    }
  });

  const setValue = (value: T | ((value: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      valueToStore !== undefined
        ? window.localStorage.setItem(realKey, JSON.stringify(valueToStore))
        : window.localStorage.removeItem(realKey);

      setStoredValue(valueToStore);
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue] as const;
};
