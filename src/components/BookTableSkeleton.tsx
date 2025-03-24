import React from "react";

const BookTableSkeleton = () => {
  return (
    <div className="animate-pulse w-full overflow-hidden rounded-lg">
      <div className="bg-secondary/50 h-14 mb-2 rounded-lg"></div>
      {Array(5).fill(0).map((_, index) => (
        <div 
          key={index} 
          className="flex items-center h-16 mb-2 rounded-lg bg-secondary/30 overflow-hidden"
        >
          <div className="w-full px-6 py-4 flex items-center space-x-6">
            <div className="h-8 w-8 rounded-md bg-secondary/80"></div>
            <div className="h-4 w-1/4 rounded bg-secondary/80"></div>
            <div className="h-4 w-1/4 rounded bg-secondary/60"></div>
            <div className="h-4 w-1/6 rounded bg-secondary/60"></div>
            <div className="h-4 w-1/6 rounded bg-secondary/60"></div>
            <div className="h-4 w-1/6 rounded bg-secondary/60"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookTableSkeleton;