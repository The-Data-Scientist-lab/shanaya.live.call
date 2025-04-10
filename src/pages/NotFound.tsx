
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="py-20">
        <div className="container text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-7xl font-serif font-bold bg-gradient-to-br from-vibrant-purple to-vibrant-blue bg-clip-text text-transparent mb-4">404</h1>
            <h2 className="text-2xl font-medium mb-6">Page not found</h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved to another location.
            </p>
            <Button 
              className="button-gradient"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
