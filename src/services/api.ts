
import { toast } from "sonner";
import { Book } from "@/types/book";

const API_URL = "http://localhost:8000/api/v1"; // Replace with your Laravel API URL

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
  
}

interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Store token in localStorage
const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

// Remove token from localStorage
const removeToken = (): void => {
  localStorage.removeItem("auth_token");
};

// Check if user is logged in
const isLoggedIn = (): boolean => {
  return !!getToken();
};

// Login user
const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.message || "Login failed");
    }

    const result = data.data as LoginResponse;
    
    // Store token
    setToken(result.token);
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
};


// register new user - register
const register = async (registerinput: RegisterInput): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(registerinput),
    });

    const data = await response.json();
    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.message || "register failed");
    }

    const result = data.data ;
       
    return result;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
};

// Logout user
const logout = async (): Promise<void> => {
  const token = getToken();
  
  if (!token) return;
  
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      const error = data as ApiError;
      throw new Error(error.message || "Logout failed");
    }

    // Remove token
    removeToken();
  } catch (error) {
    console.error("Logout error:", error);
    // Still remove token on error
    removeToken();
  }
};

// Get user profile
const getProfile = async (): Promise<any> => {
  const token = getToken();
   	
  if (!token) throw new Error("Not authenticated");
  
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
	const data = await response.json();
    if (!response.ok) {
      
      const error = data as ApiError;
      throw new Error(error.message || "Failed to get profile");
    }
	const result = data.data.user as LoginResponse;
    return await result;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
};


// Get user Books list history
const getUserBookslist = async (page = 1, perPage = 10): Promise<Book[]> => {
  const token = getToken();
   	
  if (!token) throw new Error("Not authenticated");
  
  try {
    const response = await fetch(`${API_URL}/users/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
	const data = await response.json();
    if (!response.ok) {
      
      const error = data as ApiError;
      throw new Error(error.message || "Failed to get books list");
    }
      return data.data.userhistory || data; // Handle both {data: []} and direct array responses
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
};

// Get  Books list
const getBookslist = async (page = 1, perPage = 10): Promise<Book[]> => {
  const token = getToken();
   	
  if (!token) throw new Error("Not authenticated");
  
  try {
    const response = await fetch(`${API_URL}/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
	const data = await response.json();
    if (!response.ok) {
      
      const error = data as ApiError;
      throw new Error(error.message || "Failed to get books list");
    }
      return data.data.books || data; // Handle both {data: []} and direct array responses
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
};


// Get  Book details
const getBook = async (id: number): Promise<Book> => {
  const token = getToken();
   	
  if (!token) throw new Error("Not authenticated");
  
  try {
    const response = await fetch(`${API_URL}/books/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
	const data = await response.json();
    if (!response.ok) {
      
      const error = data as ApiError;
      throw new Error(error.message || "Failed to get books list");
    }
      return data.data.book || data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
};

export const api = {
  login,
  logout,
  register,
  getProfile,
  getBookslist,
  getUserBookslist,
  getBook,
  isLoggedIn,
  getToken,
};