// lib/courses.ts — single source of truth for all course data

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
        id: "mathematics-9-10",
        title: "Mathematics Mastery",
        subject: "Mathematics",
        classLevel: "Class 9–10",
        price: 2999,
        image: "/courses/math.jpg",
        description: "Complete CBSE mathematics with concept-first approach, covering algebra, geometry, and trigonometry.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "science-9-10",
        title: "Science Foundation",
        subject: "Science",
        classLevel: "Class 9–10",
        price: 2999,
        image: "/courses/science.jpg",
        description: "Physics, Chemistry and Biology combined for Class 9–10 with exam-focused practice.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "mathematics-11-12-science",
        title: "Advanced Mathematics",
        subject: "Mathematics",
        classLevel: "Class 11–12 (Science)",
        price: 4999,
        image: "/courses/adv-math.jpg",
        description: "Deep dive into calculus, vectors, probability and all Science stream math topics.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "physics-11-12",
        title: "Physics Pro",
        subject: "Physics",
        classLevel: "Class 11–12 (Science)",
        price: 4499,
        image: "/courses/physics.jpg",
        description: "Mechanics, thermodynamics, optics and modern physics with JEE-level problem solving.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "accountancy-11-12",
        title: "Accountancy Complete",
        subject: "Accountancy",
        classLevel: "Class 11–12 (Commerce)",
        price: 3999,
        image: "/courses/accountancy.jpg",
        description: "Financial statements, company accounts and cash flow mastery for Commerce students.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "economics-11-12",
        title: "Economics Explained",
        subject: "Economics",
        classLevel: "Class 11–12 (Commerce)",
        price: 3499,
        image: "/courses/economics.jpg",
        description: "Micro and macroeconomics concepts with real-world examples and board exam prep.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "jee-mathematics",
        title: "JEE Mathematics",
        subject: "Mathematics",
        classLevel: "JEE Preparation",
        price: 7999,
        image: "/courses/jee-math.jpg",
        description: "Intensive JEE Mains & Advanced mathematics with 500+ solved problems.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "neet-biology",
        title: "NEET Biology",
        subject: "Biology",
        classLevel: "NEET Preparation",
        price: 6999,
        image: "/courses/neet-bio.jpg",
        description: "Complete NCERT-based biology with NEET PYQ analysis and mock tests.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "math-6-8",
        title: "Math Foundations",
        subject: "Mathematics",
        classLevel: "Class 6–8",
        price: 1999,
        image: "/courses/math-foundation.jpg",
        description: "Build strong fundamentals in numbers, fractions, algebra and geometry.",
        instructor: "Vikas Bhatt",
    },
    {
        id: "english-6-10",
        title: "English Language Skills",
        subject: "English",
        classLevel: "Class 6–10",
        price: 1999,
        image: "/courses/english.jpg",
        description: "Grammar, comprehension, writing skills and literature for middle and high school.",
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