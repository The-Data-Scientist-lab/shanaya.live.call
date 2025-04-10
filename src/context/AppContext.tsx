import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  duration?: string;
}

export interface Order {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  status: 'pending' | 'paid' | 'failed' | 'completed';
  contactMethod: 'whatsapp' | 'telegram';
  contactValue: string;
  createdAt: Date;
  totalAmount: number;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  orders: Order[];
  videoPackages: Package[];
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone?: string) => Promise<void>;
  logout: () => void;
  createOrder: (packageId: string, contactMethod: 'whatsapp' | 'telegram', contactValue: string) => Promise<Order>;
  verifyPayment: (orderId: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | null>(null);

// Updated packages with adult video service descriptions
const DEFAULT_PACKAGES: Package[] = [
  {
    id: '1',
    name: 'Quick Pleasure',
    price: 299,
    description: 'Brief intimate video session for a quick connection',
    features: ['10 minute Nude video call', 'One-on-one experience', '4K quality', 'Discreet scheduling'],
    duration: '10 mins'
  },
  {
    id: '2',
    name: 'Standard Delight',
    price: 349,
    description: 'Standard length intimate video session with enhanced features',
    features: ['20 minute Nude video call', '4K quality', 'Personalized experience', 'Flexible scheduling'],
    duration: '20 mins'
  },
  {
    id: '3',
    name: 'Premium Fantasy',
    price: 399,
    description: 'Extended premium quality intimate video session',
    features: ['30 minute Nude video call', '4K quality', 'Priority scheduling', 'Custom requests'],
    popular: true,
    duration: '30 mins'
  },
  {
    id: '4',
    name: 'VIP Experience',
    price: 459,
    description: 'VIP treatment with extended time and exclusive features',
    features: ['45 minute Nude video call', '4K quality', 'VIP treatment', 'Exclusive access'],
    duration: '45 mins'
  },
  {
    id: '5',
    name: 'Ultimate Pleasure',
    price: 499,
    description: 'My most comprehensive intimate video experience',
    features: ['60 minute Nude video call', '4K quality', 'Ultimate experience', 'Priority support'],
    duration: '60 mins'
  },
  {
    id: '6',
    name: 'Recorded video',
    price: 699,
    description: 'Recorded Nude video package',
    features: ['3 x 20 minute Nude Videos', 'Allow Download', '4K quality', 'Flexible timing'],
    duration: '3 x 20 mins'
  },
  {
    id: '7',
    name: 'Recorded video',
    price: 749,
    description: 'Recorded Nude video and photos package',
    features: ['4 x 30 minute Nude Videos', '20 photos', 'Allow Download', '4K quality', 'Flexible timing'],
    duration: '4 x 30 mins'
  },
  {
    id: '8',
    name: 'Recorded custom video',
    price: 999,
    description: 'Recorded custom video package',
    features: ['10 x 30 minute Nude Videos', '50 photos', 'Allow Download', '4K quality', 'Flexible timing', 'Custom requests', 'Any time booking'],
    duration: '`10 x 30 mins'
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [videoPackages] = useState<Package[]>(DEFAULT_PACKAGES);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { toast } = useToast();

  // Simulate loading user data from localStorage on init
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedOrders = localStorage.getItem('orders');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    }
    
    setIsLoading(false);
  }, []);

  // Simulate API login
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app this would be handled by backend
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      // Create mock user - in real app this would come from backend
      const mockUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0],
      };
      
      // Store in localStorage to persist session
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate API signup
  const signup = async (name: string, email: string, phone?: string) => {
    try {
      setUser({ id: Math.random().toString(36).substring(2, 9), name, email, phone });
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const createOrder = async (packageId: string, contactMethod: 'whatsapp' | 'telegram', contactValue: string) => {
    if (!user) throw new Error("You must be logged in to place an order");
    
    const pkg = videoPackages.find(p => p.id === packageId);
    if (!pkg) throw new Error("Invalid package selected");
    
    // Create the order
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      packageId,
      packageName: pkg.name,
      status: 'pending',
      contactMethod,
      contactValue,
      createdAt: new Date(),
      totalAmount: pkg.price,
    };
    
    // Add to orders
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return newOrder;
  };

  const verifyPayment = async (orderId: string) => {
    // Simulate payment verification delay
    await new Promise(resolve => setTimeout(resolve, 25000));
    
    // Always fail the payment for simulation
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'failed' as const } 
        : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return false; // Payment failed
  };

  return (
    <AppContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        orders,
        videoPackages,
        selectedPackage,
        setSelectedPackage,
        login,
        signup,
        logout,
        createOrder,
        verifyPayment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
