import { ReactNode, Suspense, useEffect } from 'react';
import DarkModeButton from './ToggleDarkMode';

const Layout = ({ children }: { children: ReactNode }) => {
  // add className to html body
  useEffect(() => {
    document.querySelector('body')?.classList.add('bg-zinc-100');
    document.querySelector('body')?.classList.add('transition-all');
    document.querySelector('body')?.classList.add('duration-500');
    document.querySelector('body')?.classList.add('dark:bg-zinc-900');
    return () => {
      document.querySelector('body')?.classList.remove('bg-zinc-100');
      document.querySelector('body')?.classList.add('transition-all');
      document.querySelector('body')?.classList.add('duration-500');
      document.querySelector('body')?.classList.remove('dark:bg-zinc-900');
    };
  }, []);

  return (
    <main className="container mx-auto min-h-screen w-full">
      <nav className="flex flex-row items-center justify-between w-full h-20 px-4 py-2">
        <div className="cursor-not-allowed bg-transparent" />
        <Suspense>
          <DarkModeButton />
        </Suspense>
      </nav>
      <div className="p-safe m-safe w-full h-full flex flex-col items-center justify-center ">
        {children}
      </div>
    </main>
  );
};

export default Layout;
