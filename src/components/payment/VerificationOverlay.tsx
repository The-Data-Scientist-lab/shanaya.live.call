import React from 'react';
import { CircleCheck, Clock, Loader, Shield, Lock, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VerificationOverlayProps {
  timeRemaining: number;
  transactionId?: string;
}

export const VerificationOverlay: React.FC<VerificationOverlayProps> = ({ 
  timeRemaining, 
  transactionId = "TX" + Math.random().toString(36).substring(2, 10).toUpperCase()
}) => {
  const progressPercent = ((25 - timeRemaining) / 25) * 100;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-lg z-50">
      <div className="bg-gradient-to-br from-background to-accent/20 rounded-2xl p-10 max-w-md w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-accent/20 animate-fade-in">
        <div className="mb-8">
          <div className="relative mx-auto h-24 w-24 mb-8">
            {timeRemaining > 0 ? (
              <div className="animate-pulse relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-vibrant-blue via-vibrant-purple to-vibrant-pink opacity-20 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="h-16 w-16 text-vibrant-purple animate-spin" strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-primary animate-bounce" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-red-600 to-red-700 opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pop-in">
                    <XCircle className="h-16 w-16 text-red-500" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
              </div>
            )}
          </div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-shake">
            {timeRemaining > 0 ? "Verifying Payment" : "Verification Failed"}
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg">
            {timeRemaining > 0 
              ? "Please wait while our secure system confirms your transaction 🔒" 
              : "We're having trouble verifying your payment. Please try again in a few minutes."}
          </p>
          
          {timeRemaining > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Security Verification</p>
                  <Lock className="h-4 w-4 text-vibrant-purple" />
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-medium text-vibrant-purple">{timeRemaining}s</p>
                  <p className="text-xs text-muted-foreground ml-1">remaining</p>
                </div>
              </div>
              
              <div className="relative">
                <Progress value={progressPercent} className="h-3 bg-muted rounded-full overflow-hidden" />
                <div className="absolute top-0 left-0 h-3 w-full bg-gradient-to-r from-vibrant-blue to-vibrant-purple opacity-70 rounded-full"
                  style={{ width: `${progressPercent}%`, transition: 'width 1s ease' }}
                ></div>
                <div className="absolute top-0 right-0 h-3 w-3 bg-white rounded-full shadow-lg"
                  style={{ left: `${progressPercent}%`, transition: 'left 1s ease' }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-sm rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 p-5 shadow-inner">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Transaction ID:</p>
              <p className="text-muted-foreground font-mono">{transactionId}</p>
            </div>
            <div className="bg-gradient-to-r from-vibrant-blue to-vibrant-purple p-[1px] rounded-full">
              <div className="bg-background rounded-full p-2">
                <Shield className="h-5 w-5 text-vibrant-purple" />
              </div>
            </div>
          </div>
          {timeRemaining > 0 ? (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <p>The verification process is completely secure. Please do not close this window.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <p>Your payment information is encrypted and protected</p>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-red-400">
                <XCircle className="h-3 w-3" />
                <p>Payment verification failed. Please try again.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <XCircle className="h-3 w-3 text-red-400" />
                <p>If the problem persists, please contact support</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
