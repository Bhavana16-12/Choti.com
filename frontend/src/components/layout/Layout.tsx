import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};
