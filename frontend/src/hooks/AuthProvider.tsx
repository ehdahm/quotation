import React, { createContext, useState, useContext, useEffect } from "react";
import * as authService from "../services/auth";
import { getToken, storeToken, removeToken } from "../utils/security";

interface User {
  _id: string;
  name: string;
  email: string;
  company: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    name: string;
    company: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // get user data so i can pass elsewhere
  const fetchUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout();
    }
  };

  // sets auth state to true if a token is found, else false.
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getToken();
      if (token) {
        setIsAuthenticated(true);
        await fetchUserData();
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials);
    if (response.token) {
      storeToken(response.token);
      setIsAuthenticated(true);
      await fetchUserData();
    }
  };

  const register = async (userData: {
    name: string;
    company: string;
    email: string;
    password: string;
  }) => {
    console.log(`userData has made it to the authprovider: ${userData}`);
    const response = await authService.register(userData);
    if (response.token) {
      storeToken(response.token);
      setIsAuthenticated(true);
      await fetchUserData();
    }
  };

  const logout = async () => {
    const response = await authService.logout(user);
    if (!response) {
      console.log(`error logging out`);
      return;
    }
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, fetchUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
