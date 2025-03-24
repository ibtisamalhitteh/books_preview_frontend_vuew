import { Book } from "@/types/book";

const API_URL = "http://localhost:8000/api/v1"; // Replace with your Laravel API URL


export const BookService = {
  async getBooks(page = 1, perPage = 10): Promise<Book[]> {
	  
	//const token = localStorage.getItem("auth_token");
  // 	console.log(token);
	//if (!token) throw new Error("Not authenticated");
  
    try {
	  	
    const response = await fetch(`${API_URL}/books`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data.books || data; // Handle both {data: []} and direct array responses
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },
  
  async getBook(id: number): Promise<Book> {
    try {
      const response = await fetch(`${API_URL}/books/view/${id}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data.book || data;
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  }
};