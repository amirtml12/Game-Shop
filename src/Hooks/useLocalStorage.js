import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
  // ۱. مقدار اولیه را از حافظه می‌گیرد
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  });

  // ۲. هر وقت مقدار عوض شد، خودکار در حافظه ذخیره می‌کند
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}