"use client";

import { useState } from 'react';
import { Send, MapPin, Phone, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';
import { getServerUrl } from '@/components/utils/config';

type FormData = {
    name: string;
    phone: string;
    classLevel: string;
    subject: string;
    message: string;
};

const emptyForm: FormData = {
    name: '', phone: '', classLevel: '', subject: '', message: ''
};

// ── Static data ────────────────────────────────────────────────────────────

const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+91 98183 48878' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9–6 PM' },
    { icon: MapPin, label: 'Location', value: 'B-4196/109 Sant Nagar, Burari, New Delhi, Delhi 110084' },
];

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

// ── Component ──────────────────────────────────────────────────────────────

export default function Contact() {
    const [form, setForm] = useState<FormData>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((p) => ({ ...p, [e.target.name as keyof FormData]: e.target.value }));

    const handleSelectChange = (field: keyof FormData, value: string) =>
        setForm((p) => ({ ...p, [field]: value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${getServerUrl()}enquiry`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, source: "contact-page" }),
            });
            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Something went wrong. Please try again.");
                return;
            }

            setSubmitted(true);
            setForm(emptyForm);
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="w-full py-24 bg-white">
            <div className="max-w-7xl mx-auto max-lg:px-4 flex flex-col">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-5">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                        Send Your Enquiry
                    </h2>
                    <p className="text-slate-500 text-[14.5px] mt-2 font-normal">
                        Have questions? Fill out the form below and we'll get back to you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-15">

                    {/* Left — Map + Contact Info */}
                    <div className="flex flex-col gap-4">
                        <Card className="overflow-hidden rounded-3xl shadow-sm flex-1">
                            <CardContent className="p-2 h-full min-h-70">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.1560913898857!2d77.19804167747499!3d28.744756230159155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cff722a24d77d%3A0x8b756a580badb8c1!2sVBC%20%5BVikas%20Bhatt%20Classes%5D!5e0!3m2!1sen!2sin!4v1773853114418!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    className="min-h-70 rounded-2xl border block"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Vikas Bhatt Classes Location"
                                />
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-2 gap-3">
                            {contactInfo.map(({ icon: Icon, label, value }, index) => (
                                <Card
                                    key={index}
                                    className={`rounded-2xl border border-gray-100 shadow-sm
                ${index === contactInfo.length - 1 ? 'col-span-2' : 'max-sm:col-span-2'}
            `}
                                >
                                    <CardContent className="px-4 flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon size={14} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                                                {label}
                                            </p>
                                            <p className="text-[13px] font-medium text-gray-800 wrap-break-word">{value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Right — Form */}
                    <Card className="rounded-3xl shadow-sm">
                        <CardContent className="p-3 px-6">

                            {submitted ? (
                                /* ── Success state ── */
                                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                                        <Send className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-bold text-xl mb-1">Enquiry Sent!</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                                            Thank you! We'll get back to you on{" "}
                                            <span className="font-medium text-slate-700">{form.phone || "your number"}</span> shortly.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-primary/30"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                /* ── Form ── */
                                <form onSubmit={submit} className="flex flex-col gap-5">

                                    <div className="space-y-1.5">
                                        <Label htmlFor="name" className="text-[13.5px] font-semibold text-slate-800">
                                            Full Name <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="name" name="name" value={form.name}
                                            onChange={handleInputChange}
                                            placeholder="Your full name" required
                                            className="rounded-lg py-5 border-gray-200 text-[13.5px] placeholder:text-gray-400 focus-visible:ring-primary/30 focus-visible:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="phone" className="text-[13.5px] font-semibold text-slate-800">
                                            Phone Number <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="phone" name="phone" value={form.phone}
                                            onChange={handleInputChange}
                                            placeholder="Your phone number" required
                                            className="rounded-lg py-5 border-gray-200 text-[13.5px] placeholder:text-gray-400 focus-visible:ring-primary/30 focus-visible:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[13.5px] font-semibold text-slate-800">
                                            Student's Class / Level <span className="text-primary">*</span>
                                        </Label>
                                        <Select value={form.classLevel} onValueChange={(v) => handleSelectChange("classLevel", v || "")}>
                                            <SelectTrigger className="w-full rounded-lg py-5 border-gray-200 text-[13.5px] focus:ring-primary/30 focus:border-primary">
                                                <SelectValue placeholder="Select class or level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classLevels.map(({ value, label }) => (
                                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[13.5px] font-semibold text-slate-800">
                                            Subject of Interest <span className="text-primary">*</span>
                                        </Label>
                                        <Select value={form.subject} onValueChange={(v) => handleSelectChange("subject", v || "")}>
                                            <SelectTrigger className="w-full rounded-lg py-5 border-gray-200 text-[13.5px] focus:ring-primary/30 focus:border-primary">
                                                <SelectValue placeholder="Select subject" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjects.map(({ value, label }) => (
                                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="message" className="text-[13.5px] font-semibold text-slate-800">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message" name="message" value={form.message}
                                            onChange={handleInputChange}
                                            placeholder="Your question or message..."
                                            rows={5}
                                            className="rounded-lg py-3 border-gray-200 text-[13.5px] placeholder:text-gray-400 focus-visible:ring-primary/30 focus-visible:border-primary resize-none"
                                        />
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <p className="text-sm text-red-500 -mt-2">{error}</p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-6 rounded-2xl text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] cursor-pointer bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl"
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

                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}