"use client";

import { useState } from "react";
import { Send, GraduationCap, Sparkles } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormData {
    name: string;
    phone: string;
    classLevel: string;
    message: string;
}

interface PopProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Pop({ open, onOpenChange }: PopProps) {
    const [form, setForm] = useState<FormData>({ name: "", phone: "", classLevel: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setSubmitted(true);
        setForm({ name: "", phone: "", classLevel: "", message: "" }); // ✅ reset
    };

    const handleOpenChange = (val: boolean) => {
        onOpenChange(val);
        if (!val) setTimeout(() => setSubmitted(false), 300);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
                <DialogHeader className="px-7 pt-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-md shadow-cyan-200 shrink-0">
                            <GraduationCap size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold tracking-widest uppercase text-cyan-500 leading-none mb-0.5">
                                Vikash Bhatt Classes
                            </p>
                            <DialogTitle className="text-slate-900 font-bold text-lg leading-tight">
                                Send an Enquiry
                            </DialogTitle>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">
                        Fill in the form below and we'll get back to you shortly.
                    </DialogDescription>
                </DialogHeader>

                {/* Body */}
                <div className="px-7 pb-7">
                    {submitted ? (
                        /* Success state */
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-cyan-50 border-2 border-cyan-200 flex items-center justify-center">
                                <Sparkles className="w-7 h-7 text-cyan-500" />
                            </div>
                            <div>
                                <h3 className="text-slate-900 font-bold text-xl mb-1">Enquiry Sent!</h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-65">
                                    Thank you,{" "}
                                    <span className="font-medium text-slate-700">{form.name}</span>. We'll
                                    reach you on{" "}
                                    <span className="font-medium text-slate-700">{form.phone}</span> shortly.
                                </p>
                            </div>
                            <button
                                onClick={() => handleOpenChange(false)}
                                className="mt-1 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-xl transition-colors duration-150"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        /* Form */
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Name <span className="text-cyan-500">*</span>
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-150"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Phone Number <span className="text-cyan-500">*</span>
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="Your phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-150"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Class <span className="text-cyan-500">*</span>
                                </label>
                                <Select
                                    required
                                    value={form.classLevel}
                                    onValueChange={(val) =>
                                        setForm((prev) => ({ ...prev, classLevel: val ?? "" }))
                                    }
                                >
                                    <SelectTrigger className="w-full px-4 py-5.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-150">
                                        <SelectValue placeholder="Select your class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="class-6">Class 6</SelectItem>
                                        <SelectItem value="class-7">Class 7</SelectItem>
                                        <SelectItem value="class-8">Class 8</SelectItem>
                                        <SelectItem value="class-9">Class 9</SelectItem>
                                        <SelectItem value="class-10">Class 10</SelectItem>
                                        <SelectItem value="class-11">Class 11</SelectItem>
                                        <SelectItem value="class-12">Class 12</SelectItem>
                                        <SelectItem value="jee">JEE Preparation</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={3}
                                    placeholder="Your question or message..."
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-150 resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-cyan-200 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={15} />
                                        Send Enquiry
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}