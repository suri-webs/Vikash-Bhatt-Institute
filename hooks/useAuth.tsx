"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";

export interface UserLocation {
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
}

interface User {
  id: string;
  username: string;
  gmail: string;
  role: string;
  phone?: string;
  dob?: string;
  location?: UserLocation;
  bio?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUserState] = useState<User | null>(null);
  const router = useRouter();

  const login = (userData: User) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const setUser = (userData: User) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    const userStr = localStorage.getItem("user");
    if (stored === "true" && userStr) {
      setUserState(JSON.parse(userStr));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}