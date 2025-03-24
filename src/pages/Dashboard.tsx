import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { api } from "@/services/api";

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

interface UserBooks {
  id: number;
  title: string;
  rating: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [books, setBooks] = useState<UserBooks | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (!api.isLoggedIn()) {
      navigate("/");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        
        // If there's an authentication error, redirect to login
        if (error instanceof Error && error.message.includes("Not authenticated")) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };


    // Fetch user books list rating
    const fetchBooks = async () => {
      try {
        const data = await api.getBooksRating();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books list:", error);
        
        // If there's an authentication error, redirect to login
        if (error instanceof Error && error.message.includes("Not authenticated")) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
	
    fetchProfile();
	fetchBooks();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect to login page
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container px-4 py-10">
        <header className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your account</p>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
          >
            Sign Out
          </Button>
        </header>
        
        <main>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10">
            <div className="col-span-2">
              <div className="bg-card rounded-xl shadow-sm p-6 h-full animate-slide-up">
                <h2 className="text-xl font-medium mb-4">Profile Information</h2>
                
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ) : profile ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>
                ) : (
                  <p>Failed to load profile information.</p>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-card rounded-xl shadow-sm p-6 h-full animate-slide-up delay-100">
                <h2 className="text-xl font-medium mb-4">Account Status</h2>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p>Active</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-sm p-6 animate-slide-up delay-200">
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            <p className="text-muted-foreground">No recent activity to display.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;