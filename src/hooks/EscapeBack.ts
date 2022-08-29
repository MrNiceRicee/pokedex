import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useEscapeBack = () => {
  const router = useRouter();

  const EscapeHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      router.back();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', EscapeHandler);
    return () => {
      document.removeEventListener('keydown', EscapeHandler);
    };
  });
};

export default useEscapeBack;
