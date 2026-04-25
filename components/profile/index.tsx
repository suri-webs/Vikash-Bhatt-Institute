"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProfileSkeleton } from "./ProfileSkeleton";
import AdminProfile from "./admin";
import StudentProfile from "./student";


export default function Profile() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <ProfileSkeleton />;
  return user?.role === "admin" ? <AdminProfile /> : <StudentProfile />;
}