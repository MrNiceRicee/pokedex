import { useAtom } from 'jotai';
import { useEffect } from 'react';
import darkMode from '../context/darkMode';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(darkMode);
  const toggleDarkMode = (newBool: boolean) => {
    setIsDarkMode(newBool);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !isDarkMode) {
      const mediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      // if the user has not set a preference, use the system preference
      setIsDarkMode(mediaQuery);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode] as [
    typeof isDarkMode,
    typeof toggleDarkMode
  ];
};

export default useDarkMode;
