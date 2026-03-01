import { useEffect, useState } from "react";

const STORAGE_KEY = "react-arsenal-dark-mode";

/**
 * Persists the dark-mode preference in localStorage and syncs it with the
 * `data-theme="dark"` attribute on `<html>` so global CSS variables work.
 */
function useDarkMode(): [boolean, (val: boolean) => void] {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 1️⃣  Honour explicit user preference stored in localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "true";

    // 2️⃣  Fall back to OS preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    localStorage.setItem(STORAGE_KEY, String(isDark));
  }, [isDark]);

  return [isDark, setIsDark];
}

export default useDarkMode;
