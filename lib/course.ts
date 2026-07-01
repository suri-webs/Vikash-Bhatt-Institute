export interface Course {
    id: string;
    title: string;
    subject: string;
    classLevel: string;
    price: number;
    image: string;
    description?: string;
    instructor?: string;
}

export const courses: Course[] = [
    {
        id: "foundation",
        title: "Foundation Course",
        subject: "Maths, English, Hindi, EVS",
        classLevel: "Class 1–5",
        price: 1499,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
        description: "Strong foundation in Maths, English, Hindi, and EVS with activity-based and concept-clear methods. Designed to cultivate a love for learning in young minds.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "middle-school",
        title: "Middle School Program",
        subject: "Maths, Science, SST, English",
        classLevel: "Class 6–8",
        price: 1999,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
        description: "In-depth coverage of all NCERT subjects — Maths, Science, Social Science, English, and Hindi. Focusing on core conceptual understanding and building confidence.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "secondary",
        title: "Secondary Board Prep",
        subject: "All Subjects (Board Focus)",
        classLevel: "Class 9–10",
        price: 2999,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
        description: "Complete board exam preparation with comprehensive test series, previous years' question (PYQ) analysis, and time-management strategies for high scores.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "senior-science",
        title: "Senior Sec – Science",
        subject: "Physics, Chemistry, Maths, Biology",
        classLevel: "Class 11–12 (Science)",
        price: 4999,
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
        description: "Advanced Physics, Chemistry, Mathematics, and Biology with deep conceptual clarity, rigorous numerical practice, and preparation for board exams and entrance tests.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "senior-commerce",
        title: "Senior Sec – Commerce",
        subject: "Accounts, BSt, Economics, Maths",
        classLevel: "Class 11–12 (Commerce)",
        price: 4499,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        description: "Accountancy, Business Studies, Economics, and Mathematics taught with practical examples, real-world case studies, and focused board preparation.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "jee-neet",
        title: "JEE & NEET Prep",
        subject: "Physics, Chemistry, Maths, Biology",
        classLevel: "Competitive Entrance",
        price: 7999,
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
        description: "Intensive problem-solving, regular mock tests, performance analysis, and speed/accuracy revisions for IIT-JEE (Mains & Advanced) and NEET aspirants.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "nda-cds",
        title: "NDA / CDS / Defence",
        subject: "Maths, English, General Knowledge",
        classLevel: "Defence Entry Exams",
        price: 5999,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        description: "Maths, English, and GK preparation for defence service entrance examinations with structured mock tests and physical preparation guidelines.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "bcom",
        title: "B.Com Graduation",
        subject: "Accounts, Law, Business Maths, Stats",
        classLevel: "B.Com Graduation",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
        description: "Business Mathematics, Accountancy, Business Law, Statistics, and Economics for B.Com students across all years. Semester-wise structured batches.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "olympiad",
        title: "Olympiad & Talent",
        subject: "Maths, Science, English Prep",
        classLevel: "Specialist Training",
        price: 2499,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        description: "Advanced training for Mathematics, Science, and English Olympiads. Challenges students to think beyond the classroom curriculum and excel.",
        instructor: "Vikas Bhatt",
    },
];

// ── Helpers ──────────────────────────────────────────────────────────────

export function getCourseById(id: string): Course | undefined {
    return courses.find((c) => c.id === id);
}

export function searchCourses(query: string): Course[] {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return courses.filter(
        (c) =>
            c.title.toLowerCase().includes(q) ||
            c.subject.toLowerCase().includes(q) ||
            c.classLevel.toLowerCase().includes(q)
    );
}