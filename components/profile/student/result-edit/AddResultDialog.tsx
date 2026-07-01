"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FilePlus, CalendarIcon, BookOpen, Link2, Hash, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// some changes 

interface Props {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onSave: (data: {
        subject: string; week: string; url: string; month: string;
        marksScored: number; totalMarks: number;
    }) => Promise<void>;
}

export default function AddResultDialog({ open, onOpenChange, onSave }: Props) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [subject, setSubject] = useState("");
    const [week, setWeek] = useState("");
    const [url, setUrl] = useState("");
    const [marksScored, setMarksScored] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [adding, setAdding] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const scored = parseFloat(marksScored);
    const total = parseFloat(totalMarks);
    const percentage = scored && total ? Math.round((scored / total) * 100) : null;
    const passed = percentage != null ? percentage >= 33 : null;

    async function handleSave() {
        setAdding(true);
        const month = date?.toLocaleString("default", { month: "long" }) ?? "";
        await onSave({
            subject, week, url, month,
            marksScored: scored,
            totalMarks: total,
        });
        setSubject(""); setWeek(""); setUrl("");
        setMarksScored(""); setTotalMarks("");
        setAdding(false);
    }

    const canSave = subject.trim() && week.trim() && url.trim() &&
        marksScored && totalMarks && scored <= total;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FilePlus size={15} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">Add New Result</h2>
                            <p className="text-[11px] text-gray-400 mt-0.5">Fill in the student result details</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="px-6 py-5 space-y-4">

                    {/* Subject */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <BookOpen size={11} className="text-gray-400" /> Subject
                        </label>
                        <Input
                            placeholder="e.g. Mathematics, Physics..."
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="h-10 text-sm border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all"
                        />
                    </div>

                    {/* Month + Week */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                                <CalendarIcon size={11} className="text-gray-400" /> Month
                            </label>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger className={cn(
                                    "w-full h-10 px-3 inline-flex items-center justify-start text-left font-normal text-sm border border-gray-200 bg-gray-50 hover:bg-white rounded-md transition-colors",
                                    !date && "text-muted-foreground"
                                )}>
                                    <CalendarIcon className="mr-2 h-3.5 w-3.5 opacity-40" />
                                    {date ? format(date, "dd MMM yyyy") : "Pick date"}
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(d) => { setDate(d); setCalendarOpen(false); }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                                <Hash size={11} className="text-gray-400" /> Week
                            </label>
                            <Input
                                placeholder="e.g. Week 1"
                                value={week}
                                onChange={(e) => setWeek(e.target.value)}
                                className="h-10 text-sm border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Marks — scored / total side by side */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Trophy size={11} className="text-gray-400" /> Marks
                        </label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                min={0}
                                placeholder="Scored"
                                value={marksScored}
                                onChange={(e) => setMarksScored(e.target.value)}
                                className="h-10 text-sm border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all"
                            />
                            <span className="text-gray-400 font-bold text-lg shrink-0">/</span>
                            <Input
                                type="number"
                                min={1}
                                placeholder="Total"
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(e.target.value)}
                                className="h-10 text-sm border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all"
                            />
                            {/* Live pass/fail badge */}
                            {percentage != null && (
                                <span className={cn(
                                    "shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full",
                                    passed
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                        : "bg-red-50 text-red-500 border border-red-200"
                                )}>
                                    {passed ? "PASS" : "FAIL"} · {percentage}%
                                </span>
                            )}
                        </div>
                        {scored > total && (
                            <p className="text-[11px] text-red-400 mt-1">Scored marks cannot exceed total marks.</p>
                        )}
                    </div>

                    {/* URL */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                            <Link2 size={11} className="text-gray-400" /> Result URL
                        </label>
                        <Input
                            placeholder="https://drive.google.com/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="h-10 text-sm border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all"
                        />
                    </div>

                    {/* Preview strip */}
                    {(subject || week || date) && (
                        <div className="rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-primary">
                                    {subject ? subject.charAt(0).toUpperCase() : "?"}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-800 truncate">{subject || "Subject name"}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                    {date ? format(date, "MMMM yyyy") : "—"} · {week || "Week —"}
                                    {percentage != null && ` · ${scored}/${total}`}
                                </p>
                            </div>
                            <span className="ml-auto text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                                Preview
                            </span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-2.5">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 h-10 rounded-xl text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={adding || !canSave}
                        className="flex-1 h-10 rounded-xl text-sm bg-primary hover:bg-primary/90 text-white font-semibold transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                        {adding ? (
                            <>
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                Saving…
                            </>
                        ) : (
                            <>
                                <FilePlus size={13} />
                                Save Result
                            </>
                        )}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}