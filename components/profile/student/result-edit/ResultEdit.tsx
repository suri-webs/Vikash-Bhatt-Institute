"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getServerUrl } from "@/components/utils/config";
import { Search, FilePlus, FileText, BarChart3, Award, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { User } from "../../admin";
import { IResult } from "@/components/utils/types/result/type";
import AddResultDialog from "./AddResultDialog";
import SubjectCard from "./SubjectCard";

interface Props {
    user: User | null;
}

export default function ResultEdit({ user }: Props) {
    if (!user) return <p className="p-6 text-sm text-gray-400">No user selected.</p>;

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
            } catch (err) {
                toast.error("Failed to load results");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [user.rollNumber]);

    async function handleSave({ subject, week, url, month }: { subject: string; week: string; url: string; month: string }) {
        if (!subject.trim() || !week.trim() || !url.trim()) {
            toast.warning("Please fill in all fields");
            return;
        }
        try {
            const res = await axios.post(
                `${getServerUrl()}/results`,
                { rollNumber: user?.rollNumber, subject, week, url, month },
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

    const av = user.username?.charAt(0).toUpperCase();

    return (
        <section className="min-h-screen bg-gray-50/50 px-4 sm:px-6 py-10">
            <div className="max-w-6xl mt-20 mx-auto flex flex-col gap-6">

                {/* Page title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <GraduationCap size={18} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Student Results</h1>
                        <p className="text-xs text-gray-400 mt-0.5">Manage test results by subject and month</p>
                    </div>
                </div>

                {/* Profile card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-white">{av}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1.5 text-xs text-gray-500">
                            <span>Roll: <span className="font-medium text-gray-700">{user.rollNumber}</span></span>
                            <span>Class: <span className="font-medium text-gray-700">{user.classIn}</span></span>
                            <span>Batch: <span className="font-medium text-gray-700">{user.batch || "—"}</span></span>
                            <span className="hidden sm:inline truncate">Email: <span className="font-medium text-gray-700">{user.gmail}</span></span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/10 shrink-0">
                        <BarChart3 size={16} className="text-primary" />
                        <span className="text-lg font-bold text-primary">{loading ? "…" : results.length}</span>
                        <span className="text-[10px] text-gray-400 font-medium">Papers</span>
                    </div>
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setDialogOpen(true)}
                        className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm h-10 px-4 shrink-0 font-medium transition-all shadow-sm"
                    >
                        <FilePlus size={14} /> Add Result
                    </button>

                    <AddResultDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleSave} />

                    <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 h-10 shadow-sm">
                        <Search size={13} className="text-gray-400 shrink-0" />
                        <Input
                            placeholder="Search subject or month…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-none shadow-none p-0 h-auto text-sm focus-visible:ring-0 bg-transparent placeholder:text-gray-400"
                        />
                        {results.length > 0 && (
                            <Badge variant="outline" className="text-[11px] text-primary bg-primary/5 border-primary/20 rounded-full px-2 whitespace-nowrap shrink-0">
                                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex items-center justify-center gap-3 py-20 bg-white rounded-2xl border border-gray-200">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-primary animate-spin" />
                        <span className="text-sm text-gray-400">Loading results…</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-20 text-center bg-white rounded-2xl border border-gray-200 border-dashed">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-3">
                            <FileText size={22} className="text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No results yet</p>
                        <p className="text-xs text-gray-400 mt-1 mb-4">
                            {results.length === 0 ? "Add a result to get started" : "Try a different search"}
                        </p>
                        {results.length === 0 && (
                            <button
                                type="button"
                                onClick={() => setDialogOpen(true)}
                                className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs h-9 px-4 font-medium transition-all"
                            >
                                <FilePlus size={12} /> Add First Result
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {Object.entries(byMonth).map(([month, monthResults]) => (
                            <div key={month} className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary rounded-xl shadow-sm">
                                        <Award size={11} className="text-white/70" />
                                        <span className="text-xs font-bold text-white">{month}</span>
                                    </div>
                                    <div className="flex-1 h-px bg-gray-200" />
                                    <span className="text-[11px] text-gray-400 font-medium">
                                        {monthResults.length} subject{monthResults.length !== 1 ? "s" : ""}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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