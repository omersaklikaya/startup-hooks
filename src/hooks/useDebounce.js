import { useState, useEffect } from 'react';

/**
 * useDebounce
 * Delays updating a value until after a specified wait period.
 * Perfect for search inputs, API calls, and expensive re-renders.
 *
 * @param {*} value - the value to debounce
 * @param {number} delay - debounce delay in milliseconds (default: 500)
 * @returns {*} - the debounced value
 *
 * @example
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 400);
 *
 * useEffect(() => {
 *   fetchResults(debouncedSearch); // only fires 400ms after user stops typing
 * }, [debouncedSearch]);
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
