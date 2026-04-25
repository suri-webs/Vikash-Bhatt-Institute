"use client";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import ResultEdit from "@/components/profile/ResultEdit";
import { User } from "@/components/profile/adminSection";

export default function Result_Edit() {
    const searchParams = useSearchParams();
    const raw = searchParams.get("user");
    const user: User | null = raw ? JSON.parse(decodeURIComponent(raw)) : null;

    return (
        <>
            <Navbar />
            <ResultEdit user={user} />
            <Footer />
        </>
    );
}