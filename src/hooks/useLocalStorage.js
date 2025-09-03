import { useEffect, useState } from "react";

export function useLocalStorage(key, initValue) {
  const [ state, setState ] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}