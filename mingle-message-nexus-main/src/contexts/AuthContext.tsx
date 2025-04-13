
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const storedUser = localStorage.getItem("chatAppUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.removeItem("chatAppUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // Mock login for demonstration purposes
      if (email && password) {
        // Mock user data - in real app would come from API
        const mockUser = {
          id: `user_${Date.now()}`,
          name: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        
        setUser(mockUser);
        localStorage.setItem("chatAppUser", JSON.stringify(mockUser));
        toast.success("Logged in successfully!");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // Mock signup for demonstration purposes
      if (name && email && password) {
        const mockUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        
        setUser(mockUser);
        localStorage.setItem("chatAppUser", JSON.stringify(mockUser));
        toast.success("Account created successfully!");
      } else {
        throw new Error("Please fill all required fields");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("chatAppUser");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
