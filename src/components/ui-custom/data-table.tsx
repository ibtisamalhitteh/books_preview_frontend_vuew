
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkeletonTable } from "./skeleton-table";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  itemsPerPage?: number;
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  isLoading = false,
  pagination,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  if (isLoading) {
    return <SkeletonTable columns={columns.length} rows={itemsPerPage} />;
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full bg-sky-500/50">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex}
                    className="transition-colors hover:bg-muted/20"
                  >
                    {columns.map((column, colIndex) => (
                      <td 
                        key={`${rowIndex}-${colIndex}`}
                        className="px-4 py-4 text-sm"
                      >
                        {column.cell ? (
                          column.cell(row)
                        ) : (
                          <span>{String(row[column.accessorKey])}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-muted-foreground">
              Page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
