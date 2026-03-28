"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";

interface User {
  id: string;
  username: string;
  gmail: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    const userStr = localStorage.getItem("user");
    if (stored === "true" && userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}