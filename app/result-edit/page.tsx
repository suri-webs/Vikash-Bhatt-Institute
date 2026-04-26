"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { User } from "@/components/profile/admin";
import ResultEdit from "@/components/profile/student/result-edit/ResultEdit";
import axios from "axios";
import { getServerUrl } from "@/components/utils/config";

// ── Inner component that uses useSearchParams ────────────────────────────────
// Must be a separate component so Suspense can wrap it properly
function ResultEditInner() {
    const searchParams = useSearchParams();
    const raw = searchParams.get("user");
    const urlUser: User | null = raw ? JSON.parse(decodeURIComponent(raw)) : null;

    const [user, setUser] = useState<User | null>(urlUser);
    const [loading, setLoading] = useState(!!urlUser?.rollNumber);

    useEffect(() => {
        if (!urlUser?.rollNumber) {
            setLoading(false);
            return;
        }

        const fetchFreshUser = async () => {
            try {
                const res = await axios.get(
                    `${getServerUrl()}/users?rollNumber=${urlUser.rollNumber}`,
                    { withCredentials: true }
                );
                if (res.data?.success && res.data?.user) {
                    setUser(res.data.user);
                }
            } catch (err) {
                console.error("Could not refresh user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFreshUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlUser?.rollNumber]);

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

// ── Page component — wraps inner in Suspense (required for useSearchParams) ──
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