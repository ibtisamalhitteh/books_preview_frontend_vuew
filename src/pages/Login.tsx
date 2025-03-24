
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { toast } from 'sonner';
import Card from '@/components/Card';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      console.log('Login values:', values);
      
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Simulate successful login
      toast.success('Successfully logged in!');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
        
        <Card variant="glass" className="px-6 py-8 shadow-lg animate-scale-in">
          <AuthForm 
            type="login" 
            onSubmit={handleLogin} 
            loading={loading} 
          />
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create one now
            </Link>
          </div>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;
