import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="container mx-auto min-h-screen p-4">
      <div className="p-safe m-safe w-full h-full flex flex-col items-center justify-center ">{children}</div>
    </main>
  );
};

export default Layout;
