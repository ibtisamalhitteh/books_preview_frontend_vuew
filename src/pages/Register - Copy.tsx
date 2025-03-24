
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { toast } from 'sonner';
import Card from '@/components/Card';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  
  const handleRegister = async (values: any) => {
    try {
      setLoading(true);
      
      // Call the register function from AuthContext
      await registerUser(values.name, values.email, values.password);
      
      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      // Toast is handled in the AuthContext
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create an Account</h1>
          <p className="text-muted-foreground">Join our platform to get started</p>
        </div>
        
        <Card variant="glass" className="px-6 py-8 shadow-lg animate-scale-in">
          <AuthForm 
            type="register" 
            onSubmit={handleRegister} 
            loading={loading} 
          />
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account?</span>{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Register;