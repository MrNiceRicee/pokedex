import { useRouter } from 'next/router';
import { useEffect } from 'react';

type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ZeroToNine = 0 | OneToNine;
type ToThousands =
  | `${OneToNine}`
  | `${OneToNine}${ZeroToNine}`
  | `${OneToNine}${ZeroToNine}${ZeroToNine}`;

type PossibleRoutes = '/' | `/pokemon/${ToThousands}`;
const useEscapeBack = (route?: PossibleRoutes) => {
  const router = useRouter();

  const EscapeHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (route) {
        return router.push(route);
      }
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
