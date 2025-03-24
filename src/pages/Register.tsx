
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';
import Card from '@/components/Card';
import { api } from "@/services/api";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
	name:"",
    password: "",
  });
  
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      toast.error("Please enter all of email , password and name");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await api.register({
        email: formData.email,
		name: formData.name,
        password: formData.password,
      });
      
      toast.success("Register successful");
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      // Toast is already shown in the API service
    } finally {
      setIsLoading(false);
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
      <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up delay-100">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>
		  
		  
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              placeholder="Name"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          
      
        </div>
        
        <Button
          type="submit"
          className="w-full h-11 font-medium transition-all duration-200 bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
             Registration...
            </span>
          ) : (
            "Register"
          )}
        </Button>
      </form>
          
        	</Card> 
		  
		  
		  <div className="text-center text-sm animate-slide-up delay-200">
			<span className="text-muted-foreground">Already have an account?</span>{" "}
			<a href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
			 Sign in
			</a>	  
		  </div>
	  
       
        
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
