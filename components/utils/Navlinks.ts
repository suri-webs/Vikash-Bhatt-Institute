import { Info, BookOpen, Star, MessageSquare, Phone } from "lucide-react";

export const navLinks = [
    { label: "About", href: "/about", icon: Info, sectionId: null },
    { label: "Courses", href: "/#courses", icon: BookOpen, sectionId: "courses" },
    { label: "Why Choose Us", href: "/#whychooseus", icon: Star, sectionId: "whychooseus" },
    { label: "Testimonials", href: "/#testimonials", icon: MessageSquare, sectionId: "testimonials" },
    { label: "Contact", href: "/#contact", icon: Phone, sectionId: "contact" },
];