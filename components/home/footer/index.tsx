import { GraduationCap, Linkedin, Instagram, Facebook, Github } from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = ({ size = 15 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Footer() {
    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Courses", href: "#courses" },
        { name: "Contact", href: "#contact" },
    ];

    const courses = [
        { name: "Class 1–8", href: "#class1-8" },
        { name: "Class 9–10", href: "#class9-10" },
        { name: "Class 11–12", href: "#class11-12" },
        { name: "JEE / NEET", href: "#jee-neet" },
        { name: "B.Com", href: "#bcom" },
    ];

    const contactInfo = [
        {
            label: "+91 98765 43210",
            href: "tel:+919876543210",
            iconPath: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
        },
        {
            label: "info@vikasbhattclasses.com",
            href: "mailto:info@vikasbhattclasses.com",
            iconPath: "M2 4v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2z M2 7l10 7 10-7"
        },
        {
            label: "New Delhi, India",
            href: "https://maps.google.com/?q=New+Delhi,India",
            iconPath: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z"
        }
    ];

    const socialLinks = [

        { name: "LinkedIn", href: "https://linkedin.com/in/vikasbhatt", icon: <Linkedin size={16} />, hoverColor: "hover:text-[#0A66C2]" },
        { name: "Instagram", href: "https://instagram.com/vikasbhattclasses", icon: <Instagram size={16} />, hoverColor: "hover:text-[#E1306C]" },
        { name: "Facebook", href: "https://facebook.com/vikasbhattclasses", icon: <Facebook size={16} />, hoverColor: "hover:text-[#1877F2]" },
        { name: "WhatsApp", href: "https://wa.me/919876543210", icon: <WhatsAppIcon size={16} />, hoverColor: "hover:text-[#25D366]" },
    ];

    return (
        <footer className="bg-[#0f1623] text-[#c9d1d9] font-sans w-full">
            {/* Main grid — max-width centered */}
            <div className="w-full max-lg:px-4 max-w-7xl mx-auto pt-12 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand Column */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <Link href="/" className="flex mb-3 items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                            <GraduationCap size={16} className="text-white" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-bold text-sm tracking-tight">vikas Bhatt</span>
                            <span className="text-cyan-500 font-medium text-[10px] tracking-widest uppercase">Classes</span>
                        </div>
                    </Link>
                    <p className="text-sm leading-relaxed text-[#8b96a5] max-w-70 m-0 mb-5">
                        Empowering students to achieve excellence with expert guidance, personal attention, and proven methods — from Class 1 to Graduation.
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className={`w-8 h-8 rounded-lg bg-[#1a2332] border border-[#1e2a3a] flex items-center justify-center text-[#8b96a5] transition-all duration-200 ${social.hoverColor} hover:border-current hover:scale-110`}
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-[15px] mb-4 mt-0 tracking-wide">Quick Links</h4>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                        {quickLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-[#8b96a5] no-underline text-sm transition-colors duration-200 hover:text-white">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Courses */}
                <div>
                    <h4 className="text-white font-bold text-[15px] mb-4 mt-0 tracking-wide">Courses</h4>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                        {courses.map((course) => (
                            <li key={course.name}>
                                <Link href={course.href} className="text-[#8b96a5] no-underline text-sm transition-colors duration-200 hover:text-white">
                                    {course.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold text-[15px] mb-4 mt-0 tracking-wide">Contact Info</h4>
                    <div className="flex flex-col gap-3">
                        {contactInfo.map(({ label, href, iconPath }, index) => (
                            <Link
                                key={index}
                                href={href}
                                target={href.includes('http') ? "_blank" : "_self"}
                                rel={href.includes('http') ? "noopener noreferrer" : ""}
                                className="flex items-center gap-2.5 no-underline group"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b96a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:stroke-white transition-colors duration-200">
                                    <path d={iconPath} />
                                </svg>
                                <span className="text-sm text-[#8b96a5] transition-colors duration-200 group-hover:text-white break-all">
                                    {label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider + Copyright — full bleed */}
            <div className="max-w-7xl max-sm:flex-col mx-auto border-t flex justify-between border-[#1e2a3a] py-5 text-center max-sm:px-6">
                <p className="m-0 text-[13px] text-[#5a6478]">
                    © 2026 vikas Bhatt Classes. All rights reserved.

                </p>
                <div className="flex gap-2 items-center">
                    <Link
                        href="https://github.com/surajshakya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8b96a5] hover:text-white transition-colors duration-200 underline decoration-[#1e2a3a] hover:decoration-white font-medium text-xs ml-1"
                    >
                        Built by Suraj Shakya
                    </Link>
                    <Link
                        href={'https://surajshakya.dev'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-lg bg-[#1a2332] border border-[#1e2a3a] flex items-center justify-center text-[#8b96a5] transition-all duration-200 hover:text-[#00D4AA] hover:border-current hover:scale-110`}
                    >
                        <GraduationCap size={16} />
                    </Link>
                    <Link
                        href={'https://github.com/surajshakya'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-lg bg-[#1a2332] border border-[#1e2a3a] flex items-center justify-center text-[#8b96a5] transition-all duration-200 hover:text-white hover:border-current hover:scale-110`}
                    >
                        <Github size={16} />
                    </Link>

                </div>
            </div>
        </footer>
    );
}