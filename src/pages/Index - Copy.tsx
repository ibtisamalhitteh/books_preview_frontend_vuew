
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { ArrowRight, Shield, LockKeyhole, UserCheck, BarChart3, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#features' && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#contact' && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Handle hash on page load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const features = [
    {
      title: 'Secure Authentication',
      description: 'Enterprise-grade security protocols to protect user data and prevent unauthorized access.',
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with Laravel backend services for a robust and reliable experience.',
      icon: <LockKeyhole className="h-10 w-10 text-primary" />,
    },
    {
      title: 'User Management',
      description: 'Comprehensive tools for managing user accounts, roles, and permissions.',
      icon: <UserCheck className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Analytics Dashboard',
      description: 'Detailed insights and metrics to track user engagement and system performance.',
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Fast Performance',
      description: 'Optimized code and efficient architecture for lightning-fast response times.',
      icon: <Zap className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Premium Experience',
      description: 'Polished UI/UX with smooth animations and intuitive design for a delightful user experience.',
      icon: <Award className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-0" />
        
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Elegant Authentication for Modern Applications
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A beautiful, secure, and intuitive authentication system designed with simplicity and user experience in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 max-w-5xl mx-auto relative">
            <div className="absolute inset-0 -z-10 bg-primary/5 blur-3xl rounded-full transform translate-y-12 opacity-50" />
            <div className="rounded-xl overflow-hidden shadow-xl border border-white/20 bg-white/5 backdrop-blur-sm animate-scale-in transition-all">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Dashboard Preview" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a seamless authentication experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                variant="glass" 
                hoverEffect 
                className={cn(
                  "flex flex-col items-center text-center p-8 animate-fade-in",
                  {
                    "animation-delay-200": index % 3 === 1,
                    "animation-delay-400": index % 3 === 2,
                  }
                )}
              >
                <div className="mb-4 p-4 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Designed for Developers, Built for Users</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our authentication system combines the robustness of Laravel's backend with the elegance and interactivity of Vue's frontend, creating a seamless and secure user experience.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Every element has been meticulously crafted with attention to detail, ensuring both functionality and aesthetic appeal. From smooth animations to intuitive interfaces, we've focused on creating an experience that feels natural and delightful.
              </p>
              <Button variant="primary">
                Learn More
              </Button>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 -z-10 bg-primary/10 blur-3xl rounded-full transform -rotate-6 opacity-50" />
                <img 
                  src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Developer Experience" 
                  className="rounded-lg shadow-lg border border-white/20"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Create your account today and experience the most elegant authentication system available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">vueAuth</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} vueAuth. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
