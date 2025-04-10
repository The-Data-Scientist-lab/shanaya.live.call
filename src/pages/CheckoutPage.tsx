import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, Check, ArrowRight, CreditCard, ShieldCheck, Clock, Shield, Lock } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const CheckoutSteps = ({ currentStep }: { currentStep: 1 | 2 }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep === 1 
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
          : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <div className={`h-1 w-12 ${currentStep === 1 ? 'bg-muted' : 'bg-gradient-to-r from-pink-500 to-purple-500'}`}></div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep === 2 
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
          : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, selectedPackage, createOrder, verifyPayment } = useApp();
  
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'telegram'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [transactionId] = useState<string>("TX" + Math.random().toString(36).substring(2, 10).toUpperCase());
  
  // Redirect if not authenticated or no package selected
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!selectedPackage) {
      navigate('/packages');
      return;
    }
  }, [isAuthenticated, selectedPackage, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!contactValue) {
      setError(`Please provide your ${contactMethod === 'whatsapp' ? 'WhatsApp number' : 'Telegram username'}`);
      return;
    }
    
    if (!selectedPackage) {
      setError('No package selected. Please select a package first.');
      return;
    }
    
    try {
      setIsProcessing(true);
      const newOrder = await createOrder(selectedPackage.id, contactMethod, contactValue);
      setOrder(newOrder);
    } catch (err: any) {
      setError(err.message || 'Failed to create order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePaymentVerification = async () => {
    setIsVerifying(true);
    setCountdown(25);
    
    // Start countdown timer and update progress
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setVerificationFailed(true);
          setIsVerifying(false);
          return 0;
        }
        return prev - 1;
      });
      
      setVerificationProgress(prev => {
        const newProgress = prev + 4;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 1000);
    
    try {
      localStorage.setItem('currentOrderId', order.id);
      setTimeout(() => {
        navigate('/checkout/completion');
      }, 3000);
    } catch (err) {
      setVerificationFailed(true);
      setIsVerifying(false);
    }
  };
  
  if (!selectedPackage) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <Layout className="bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="py-12 min-h-[80vh]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">Checkout</Badge>
              <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-vibrant-purple via-vibrant-pink to-vibrant-orange bg-clip-text text-transparent">
                Complete Your Booking
              </h1>
              <p className="mt-2 text-muted-foreground">
                You're just a few steps away from your exclusive intimate session
              </p>
            </div>
            
            <CheckoutSteps currentStep={order ? 2 : 1} />
            
            {!order ? (
              <Card className="border rounded-2xl shadow-xl bg-white/50 dark:bg-black/20 backdrop-blur-md overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Contact Details</CardTitle>
                    <Badge variant="outline" className="bg-accent/30 text-accent-foreground">Step 1 of 2</Badge>
                  </div>
                  <CardDescription>
                    Please provide your contact information for scheduling your intimate session
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p>{error}</p>
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-300/20">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 mb-2">
                              Selected Package
                            </Badge>
                            <h4 className="font-semibold text-xl">{selectedPackage.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{selectedPackage.description}</p>
                          </div>
                          <div className="mt-4 md:mt-0 md:text-right">
                            <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                            <div className="text-2xl font-bold">₹{selectedPackage.price}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-base">Preferred Contact Method</Label>
                          <RadioGroup 
                            value={contactMethod} 
                            onValueChange={(value) => setContactMethod(value as 'whatsapp' | 'telegram')}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div className={`relative rounded-lg border p-4 cursor-pointer flex items-center space-x-2 ${contactMethod === 'whatsapp' ? 'border-green-500 bg-green-500/5' : 'border-border'}`}>
                              <RadioGroupItem value="whatsapp" id="whatsapp" className="text-green-500" />
                              <Label htmlFor="whatsapp" className="cursor-pointer font-medium">WhatsApp</Label>
                              {contactMethod === 'whatsapp' && (
                                <Check className="h-4 w-4 text-green-500 absolute top-2 right-2" />
                              )}
                            </div>
                            <div className={`relative rounded-lg border p-4 cursor-pointer flex items-center space-x-2 ${contactMethod === 'telegram' ? 'border-blue-500 bg-blue-500/5' : 'border-border'}`}>
                              <RadioGroupItem value="telegram" id="telegram" className="text-blue-500" />
                              <Label htmlFor="telegram" className="cursor-pointer font-medium">Telegram</Label>
                              {contactMethod === 'telegram' && (
                                <Check className="h-4 w-4 text-blue-500 absolute top-2 right-2" />
                              )}
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="contactValue" className="text-base">
                            {contactMethod === 'whatsapp' ? 'WhatsApp Number' : 'Telegram Username'}
                          </Label>
                          <Input 
                            id="contactValue" 
                            placeholder={contactMethod === 'whatsapp' ? '+91 98765 43210' : '@username'}
                            value={contactValue}
                            onChange={(e) => setContactValue(e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                            Processing...
                          </>
                        ) : (
                          <>
                            Continue to Payment
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border rounded-2xl shadow-xl bg-white/50 dark:bg-black/20 backdrop-blur-md overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Complete Payment</CardTitle>
                    <Badge variant="outline" className="bg-accent/30 text-accent-foreground">Step 2 of 2</Badge>
                  </div>
                  <CardDescription>
                    Scan the QR code below to complete your payment
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-8">
                  {verificationFailed ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="bg-red-50 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-600">Payment Verification Failed</h3>
                        <p className="text-muted-foreground mt-2">
                          We're having trouble verifying your payment. Please try again in a few minutes.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/orders')}
                        className="mt-4"
                      >
                        View Orders
                      </Button>
                    </div>
                  ) : isVerifying ? (
                    <div className="text-center py-8 space-y-6">
                      <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                          <circle 
                            cx="50" cy="50" r="48" 
                            fill="none" 
                            stroke="url(#gradient)" 
                            strokeWidth="4"
                            strokeDasharray={`${verificationProgress * 3}, 1000`} 
                            transform="rotate(-90 50 50)"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ec4899" />
                              <stop offset="50%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Clock className="h-10 w-10 text-purple-500" />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                          Verifying Your Payment
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          Please wait while we process your transaction securely
                        </p>
                      </div>
                      
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Verification in progress</span>
                          <span className="font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{countdown} seconds remaining</span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                            style={{ width: `${verificationProgress}%`, transition: 'width 1s ease-in-out' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/40 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Lock className="h-4 w-4 text-purple-500 mr-2" />
                            <span className="text-sm font-medium">Transaction ID:</span>
                          </div>
                          <span className="text-sm">{transactionId}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-1/2">
                        <div className="relative bg-white p-6 rounded-xl shadow-lg border border-muted flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 animate-pulse rounded-xl"></div>
                          <img 
                            src="/lovable-uploads/ca72ef42-76be-4e48-b1d1-581c01071462.png" 
                            alt="Payment QR Code" 
                            className="w-full h-auto object-contain relative z-10"
                          />
                        </div>
                        <div className="text-center mt-3">
                          <Badge variant="outline" className="bg-accent/50 text-accent-foreground">
                            <ShieldCheck className="h-3 w-3 mr-1" /> Secure Payment
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/2 space-y-6">
                        <div className="rounded-lg border bg-white/50 dark:bg-black/20 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold">{selectedPackage.name}</h3>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                              <p className="text-xs text-muted-foreground mt-1">Transaction ID: {transactionId}</p>
                            </div>
                            <Badge variant="outline" className="bg-accent/30 text-accent-foreground">UPI / Net Banking</Badge>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Package Price</span>
                              <span>₹{selectedPackage.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Convenience Fee</span>
                              <span>₹0.00</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                              <span>Total</span>
                              <span className="text-lg">₹{selectedPackage.price}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handlePaymentVerification}
                          className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                        >
                          <CreditCard className="mr-2 h-5 w-5" />
                          I've Made the Payment
                        </Button>
                        
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <Shield className="h-3 w-3 mr-1" />
                          <span>Your payment information is encrypted and secure</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
