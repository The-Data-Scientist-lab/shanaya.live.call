import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Video, ChevronRight, Star, ShieldCheck, Users, Clock, MessageCircle, PhoneCall, Gift, Sparkles, Headphones, CalendarCheck, Gem, Heart, ScreenShare, Crown, PlayCircle, Award, Check, Lock, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatsSection } from '@/components/stats/StatsSection';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const navigate = useNavigate();
  const { videoPackages, setSelectedPackage, isAuthenticated } = useApp();
  
  const featuredPackages = videoPackages.slice(0, 4);
  
  const handleSelectPackage = (packageId: string) => {
    const selected = videoPackages.find(pkg => pkg.id === packageId);
    if (selected) {
      setSelectedPackage(selected);
      navigate('/packages');
    }
  };
  
  const features = [
    {
      icon: <Video className="h-10 w-10 text-vibrant-purple" />,
      title: "Crystal Clear Quality",
      description: "Crystal clear intimate video sessions with premium quality 💋",
    },
    {
      icon: <Shield className="h-10 w-10 text-vibrant-pink" />,
      title: "100% Private",
      description: "Enjoy completely private intimate sessions 🔥",
    },
    {
      icon: <Clock className="h-10 w-10 text-vibrant-orange" />,
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience ⏰",
    },
    {
      icon: <Users className="h-10 w-10 text-vibrant-cyan" />,
      title: "Private Sessions",
      description: "One-on-one intimate experiences with our models",
    },
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/31ca87ec-9378-40ea-8d01-22ebd11c51b4.png')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-800/80"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="px-4 py-1.5 bg-white/10 backdrop-blur-md border-white/20 text-white text-sm animate-pulse">
                Shanaya.Live - Premium Adult Video Calls
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                  Premium
                </span>{" "}
                Adult Video Call Service
              </h1>
              
              <p className="text-lg text-white/80">
                High-quality video calls tailored for adult entertainment 💋 just pay and enjoy your call
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 rounded-full shadow-xl shadow-purple-500/30 border border-white/10"
                  onClick={() => navigate('/packages')}
                >
                  View Packages
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                
                {!isAuthenticated && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="rounded-full border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10"
                    onClick={() => navigate('/login')}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-float-slow">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-indigo-500/20"></div>
                <img 
                  src="/lovable-uploads/31ca87ec-9378-40ea-8d01-22ebd11c51b4.png" 
                  alt="Premium Video Call" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20">
                      <img 
                        src="/lovable-uploads/31ca87ec-9378-40ea-8d01-22ebd11c51b4.png" 
                        alt="Model" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">Live Now</p>
                      <p className="text-white/70 text-sm">Join the call</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Experience My Premium Services
            </h2>
            <p className="text-muted-foreground">
              Discover why 1000 of users choose my service for high-quality video calls
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-accent hover:border-pink-300/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-300/10 group"
              >
                <div className="p-3 bg-accent/50 rounded-xl w-fit mb-4 group-hover:bg-gradient-to-r group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500 transition-all duration-300">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Featured Packages */}
      <section className="py-20 bg-gradient-to-b from-accent/30 to-background">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between mb-12">
            <div>
              <Badge className="mb-2 bg-accent text-accent-foreground">Packages</Badge>
              <h2 className="text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Popular Packages</h2>
              <p className="text-muted-foreground mt-2">
                Choose the package that fits your desires
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/packages')}
              className="hidden md:flex mt-4 md:mt-0"
            >
              View All Packages
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-accent overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-300/10 hover:border-pink-300/50 flex flex-col group"
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-1 px-4 rounded-bl-lg font-medium text-sm">
                      Popular
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500 transition-all duration-300">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                  
                  <div className="mt-4 mb-2">
                    <span className="text-3xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500 transition-all duration-300">₹{pkg.price}</span>
                  </div>
                  
                  <div className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-accent/50 text-accent-foreground mb-4">
                    {pkg.duration}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="rounded-full p-0.5 bg-gradient-to-r from-pink-500 to-purple-500 mr-2 shrink-0 mt-0.5">
                          <div className="bg-background rounded-full p-0.5">
                            <Check className="h-3 w-3 text-purple-500" />
                          </div>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="px-6 pb-6 mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-md shadow-purple-500/20"
                    onClick={() => handleSelectPackage(pkg.id)}
                  >
                    Choose Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button 
              onClick={() => navigate('/packages')}
              variant="outline"
            >
              View All Packages
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Simple steps to enjoy our premium video call services
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8" />,
                title: "Choose a Package",
                description: "Browse our range of video call packages"
              },
              {
                icon: <CalendarCheck className="h-8 w-8" />,
                title: "Book Your Session",
                description: "Select a convenient time for your call"
              },
              {
                icon: <MessageCircle className="h-8 w-8" />,
                title: "Confirm Details",
                description: "Provide your contact information"
              },
              {
                icon: <PhoneCall className="h-8 w-8" />,
                title: "Enjoy Your Call",
                description: "Connect with our professional hosts"
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="relative"
              >
                <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-accent hover:border-pink-300/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-300/10 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="p-3 bg-accent/50 rounded-xl w-fit mb-4 mt-2">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-8 h-8 text-muted-foreground">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Only show if not authenticated */}
      {!isAuthenticated && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/lovable-uploads/31ca87ec-9378-40ea-8d01-22ebd11c51b4.png')] bg-cover bg-center opacity-5"></div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-4 text-white">Ready to Connect?</h2>
              <p className="text-white/80 mb-8">
                Join our exclusive community for premium adult video call experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 rounded-full shadow-xl shadow-purple-500/30 text-white"
                  size="lg"
                  onClick={() => navigate('/packages')}
                >
                  View Packages
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
