
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated on mount
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const login = async (email: string, password: string) => {
    // This would typically make an API call to verify credentials
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const socialLogin = async (provider: string) => {
    // This would typically redirect to the OAuth provider
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const signup = async (name: string, email: string, password: string) => {
    // This would typically make an API call to create an account
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, socialLogin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
