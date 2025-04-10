import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { Check, ShieldCheck, Calendar, Users, Clock, Video, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const PackagesPage = () => {
  const navigate = useNavigate();
  const { videoPackages, isAuthenticated, setSelectedPackage } = useApp();
  
  const handleSelectPackage = (packageId: string) => {
    const selected = videoPackages.find(pkg => pkg.id === packageId);
    
    if (selected) {
      setSelectedPackage(selected);
      
      if (isAuthenticated) {
        navigate('/checkout');
      } else {
        navigate('/login', { state: { redirectTo: '/checkout' } });
      }
    }
  };
  
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 opacity-10"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground">Our Packages</Badge>
            <h1 className="text-4xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Video Call Packages</h1>
            <p className="text-muted-foreground">
              Select the perfect video call package that suits your preferences and schedule.
              All calls are high-definition with professional hosts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videoPackages.map(pkg => (
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
                    Book Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-b from-background to-accent/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-accent text-accent-foreground">FAQs</Badge>
            <h2 className="text-3xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Calendar className="h-5 w-5 text-purple-500" />,
                question: "How do I schedule my video call?",
                answer: "After purchase, you'll receive a confirmation with scheduling instructions via your chosen contact method (WhatsApp or Telegram)."
              },
              {
                icon: <Video className="h-5 w-5 text-pink-500" />,
                question: "What equipment do I need?",
                answer: "You'll need a device with a camera, microphone, and stable internet connection. We recommend using a private, quiet space."
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-indigo-500" />,
                question: "Is my privacy protected?",
                answer: "Absolutely. All sessions are private and confidential. We do not record calls or share your personal information."
              },
              {
                icon: <Users className="h-5 w-5 text-blue-500" />,
                question: "Can I request a specific host?",
                answer: "Yes, you can make special requests during the checkout process or via your contact method after purchase."
              },
              {
                icon: <Clock className="h-5 w-5 text-teal-500" />,
                question: "What if I need to reschedule?",
                answer: "You can reschedule your call up to 4 hours before the scheduled time through your contact method without any additional charge."
              },
              {
                icon: <Star className="h-5 w-5 text-amber-500" />,
                question: "Are there any loyalty benefits?",
                answer: "Yes, our regular customers receive exclusive discounts and priority scheduling for future bookings."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl p-6 border border-accent hover:border-pink-300/50 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-accent/50 mr-4 shrink-0">
                    {faq.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-lg">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-800/90 via-purple-800/90 to-pink-800/90 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-10 text-center text-white relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/lovable-uploads/31ca87ec-9378-40ea-8d01-22ebd11c51b4.png')] bg-cover bg-center opacity-10"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Ready for a Premium Experience?</h3>
                <p className="mb-6 text-white/80">
                  Our hosts are waiting to connect with you. Book your session now!
                </p>
                <Button 
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 rounded-full shadow-xl shadow-purple-500/30 text-white"
                  size="lg"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Choose a Package
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-vibrant-purple via-vibrant-pink to-vibrant-orange bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our intimate video services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I schedule my intimate session?</AccordionTrigger>
            <AccordionContent>
              After selecting a package and completing the checkout process, you'll receive a confirmation email with instructions on how to schedule your session. You can choose your preferred date and time through our secure scheduling system.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
};

export default PackagesPage;
