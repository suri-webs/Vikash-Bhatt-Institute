"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { User } from "@/components/profile/admin";
import ResultEdit from "@/components/profile/student/result-edit/ResultEdit";
import axios from "axios";
import { getServerUrl } from "@/components/utils/config";

function ResultEditInner() {
    const searchParams = useSearchParams();
    const rollNumber = searchParams.get("rollNumber");

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(!!rollNumber);

    useEffect(() => {
        if (!rollNumber) { setLoading(false); return; }

        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${getServerUrl()}/users?rollNumber=${rollNumber}`,
                    { withCredentials: true }
                );
                if (res.data?.success && res.data?.user) {
                    setUser(res.data.user);
                }
            } catch (err) {
                console.error("Could not load user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [rollNumber]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-100 border-t-blue-600 animate-spin" />
                <span className="text-sm text-gray-400">Loading student data…</span>
            </div>
        );
    }

    return <ResultEdit user={user} />;
}

export default function Result_Edit() {
    return (
        <>
            <Navbar />
            <Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-[60vh] gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-blue-100 border-t-blue-600 animate-spin" />
                        <span className="text-sm text-gray-400">Loading…</span>
                    </div>
                }
            >
                <ResultEditInner />
            </Suspense>
            <Footer />
        </>
    );
}