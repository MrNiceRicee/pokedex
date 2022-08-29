import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      {children}
    </main>
  );
};

export default Layout;
