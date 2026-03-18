'use client';

import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
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

export default function Contact() {
    const [form, setForm] = useState({ name: '', phone: '', className: '', message: '' });

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <section id="contact" className="w-full py-24 bg-white">
            <div className="max-w-7xl mx-auto max-lg:px-4 flex flex-col">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">

                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-sky-200 px-4 py-1.5 rounded-full mb-5">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Send Your Enquiry
                    </h2>
                    <p className="text-gray-500 text-[14.5px] mt-2 font-normal">
                        Have questions? Fill out the form below and we&apos;ll get back to you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-15">

                    {/* Left — Map + Contact Info */}
                    <div className="flex flex-col gap-4">
                        {/* Google Map Embed */}
                        <Card className="overflow-hidden rounded-3xl shadow-sm flex-1">
                            <CardContent className="p-2 h-full min-h-70">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.1560913898857!2d77.19804167747499!3d28.744756230159155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cff722a24d77d%3A0x8b756a580badb8c1!2sVBC%20%5BVikas%20Bhatt%20Classes%5D!5e0!3m2!1sen!2sin!4v1773853114418!5m2!1sen!2sin" width="100%"
                                    height="100%"
                                    className='min-h-70 rounded-2xl border block'
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Vikas Bhatt Classes Location"></iframe>

                            </CardContent>
                        </Card>

                        {/* Contact Detail Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Card className="rounded-2xl border border-gray-100 shadow-sm">
                                <CardContent className="py-4 flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#2d9cdb]/10 flex items-center justify-center shrink-0">
                                        <Phone size={14} className="text-[#2d9cdb]" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                                        <p className="text-[13px] font-medium text-gray-800">+91 98765 43210</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border border-gray-100 shadow-sm">
                                <CardContent className="p-4 flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#2d9cdb]/10 flex items-center justify-center shrink-0">
                                        <MapPin size={14} className="text-[#2d9cdb]" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
                                        <p className="text-[13px] font-medium text-gray-800">New Delhi, India</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border border-gray-100 shadow-sm">
                                <CardContent className="p-4 flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#2d9cdb]/10 flex items-center justify-center shrink-0">
                                        <Clock size={14} className="text-[#2d9cdb]" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Hours</p>
                                        <p className="text-[13px] font-medium text-gray-800">Mon–Sat, 9–6 PM</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <Card className="rounded-3xl shadow-sm">
                        <CardContent className="p-3 px-6">
                            <form onSubmit={submit} className="flex flex-col gap-5">

                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-[13.5px] font-semibold text-gray-800">
                                        Name <span className="text-[#2d9cdb]">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handle}
                                        placeholder="Your full name"
                                        required
                                        className="rounded-lg py-5 border-gray-200 text-[13.5px] placeholder:text-gray-400 focus-visible:ring-[#2d9cdb]/30 focus-visible:border-[#2d9cdb]"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="text-[13.5px] font-semibold text-gray-800">
                                        Phone Number <span className="text-[#2d9cdb]">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handle}
                                        placeholder="Your phone number"
                                        required
                                        className="rounded-lg py-5 border-gray-200 text-[13.5px] placeholder:text-gray-400 focus-visible:ring-[#2d9cdb]/30 focus-visible:border-[#2d9cdb]"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="className" className="text-[13.5px] font-semibold text-gray-800">
                                        Class <span className="text-[#2d9cdb]">*</span>
                                    </Label>
                                    <Select
                                        value={form.className}
                                        onValueChange={(val) => setForm((p) => ({ ...p, className: val ?? "" }))}
                                    >
                                        <SelectTrigger className="w-full rounded-lg py-5 border-gray-200 text-[13.5px] focus:ring-[#2d9cdb]/30 focus:border-[#2d9cdb]">
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

                                <div className="space-y-1.5">
                                    <Label htmlFor="message" className="text-[13.5px] font-semibold text-gray-800">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handle}
                                        placeholder="Your question or message..."
                                        rows={5}
                                        className="rounded-lg py-5 border-gray-200 text-[13.5px] placeholder:text-gray-400 focus-visible:ring-[#2d9cdb]/30 focus-visible:border-[#2d9cdb] resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-6 rounded-2xl text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                                    style={{
                                        background: 'linear-gradient(135deg, #2d9cdb, #0ea5e9)',
                                        boxShadow: '0 6px 20px rgba(45,156,219,0.35)',
                                    }}
                                >
                                    <Send size={15} />
                                    Send Enquiry
                                </Button>

                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}