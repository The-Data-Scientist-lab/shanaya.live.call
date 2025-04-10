import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, ArrowRight, Calendar, PhoneCall } from 'lucide-react';
import { VerificationOverlay } from '@/components/payment/VerificationOverlay';

const CheckoutCompletionPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, verifyPayment } = useApp();
  const [timeRemaining, setTimeRemaining] = useState<number>(25);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [orderId] = useState<string>(localStorage.getItem('currentOrderId') || '');
  const [transactionId] = useState<string>("TX" + Math.random().toString(36).substring(2, 10).toUpperCase());
  const [animateIn, setAnimateIn] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!orderId) {
      navigate('/packages');
      return;
    }
    
    // Set animate after a short delay for entrance animation
    setTimeout(() => setAnimateIn(true), 100);
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleVerificationComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    const verifyPaymentResult = async () => {
      try {
        const result = await verifyPayment(orderId);
        if (result) {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        setVerificationStatus('failed');
      }
    };
    
    const handleVerificationComplete = () => {
      verifyPaymentResult();
    };
    
    return () => clearInterval(timer);
  }, [navigate, isAuthenticated, orderId, verifyPayment]);
  
  return (
    <Layout hideFooter={timeRemaining > 0}>
      <div className="py-12 min-h-[80vh] flex items-center">
        <div className="container max-w-2xl">
          {timeRemaining > 0 && verificationStatus === 'pending' ? (
            <VerificationOverlay timeRemaining={timeRemaining} transactionId={transactionId} />
          ) : (
            <Card className={`transition-all duration-1000 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} overflow-hidden shadow-2xl border-0`}>
              {verificationStatus === 'success' ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-vibrant-emerald/20 via-transparent to-transparent"></div>
                  <div className="p-10">
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-30"></div>
                          <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 mb-2">Payment Successful</Badge>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-vibrant-emerald to-vibrant-blue bg-clip-text text-transparent">
                          Your Intimate Session is Confirmed!
                        </h1>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Thank you for booking with us. We'll be in touch shortly with details about your session.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                        <div className="flex items-center p-4 bg-muted/40 rounded-xl">
                          <Calendar className="mr-4 h-6 w-6 text-vibrant-blue" />
                          <div>
                            <p className="text-sm font-medium">Scheduled Within</p>
                            <p className="text-sm text-muted-foreground">24 Hours</p>
                          </div>
                        </div>
                        <div className="flex items-center p-4 bg-muted/40 rounded-xl">
                          <PhoneCall className="mr-4 h-6 w-6 text-vibrant-blue" />
                          <div>
                            <p className="text-sm font-medium">Contact Method</p>
                            <p className="text-sm text-muted-foreground">WhatsApp/Telegram</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full">
                        <Button 
                          onClick={() => navigate('/orders')} 
                          className="w-full bg-gradient-to-r from-vibrant-emerald to-vibrant-blue hover:from-vibrant-emerald hover:to-vibrant-blue text-white font-semibold"
                        >
                          View My Orders
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-transparent"></div>
                  <CardContent className="p-10">
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-red-500 animate-pulse opacity-30"></div>
                          <AlertCircle className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 mb-2">Verification Failed</Badge>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-vibrant-orange bg-clip-text text-transparent">
                          Payment Verification Failed
                        </h1>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          We couldn't verify your payment at this time. Please try again or contact our support team for assistance.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/packages')}
                          className="w-full"
                        >
                          Back to Packages
                        </Button>
                        <Button 
                          onClick={() => navigate('/orders')}
                          className="w-full bg-gradient-to-r from-vibrant-blue to-vibrant-purple text-white"
                        >
                          View My Orders
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutCompletionPage;
