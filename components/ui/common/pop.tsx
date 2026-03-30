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
import { Button } from "@/components/ui/button";

interface FormData {
    name: string;
    phone: string;
    classLevel: string;
    subject: string;
    message: string;
}

interface PopProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// ── Shared static data (same as Contact page) ──────────────────────────────

const classLevels = [
    { value: 'class-1-5', label: 'Class 1–5' },
    { value: 'class-6-8', label: 'Class 6–8' },
    { value: 'class-9-10', label: 'Class 9–10' },
    { value: 'class-11-12-science', label: 'Class 11–12 (Science)' },
    { value: 'class-11-12-commerce', label: 'Class 11–12 (Commerce)' },
    { value: 'class-11-12-arts', label: 'Class 11–12 (Arts)' },
    { value: 'jee', label: 'JEE Preparation' },
    { value: 'neet', label: 'NEET Preparation' },
    { value: 'nda-cds', label: 'NDA / CDS' },
    { value: 'bcom', label: 'B.Com' },
    { value: 'olympiad', label: 'Olympiad Training' },
];

const subjects = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science (Physics/Chemistry/Biology)' },
    { value: 'accountancy', label: 'Accountancy' },
    { value: 'economics', label: 'Economics' },
    { value: 'business-studies', label: 'Business Studies' },
    { value: 'english-hindi', label: 'English / Hindi' },
    { value: 'social-science', label: 'Social Science' },
    { value: 'statistics', label: 'Statistics' },
    { value: 'multiple', label: 'Multiple Subjects' },
];

const emptyForm: FormData = {
    name: "", phone: "", classLevel: "", subject: "", message: ""
};

// ── Component ──────────────────────────────────────────────────────────────

export default function Pop({ open, onOpenChange }: PopProps) {
    const [form, setForm] = useState<FormData>(emptyForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Store name/phone for the success screen before resetting form
    const [successName, setSuccessName] = useState("");
    const [successPhone, setSuccessPhone] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [e.target.name as keyof FormData]: e.target.value }));

    const handleSelectChange = (field: keyof FormData, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, source: "popup" }),
            });
            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Something went wrong. Please try again.");
                return;
            }

            setSuccessName(form.name);
            setSuccessPhone(form.phone);
            setSubmitted(true);
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChange = (val: boolean) => {
        onOpenChange(val);
        // Reset after close animation finishes
        if (!val) {
            setTimeout(() => {
                setSubmitted(false);
                setError(null);
                setForm(emptyForm);
            }, 300);
        }
    };

    const inputCls =
        "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-150";

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-3xl border-0 shadow-2xl">

                <DialogHeader className="px-7 pt-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/30 shrink-0">
                            <GraduationCap size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold tracking-widest uppercase text-primary leading-none mb-0.5">
                                vikas Bhatt Classes
                            </p>
                            <DialogTitle className="text-slate-900 font-bold text-lg leading-tight">
                                Send Your Enquiry
                            </DialogTitle>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">
                        Fill in the form below and we'll get back to you shortly.
                    </DialogDescription>
                </DialogHeader>

                <div className="px-7 pb-7">
                    {submitted ? (
                        /* ── Success state ── */
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                                <Sparkles className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-slate-900 font-bold text-xl mb-1">Enquiry Sent!</h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-65">
                                    Thank you,{" "}
                                    <span className="font-medium text-slate-700">{successName}</span>. We'll
                                    reach you on{" "}
                                    <span className="font-medium text-slate-700">{successPhone}</span> shortly.
                                </p>
                            </div>
                            <button
                                onClick={() => handleOpenChange(false)}
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        /* ── Form ── */
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Full Name <span className="text-primary">*</span>
                                </label>
                                <input
                                    name="name" type="text" required
                                    placeholder="Your full name"
                                    value={form.name} onChange={handleInputChange}
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Phone Number <span className="text-primary">*</span>
                                </label>
                                <input
                                    name="phone" type="tel" required
                                    placeholder="Your phone number"
                                    value={form.phone} onChange={handleInputChange}
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Student's Class / Level <span className="text-primary">*</span>
                                </label>
                                <Select value={form.classLevel} onValueChange={(v) => handleSelectChange("classLevel", v || '')}>
                                    <SelectTrigger className="w-full px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-150 py-5">
                                        <SelectValue placeholder="Select class or level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classLevels.map(({ value, label }) => (
                                            <SelectItem key={value} value={value}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Subject of Interest <span className="text-primary">*</span>
                                </label>
                                <Select value={form.subject} onValueChange={(v) => handleSelectChange("subject", v || '')}>
                                    <SelectTrigger className="w-full px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-150 py-5">
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map(({ value, label }) => (
                                            <SelectItem key={value} value={value}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Message
                                </label>
                                <textarea
                                    name="message" rows={3}
                                    placeholder="Your question or message..."
                                    value={form.message} onChange={handleInputChange}
                                    className={`${inputCls} resize-none`}
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-xs text-red-500 -mt-1">{error}</p>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white font-semibold text-sm flex items-center justify-center gap-2"
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
                            </Button>

                        </form>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    );
}