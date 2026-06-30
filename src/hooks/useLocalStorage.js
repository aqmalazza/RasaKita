import { useCallback, useEffect, useState } from "react";

function readStorageValue(key, initialValue) {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readStorageValue(key, initialValue)
  );

  const setValue = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(
          new CustomEvent("local-storage:update", {
            detail: { key, value: valueToStore },
          })
        );

        return valueToStore;
      });
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key && event.key !== key) {
        return;
      }

      setStoredValue(readStorageValue(key, initialValue));
    };

    const handleCustomStorageChange = (event) => {
      if (event.detail?.key === key) {
        setStoredValue(event.detail.value);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage:update", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "local-storage:update",
        handleCustomStorageChange
      );
    };
  }, [initialValue, key]);

  return [storedValue, setValue];
}
