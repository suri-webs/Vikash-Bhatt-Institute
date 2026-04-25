"use client";

import { User } from "../admin";  // ← updated path
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { getServerUrl } from "@/components/utils/config";
import { Search, FilePlus, Trash2, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface IResult {
    _id: string;
    rollNumber: string;
    url: string;
    subject: string;
    month: string;
    week: string;
}

interface Props {
    user: User | null;
}

export default function ResultEdit({ user }: Props) {
    if (!user) return <p className="p-6 text-sm text-gray-400">No user selected.</p>;

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [results, setResults] = useState<IResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState("");
    const [week, setWeek] = useState("");
    const [url, setUrl] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(
                    `${getServerUrl()}/results?rollNumber=${user.rollNumber}`,
                    { withCredentials: true }
                );
                setResults(res.data.results ?? []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [user.rollNumber]);

    async function handleAddResults() {
        try {
            const month = date?.toLocaleString("default", { month: "long" });
            const res = await axios.post(
                `${getServerUrl()}/results`,
                { rollNumber: user?.rollNumber, subject, week, url, month },
                { withCredentials: true }
            );
            setResults((prev) => [...prev, res.data.result]);
            // reset form
            setSubject("");
            setWeek("");
            setUrl("");
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDelete(id: string) {
        try {
            await axios.delete(`${getServerUrl()}/results`, {
                data: { id },
                withCredentials: true,
            });
            setResults((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    const filtered = results.filter((r) =>
        r.subject.toLowerCase().includes(search.toLowerCase())
    );

    const av = user.username?.charAt(0).toUpperCase();

    return (
        <section className="my-20 px-6 py-12">
            <div className="max-w-5xl mx-auto flex flex-col gap-5">

                {/* ── Page header ── */}
                <div>
                    <h1 className="text-[28px] font-bold text-gray-900 leading-tight">Student Profile</h1>
                    <p className="text-gray-400 mt-1 text-sm">
                        Manage student results record and monitor learning progress.
                    </p>
                </div>

                {/* ── Profile card ── */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-2xl font-bold text-blue-600">{av}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900">{user.username}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-1 mt-2 text-xs text-gray-500">
                            <span><span className="text-gray-400">Roll No: </span><span className="font-medium text-gray-700">{user.rollNumber}</span></span>
                            <span><span className="text-gray-400">Class: </span><span className="font-medium text-gray-700">{user.classIn}</span></span>
                            <span><span className="text-gray-400">Batch: </span><span className="font-medium text-gray-700">{user.batch}</span></span>
                            <span><span className="text-gray-400">Email: </span><span className="font-medium text-gray-700 truncate">{user.gmail}</span></span>
                            <span>
                                <span className="text-gray-400">Total Results: </span>
                                <span className="font-medium text-gray-700">{loading ? "…" : results.length}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Actions row ── */}
                <div className="flex items-center gap-3">
                    {/* Add Result dialog */}
                    <Dialog>
                        <DialogTrigger >
                            <Button className="gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm h-10 px-4 shrink-0">
                                <FilePlus size={14} /> Add Result
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm rounded-2xl p-0 gap-0 overflow-hidden">
                            <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-100">
                                <DialogTitle className="text-sm font-semibold text-gray-900">Add Result</DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">
                                    Fill in the result details and click save.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="px-5 py-4 space-y-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs text-gray-400">Subject</Label>
                                    <Input
                                        placeholder="e.g. Mathematics"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="h-9 rounded-xl text-sm border-gray-200 focus-visible:ring-blue-100"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs text-gray-400">Month</Label>
                                    <Popover>
                                        <PopoverTrigger >
                                            <Button variant="outline" className="w-full justify-start h-9 rounded-xl text-sm text-gray-700 border-gray-200">
                                                {date ? date.toLocaleString("default", { month: "long", year: "numeric" }) : "Select month"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border" captionLayout="dropdown" />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs text-gray-400">Week</Label>
                                    <Input
                                        placeholder="e.g. Week 1"
                                        value={week}
                                        onChange={(e) => setWeek(e.target.value)}
                                        className="h-9 rounded-xl text-sm border-gray-200 focus-visible:ring-blue-100"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs text-gray-400">Result URL</Label>
                                    <Input
                                        placeholder="https://..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="h-9 rounded-xl text-sm border-gray-200 focus-visible:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div className="px-5 pb-5 flex gap-2">
                                <DialogClose >
                                    <Button variant="outline" className="flex-1 h-9 rounded-xl text-sm">Cancel</Button>
                                </DialogClose>
                                <DialogClose >
                                    <Button
                                        onClick={handleAddResults}
                                        className="flex-1 h-9 rounded-xl text-sm bg-blue-600 hover:bg-blue-700"
                                    >
                                        Save
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Search */}
                    <div className="flex-1 flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2">
                        <Search size={13} className="text-gray-400 shrink-0" />
                        <Input
                            placeholder="Search by subject…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-none shadow-none p-0 h-auto text-sm focus-visible:ring-0 bg-transparent placeholder:text-gray-400"
                        />
                        {results.length > 0 && (
                            <Badge variant="outline" className="text-[11px] text-blue-600 bg-blue-50 border-blue-100 rounded-full px-2 whitespace-nowrap">
                                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* ── Results table ── */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center gap-3 py-16">
                            <div className="w-5 h-5 rounded-full border-2 border-blue-100 border-t-blue-600 animate-spin" />
                            <span className="text-sm text-gray-400">Loading results…</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center py-16 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-3">
                                <FileText size={20} className="text-gray-300" />
                            </div>
                            <p className="text-sm font-medium text-gray-500">No results found</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {results.length === 0 ? "Add a result to get started." : "Try a different subject name."}
                            </p>
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    {["Subject", "Month", "Week", "URL", ""].map((h) => (
                                        <th key={h} className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((r, i) => (
                                    <>
                                        <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-800">{r.subject}</td>
                                            <td className="px-4 py-3 text-gray-500">{r.month}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant="outline" className="text-[11px] bg-blue-50 text-blue-600 border-blue-100 rounded-md">
                                                    {r.week}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={r.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs font-medium"
                                                >
                                                    <ExternalLink size={11} /> View
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(r._id)}
                                                    className="h-7 w-7 p-0 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 size={13} />
                                                </Button>
                                            </td>
                                        </tr >
                                        {
                                            i < filtered.length - 1 && (
                                                <tr key={`sep-${r._id}`}>
                                                    <td colSpan={5} className="px-4"><Separator /></td>
                                                </tr>
                                            )
                                        }
                                    </>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </section >
    );
}