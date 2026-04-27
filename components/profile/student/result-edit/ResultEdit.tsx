"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getServerUrl } from "@/components/utils/config";
import { Search, FilePlus, FileText, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { User } from "../../admin";
import { IResult } from "@/components/utils/types/result/type";
import AddResultDialog from "./AddResultDialog";
import SubjectCard from "./SubjectCard";

interface Props {
    user: User | null;
}

export default function ResultEdit({ user }: Props) {
    if (!user) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2 text-gray-400">
            <FileText size={36} className="opacity-20" />
            <p className="text-sm">No student selected.</p>
        </div>
    );

    const [results, setResults] = useState<IResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(
                    `${getServerUrl()}/results?rollNumber=${user.rollNumber}`,
                    { withCredentials: true }
                );
                setResults(res.data.results ?? []);
            } catch {
                toast.error("Failed to load results");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [user.rollNumber]);

    // ✅ FIXED — marksScored and totalMarks now included
    async function handleSave({ subject, week, url, month, marksScored, totalMarks }: {
        subject: string; week: string; url: string; month: string;
        marksScored: number; totalMarks: number;
    }) {
        if (!subject.trim() || !week.trim() || !url.trim()) {
            toast.warning("Please fill in all fields");
            return;
        }
        try {
            const res = await axios.post(
                `${getServerUrl()}/results`,
                { rollNumber: user?.rollNumber, subject, week, url, month, marksScored, totalMarks },
                { withCredentials: true }
            );
            setResults((prev) => [...prev, res.data.result]);
            setDialogOpen(false);
            toast.success(`Result added for ${subject}`);
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? "Failed to add result");
        }
    }

    async function handleDelete(id: string) {
        try {
            await axios.delete(`${getServerUrl()}/results`, { data: { id }, withCredentials: true });
            setResults((prev) => prev.filter((r) => r._id !== id));
            toast.success("Result deleted");
        } catch {
            toast.error("Failed to delete result");
        }
    }

    const filtered = results.filter((r) =>
        r.subject.toLowerCase().includes(search.toLowerCase()) ||
        r.month.toLowerCase().includes(search.toLowerCase())
    );

    const byMonth = filtered.reduce<Record<string, IResult[]>>((acc, r) => {
        if (!acc[r.month]) acc[r.month] = [];
        acc[r.month].push(r);
        return acc;
    }, {});

    const subjects = [...new Set(results.map((r) => r.subject))].length;

    return (
        <section className="min-h-screen bg-[#f7f8fa] px-4 sm:px-8 pb-16 pt-28">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">

                {/* ── Hero Profile Card ── */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400" />

                    <div className="px-6 pb-6 -mt-12 flex flex-col sm:flex-row sm:items-end gap-4">
                        <Avatar className="w-24 h-24 rounded-full border-4 border-white shadow-md shrink-0">
                            <AvatarImage src={user.avatar} alt={user.username} className="object-cover" />
                            <AvatarFallback className="bg-indigo-500 text-white text-3xl font-bold">
                                {user.username?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 mb-1">
                            <h2 className="text-lg font-bold text-white max-sm:text-black leading-tight">
                                {user.username}
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5">{user.gmail}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {user.rollNumber && (
                                    <span className="text-[11px] bg-indigo-50 text-indigo-600 font-semibold px-2.5 py-0.5 rounded-full">
                                        Roll #{user.rollNumber}
                                    </span>
                                )}
                                {user.classIn && (
                                    <span className="text-[11px] bg-sky-50 text-sky-600 font-semibold px-2.5 py-0.5 rounded-full">
                                        Class {user.classIn}
                                    </span>
                                )}
                                {user.batch && (
                                    <span className="text-[11px] bg-violet-50 text-violet-600 font-semibold px-2.5 py-0.5 rounded-full">
                                        Batch {user.batch}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 sm:mb-1">
                            <div className="text-center px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-100">
                                <p className="text-xl font-bold text-indigo-600">{loading ? "—" : results.length}</p>
                                <p className="text-[10px] text-indigo-400 font-medium mt-0.5">Papers</p>
                            </div>
                            <div className="text-center px-4 py-2 rounded-2xl bg-sky-50 border border-sky-100">
                                <p className="text-xl font-bold text-sky-600">{loading ? "—" : subjects}</p>
                                <p className="text-[10px] text-sky-400 font-medium mt-0.5">Subjects</p>
                            </div>
                            <div className="text-center px-4 py-2 rounded-2xl bg-violet-50 border border-violet-100">
                                <p className="text-xl font-bold text-violet-600">{loading ? "—" : Object.keys(byMonth).length}</p>
                                <p className="text-[10px] text-violet-400 font-medium mt-0.5">Months</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Toolbar ── */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setDialogOpen(true)}
                        className="flex items-center gap-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white text-sm h-10 px-5 shrink-0 font-semibold transition-all shadow-sm"
                    >
                        <FilePlus size={14} /> Add Result
                    </button>

                    <AddResultDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleSave} />

                    <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-3 h-10 shadow-sm">
                        <Search size={13} className="text-gray-300 shrink-0" />
                        <Input
                            placeholder="Search by subject or month…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-none shadow-none p-0 h-auto text-sm focus-visible:ring-0 bg-transparent placeholder:text-gray-300"
                        />
                        {results.length > 0 && (
                            <span className="text-[11px] text-indigo-500 bg-indigo-50 font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                                {filtered.length} found
                            </span>
                        )}
                    </div>
                </div>

                {/* ── Results ── */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl border border-gray-100 p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-11 h-11 rounded-2xl" />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Skeleton className="h-3 w-20 rounded-full" />
                                        <Skeleton className="h-2.5 w-14 rounded-full" />
                                    </div>
                                </div>
                                <Skeleton className="h-1.5 w-full rounded-full" />
                                <div className="flex gap-2 mt-1">
                                    <Skeleton className="h-9 flex-1 rounded-2xl" />
                                    <Skeleton className="h-9 flex-1 rounded-2xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 rounded-3xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                            <FileText size={24} className="text-gray-200" />
                        </div>
                        <p className="text-sm font-semibold text-gray-400">No results yet</p>
                        <p className="text-xs text-gray-300 mt-1 mb-5">
                            {results.length === 0 ? "Add a result to get started" : "Try a different search"}
                        </p>
                        {results.length === 0 && (
                            <button
                                type="button"
                                onClick={() => setDialogOpen(true)}
                                className="flex items-center gap-1.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs h-9 px-5 font-semibold transition-all"
                            >
                                <FilePlus size={12} /> Add First Result
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {Object.entries(byMonth).map(([month, monthResults]) => (
                            <div key={month}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2 bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        <Award size={11} className="opacity-70" />
                                        {month}
                                    </div>
                                    <div className="flex-1 h-px bg-gray-100" />
                                    <span className="text-xs text-gray-300 font-medium">
                                        {monthResults.length} subject{monthResults.length !== 1 ? "s" : ""}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {monthResults.map((r) => (
                                        <SubjectCard key={r._id} result={r} onDelete={handleDelete} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}