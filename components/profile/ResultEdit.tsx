"use client";
import { User } from "./adminSection";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react";
import axios from "axios";
import { getServerUrl } from "../utils/config";

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
    if (!user) return <p>No user selected.</p>;

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [results, setResults] = useState<IResult[]>([]);
    const [loading, setLoading] = useState(true);
    // Form state
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
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [user.rollNumber,]);


    async function handleAddResults() {
        try {
            const month = date?.toLocaleString("default", { month: "long" });
            const payload = {
                rollNumber: user?.rollNumber,
                subject,
                week,
                url,
                month,
            };
            const res = await axios.post(
                `${getServerUrl()}/results`,
                payload,
                { withCredentials: true }
            );
            console.log(res.data);
            const newResult = res.data.result;
            // Append new result to local state so count updates instantly
            setResults((prev) => [...prev, newResult]);
        } catch (err) {
            console.log(err);
        }
    }



    async function handleDelete(target: string) {
        try {

            const res = await axios.delete(`${getServerUrl()}/results`,
                { data: { id: target }, withCredentials: true });

            setResults((prev) => prev.filter((r) => r._id !== target));
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    function handleInput(target: string) {
        setSearch(target);
        console.log(target);
    }

    return (
        <section className="my-20 px-6 w-[85%] py-12">
            <div className="flex flex-col w-full justify-center items-center">
                <div className="flex  w-[85%] flex-col items-center justify-center mb-4">
                    <div className="w-full max-w-6xl border border-gray-200 p-6 mb-5 shadow-sm rounded-2xl">

                        <h1 className="text-[28px] font-bold text-gray-900 leading-tight">Student Profile</h1>
                        <p className="text-gray-400 mt-1 mb-6 text-sm">
                            Manage student results record and monitor learning progress.
                        </p>

                        {/* Profile Card */}
                        <div className="flex gap-4 border border-gray-200 rounded-xl p-4">

                            {/* Avatar */}
                            <div className="w-[15%] h-30 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <span className="text-3xl font-bold text-blue-500">
                                    {user.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-center gap-1 text-sm">
                                <p className="text-lg font-semibold text-gray-800">{user.username}</p>

                                <div className="grid grid-cols-2 mt-4 gap-x-8 gap-y-2">
                                    <p><span className="text-gray-400">Roll No:</span> <span className="font-medium">{user.rollNumber}</span></p>
                                    <p><span className="text-gray-400">Batch:</span> <span className="font-medium">{user.batch}</span></p>
                                    <p><span className="text-gray-400">Class:</span> <span className="font-medium">{user.classIn}</span></p>
                                    <p><span className="text-gray-400">Email:</span> <span className="font-medium">{user.gmail}</span></p>
                                    <p>
                                        <span className="text-gray-400">Total Results:</span>{" "}
                                        <span className="font-medium">
                                            {loading ? "Loading..." : results.length}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Add Result Button */}
                        <div className="mt-6 flex gap-5 ">
                            <Dialog>
                                <DialogTrigger className="bg-blue-600 h-10 text-white w-[15%] hover:bg-blue-700 px-6 py-2 rounded-lg">
                                    Add Result
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-sm">
                                    <DialogHeader>
                                        <DialogTitle>Result Information</DialogTitle>
                                        <DialogDescription>
                                            Fill in the result details and click save when you&apos;re done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <FieldGroup>
                                        <Field>
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                placeholder="Enter subject name"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                            />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="date">Date</Label>
                                            <Popover>
                                                <PopoverTrigger className="w-10 text-gray-600" render={<Button variant="outline" />}>
                                                    Select date
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        className="rounded-lg border"
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </Field>
                                        <Field>
                                            <Label htmlFor="week">Week</Label>
                                            <Input
                                                id="week"
                                                name="week"
                                                placeholder="Week 1"
                                                value={week}
                                                onChange={(e) => setWeek(e.target.value)}
                                            />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="url">URL</Label>
                                            <Input
                                                id="url"
                                                name="url"
                                                placeholder="Enter the URL of Result"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                            />
                                        </Field>
                                    </FieldGroup>
                                    <DialogFooter>
                                        <DialogClose className="flex justify-center gap-2">
                                            <div className="border-black border h-8 hover:bg-gray-300 items-center flex justify-center text-black px-6 rounded-lg">
                                                Cancel
                                            </div>
                                            <div
                                                onClick={handleAddResults}
                                                className="border border-green-500 h-8 rounded-lg items-center flex justify-center bg-green-500/25 px-6 hover:bg-green-500/50 text-green-600"
                                            >
                                                Save changes
                                            </div> </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* search bar */}
                            <div className="w-[80%] h-10px-6 py-2 rounded-lg" >
                                <Input className=" px-6 py-4.5" placeholder="Search Result with Subjects" onChange={(e) => { handleInput(e.target.value) }} />
                            </div>
                        </div>



                    </div>


                    <div className="w-full max-w-6xl border mb-5 border-gray-200 p-6 shadow-sm rounded-2xl">
                        {/* Results Table */}
                        {!loading && results.length > 0 && (
                            <div className="mt-8 ">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Results</h2>
                                <div className="overflow-x-auto rounded-xl border border-gray-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Subject</th>
                                                <th className="px-4 py-3">Month</th>
                                                <th className="px-4 py-3">Week</th>
                                                <th className="px-4 py-3">URL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.filter((r) =>
                                                r.subject.toLowerCase().includes(search.toLowerCase())).map((r) => (
                                                    <tr key={r._id} className="border-t border-gray-100 hover:bg-gray-50">
                                                        <td className="px-4 py-3">{r.subject}</td>
                                                        <td className="px-4 py-3">{r.month}</td>
                                                        <td className="px-4 py-3">{r.week}</td>
                                                        <td className="px-4 py-3  flex justify-between ">
                                                            <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                                                                View
                                                            </a>
                                                            <Button
                                                                onClick={(e) => {
                                                                    handleDelete(r._id)
                                                                }}
                                                                variant="destructive">..</Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section >
    );
}