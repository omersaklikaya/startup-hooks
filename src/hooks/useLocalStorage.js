import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * Syncs state with localStorage. Falls back to initialValue if key doesn't exist.
 * Handles JSON serialization automatically.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if key is not found
 * @returns {[any, Function]} - [storedValue, setValue]
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark');
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`useLocalStorage error for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
