import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const bookId = parseInt(id || "0");

  const { data:book, isLoading, error } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => api.getBook(bookId),
    enabled: !!bookId && bookId > 0,
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading user:", error);
      // Navigate back to the users list after a short delay
      const timeout = setTimeout(() => navigate("/", { replace: true }), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="space-y-4">
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-8 w-64 bg-muted rounded"></div>
            </div>
            <div className="bg-white rounded-xl p-8 space-y-6">
              <div className="h-6 w-32 bg-muted rounded"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="h-5 w-32 bg-muted rounded"></div>
                    <div className="h-5 w-48 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h2 className="text-2xl font-medium">Book Not Found</h2>
          <p className="text-muted-foreground">
            We couldn't find the Book you are looking for. You will be redirected to the users list.
          </p>
          <Button asChild variant="default">
            <Link to="/">Return to Books List</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <Button
              variant="ghost"
              className="pl-0 flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books list
            </Button>
            <h1 className="text-3xl font-medium tracking-tight">{book.title}</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8 animate-scale-in">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-medium mb-4">book Information</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">book ID</dt>
                    <dd className="font-medium">{book.id}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">Name</dt>
                    <dd className="font-medium">{book.title}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">subtitle</dt>
                    <dd className="font-medium">{book.subtitle}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">categories</dt>
                    <dd className="font-medium">{book.categories}</dd>
                  </div>
                 
                  
				  
				   <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">authors</dt>
                    <dd className="font-medium">{book.authors}</dd>
                  </div>
				  
				  
				   <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">print_type</dt>
                    <dd className="font-medium">{book.print_type}</dd>
                  </div>


				  
				   <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">published_date</dt>
                    <dd className="font-medium">{book.published_date}</dd>
                  </div>
				  
				   <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">publisher</dt>
                    <dd className="font-medium">{book.publisher}</dd>
                  </div>
				  
				  
				   <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">page_count</dt>
                    <dd className="font-medium">{book.page_count}</dd>
                  </div>
				  
				  
                </dl>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
