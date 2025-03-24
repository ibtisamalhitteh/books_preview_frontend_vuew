
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/services/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
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
    
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await api.login({
        email: formData.email,
        password: formData.password,
        remember: formData.remember,
      });
      
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Toast is already shown in the API service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 animate-fade-in">
      <div className="text-center space-y-2 animate-slide-down">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">Enter your credentials to continue</p>
      </div>
      
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </a>
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
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={formData.remember}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, remember: checked === true })
              }
              disabled={isLoading}
            />
            <Label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
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
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      
      <div className="text-center text-sm animate-slide-up delay-200">
        <span className="text-muted-foreground">Don't have an account?</span>{" "}
        <a href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Sign up
        </a>
		

			  
      </div>
    </div>
  );
};

export default LoginForm;