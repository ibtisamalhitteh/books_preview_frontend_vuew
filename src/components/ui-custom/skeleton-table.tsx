
import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonTableProps {
  columns: number;
  rows: number;
  className?: string;
}

export function SkeletonTable({ columns, rows, className }: SkeletonTableProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      {/* Table header */}
      <div className="flex border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <div 
            key={`header-${i}`} 
            className="flex-1 p-4"
          >
            <div className="h-6 bg-muted rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={`row-${rowIndex}`} 
          className="flex border-b transition-colors hover:bg-muted/40"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={`cell-${rowIndex}-${colIndex}`} 
              className="flex-1 p-4"
            >
              <div 
                className={cn(
                  "h-5 bg-muted rounded animate-pulse",
                  colIndex === 0 ? "w-1/2" : "w-3/4"
                )}
              ></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}