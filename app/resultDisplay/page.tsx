import { Suspense } from "react";
import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { ResultDisplay } from "@/components/profile/student/result-edit/resultDisplay";

export default function ResultDisplayPage() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-400 text-sm">Loading...</div>}>
        <ResultDisplay />
      </Suspense>
      <Footer />
    </div>
  );
}