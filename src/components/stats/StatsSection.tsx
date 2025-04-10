import React from 'react';
import { Star, CheckCircle, Shield, Users } from 'lucide-react';
import { StatCounter } from './StatCounter';
import { useStats } from '@/context/StatsContext';

export const StatsSection = () => {
  const { sessionsDelivered, epicLines } = useStats();
  
  return (
    <section className="py-16 bg-gradient-to-br from-background/50 to-muted/30 relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-vibrant-purple to-vibrant-magenta bg-clip-text text-transparent">
            Trusted by Adults Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our exclusive community of satisfied clients who enjoy premium intimate experiences
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter 
            end={5} 
            label="Star Rating" 
            suffix=".0" 
            icon={<Star className="h-10 w-10 text-vibrant-orange" fill="currentColor" />} 
          />
          
          <StatCounter 
            end={752} 
            label="Happy Clients" 
            icon={<Users className="h-10 w-10 text-vibrant-purple" />} 
          />
          
          <StatCounter 
            end={sessionsDelivered} 
            label="Sessions Delivered" 
            icon={<CheckCircle className="h-10 w-10 text-vibrant-blue" />} 
          />
          
          <StatCounter 
            end={epicLines} 
            label="Epic Lines" 
            icon={<Shield className="h-10 w-10 text-vibrant-orange" />} 
          />
        </div>
        
        <div className="flex justify-center mt-16 space-x-6">
          <div className="flex items-center bg-background/80 backdrop-blur px-6 py-3 rounded-full shadow-md border border-primary/10">
            <div className="bg-green-500 rounded-full p-1 mr-3">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-medium">Verified Service</span>
          </div>
          
          <div className="flex items-center bg-background/80 backdrop-blur px-6 py-3 rounded-full shadow-md border border-primary/10">
            <div className="bg-vibrant-blue rounded-full p-1 mr-3">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-medium">Trustworthy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
