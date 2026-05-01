// app/resultDisplay/page.tsx
import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { ResultDisplay } from "@/components/profile/student/result-edit/resultDisplay";

export default function ResultDisplayPage() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <ResultDisplay />
      <Footer />
    </div>
  );
}