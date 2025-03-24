
import React from "react";
import { Book } from "@/types/book";
import { AnimatePresence, motion } from "framer-motion";

interface BookTableProps {
  books: Book[];
  isLoading: boolean;
  error: Error | null;
}

const BookTable: React.FC<BookTableProps> = ({ books, isLoading, error }) => {
  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10 rounded-xl bg-secondary/30">
        <div className="text-destructive font-medium">Error loading books</div>
        <p className="text-muted-foreground text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-secondary/30">
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground tracking-wider whitespace-nowrap">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground tracking-wider whitespace-nowrap">
                Author
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground tracking-wider whitespace-nowrap">
                categories
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground tracking-wider whitespace-nowrap">
                Published
              </th>
			  
			
			  
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            <AnimatePresence>
              {books.map((book) => (
                <motion.tr
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {book.authors}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {book.categories || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {book.published_date || "—"}
                  </td>
				  
                  
				  
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;