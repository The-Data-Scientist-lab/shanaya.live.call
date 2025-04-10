import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ModeToggle } from '@/components/ModeToggle';
import { LogIn, UserPlus, User, History } from 'lucide-react';

export const Header = () => {
  const { isAuthenticated, logout, user } = useApp();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-blue bg-clip-text text-transparent">
            Shanaya.Live
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/packages" className="font-medium transition-colors hover:text-primary">
            Packages
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className="font-medium transition-colors hover:text-primary">
              My Orders
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/orders">
                <Button variant="outline" size="sm" className="hidden md:flex gap-1">
                  <History className="h-4 w-4" />
                  <span>Orders</span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-block text-sm font-medium">
                  {user?.name}
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-1">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden md:inline-block">Login</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm" className="gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden md:inline-block">Sign Up</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
