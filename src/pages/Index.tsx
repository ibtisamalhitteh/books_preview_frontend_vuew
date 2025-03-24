import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { api } from "@/services/api";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (api.isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-background to-secondary/40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container flex flex-col items-center justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-md glass rounded-2xl shadow-xl p-8 overflow-hidden border border-border/50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80"></div>
          <LoginForm />
        </div>
        
        <div className="mt-10 text-sm text-muted-foreground animate-fade-in">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;