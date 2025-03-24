/*

import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookService } from "@/services/BookService";
import Header from "@/components/Header";
import BookTable from "@/components/BookTable";
import BookTableSkeleton from "@/components/BookTableSkeleton";
*/
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { User } from "@/types/data";
import { DataTable, Column } from "@/components/ui-custom/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Book } from "@/types/book";

const Bookspage = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const perPage = 8;
  
  const { data, isLoading } = useQuery({
    queryKey: ["books", page],
    queryFn: () => api.getBookslist(page, perPage),
  });
//console.log(data);
  const columns: Column<Book>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (book) => (
        <Link to={`/books/view/${book.id}`} className="table-link">
          {book.title}
        </Link>
      ),
    },
    {
      header: "Authors",
      accessorKey: "authors",
    },
    {
      header: "published_date",
      accessorKey: "published_date",
    },
    {
      header: "language",
      accessorKey: "language",
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (book) => (
        <div className="flex items-center space-x-3">
          <Link 
            to={`/books/view/${book.id}`} 
            className="text-xs px-3 py-1.5 rounded-full bg-apple-blue text-white hover:bg-apple-blue-dark transition-colors duration-300"
          >
            View
          </Link>
        </div>
      ),
    },
  ];


  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 md:space-y-8">
          <div className="space-y-2">
            <div className="text-sm uppercase text-apple-blue font-medium tracking-wide">Data Management</div>
            <h1 className="text-3xl font-medium text-apple-black tracking-tight">Book Directory</h1>
            <p className="text-apple-silver max-w-3xl">
              View  your books in this interactive data table. Click on a book title or the view button to see detailed information.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden animate-scale-in bg-blue-500">
            <DataTable
              data={data|| []}
              columns={columns}
              isLoading={isLoading}
              pagination={
                data?.meta
                  ? {
                      currentPage: data.meta.current_page,
                      totalPages: data.meta.last_page,
                      onPageChange: setPage,
                    }
                  : undefined
              }
              itemsPerPage={perPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookspage;
