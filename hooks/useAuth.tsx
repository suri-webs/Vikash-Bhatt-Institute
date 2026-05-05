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

export interface Results {
  rollNumber: string;
  subject: string;
  month: string;
  url: string;
  week: string;
  _id: string;
  totalMarks?: number;
  marksScored?: number;
}

export interface User {
  id: string;
  username: string;
  gmail: string;
  role: string;
  phone?: string;
  dob?: string;
  location?: UserLocation;
  batch: string;
  classIn: string;
  rollNumber?: number;
  results: string[];
  bio?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  
  IsCollapse: boolean;
  setIsCollapse: (IsOpen: boolean) => void,
  result: Results[] | null;
  login: (userData: User) => void;
  studentResults: (studentRes: Results[]) => void;
  logout: () => void;
  setUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUserState] = useState<User | null>(null);
  const [result, setResult] = useState<Results[] | null>(null);
  const [IsCollapse, setIsCollapseState] = useState<boolean>(false);
  const router = useRouter();


  const studentResults = (studentRes: Results[]) => {
    setResult(studentRes);
    localStorage.setItem("StudentResults", JSON.stringify(studentRes));
  };

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
    localStorage.removeItem("StudentResults");
    router.push("/login");
  };

  const setIsCollapse = (value: boolean) => {
    // setIsCollapse(value);
    setIsCollapseState(value);
  };

  const setUser = (userData: User) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    const userStr = localStorage.getItem("user");
    const resultsStr = localStorage.getItem("StudentResults");


    if (stored === "true" && userStr) {
      setUserState(JSON.parse(userStr));
    }
    if (resultsStr) {
      setResult(JSON.parse(resultsStr));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setIsCollapse,
      IsCollapse,
      isLoggedIn: !!user,
      login,
      logout,
      setUser,
      studentResults,
      result
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}