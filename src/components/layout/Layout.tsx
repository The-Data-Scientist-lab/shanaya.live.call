
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideFooter = false,
  className = "",
  containerClassName = ""
}) => {
  return (
    <div className={`flex min-h-screen flex-col ${className} bg-pattern`}>
      <Header />
      <main className={`flex-1 w-full ${containerClassName}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};
