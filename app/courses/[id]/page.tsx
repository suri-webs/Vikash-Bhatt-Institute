import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Users, Tag, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courses, getCourseById } from "@/lib/course";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

// ── Static params for all courses ─────────────────────────────────────────

export async function generateStaticParams() {
    return courses.map((c) => ({ id: c.id }));
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = getCourseById(id);
    if (!course) notFound();

    return (
        <div>
            
            <Navbar />
            <main className="min-h-screen w-full flex justify-center items-center flex-col bg-gray-50">
                <div className="bg-white w-[80%] border-b border-gray-100">
                    <div className="max-w-full mx-auto px-4 py-10">

                        {/* Back link */}
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0BBFE0] transition-colors mb-6"
                        >
                            <ArrowLeft size={14} />
                            Back to Courses
                        </Link>

                        <div className="flex flex-col md:flex-row gap-8 items-start">

                            {/* Course image */}
                            <div className="w-full md:w-64 h-44 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                                {course.image ? (
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <BookOpen size={40} className="text-gray-300" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className="bg-[#e0f9ff] text-[#0BBFE0] border border-[#b3eef8] hover:bg-[#e0f9ff] text-xs font-semibold rounded-full px-3">
                                        {course.subject}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs font-medium rounded-full px-3">
                                        {course.classLevel}
                                    </Badge>
                                </div>

                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                                    {course.title}
                                </h1>

                                {course.description && (
                                    <p className="text-gray-500 text-[15px] leading-relaxed mb-4">
                                        {course.description}
                                    </p>
                                )}

                                {course.instructor && (
                                    <p className="text-sm text-gray-400 flex items-center gap-1.5">
                                        <GraduationCap size={14} className="text-[#0BBFE0]" />
                                        By <span className="font-medium text-gray-600">{course.instructor}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mx-auto px-4 py-10">
                    <div className="w-[80%] mx-auto  grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Left — details */}
                        <div className="md:col-span-2 space-y-4">
                            <Card className="rounded-2xl border-gray-100 shadow-sm">
                                <CardContent className="p-6 space-y-4">
                                    <h2 className="text-base font-bold text-gray-800">Course Details</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Detail icon={<BookOpen size={14} className="text-[#0BBFE0]" />} label="Subject" value={course.subject} />
                                        <Detail icon={<Users size={14} className="text-[#0BBFE0]" />} label="Class Level" value={course.classLevel} />
                                        <Detail icon={<Tag size={14} className="text-[#0BBFE0]" />} label="Price" value={`₹${course.price.toLocaleString("en-IN")}`} />
                                        {course.instructor && (
                                            <Detail icon={<GraduationCap size={14} className="text-[#0BBFE0]" />} label="Instructor" value={course.instructor} />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right — price CTA */}
                        <div>
                            <Card className="rounded-2xl border-gray-100 shadow-sm sticky top-6">
                                <CardContent className="p-6 flex flex-col gap-4 items-center text-center">
                                    <p className="text-3xl font-extrabold text-gray-900">
                                        ₹{course.price.toLocaleString("en-IN")}
                                    </p>
                                    <Button className="w-full bg-[#0BBFE0] hover:bg-[#09a8c7] text-white font-semibold rounded-xl py-5 shadow-md shadow-cyan-200">
                                        Enroll Now
                                    </Button>
                                    <Link
                                        href="/#contact"
                                        className="text-sm text-[#0BBFE0] hover:underline font-medium"
                                    >
                                        Have questions? Contact us
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

// ── Detail row helper ─────────────────────────────────────────────────────

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-2">
            <div className="mt-0.5 shrink-0">{icon}</div>
            <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
        </div>
    );
}