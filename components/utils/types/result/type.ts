export interface IResult {
    _id: string;
    rollNumber: string;
    url: string;
    subject: string;
    month: string;
    week: string;
    marksScored: number;
    totalMarks: number;
}

export function isPassed(result: IResult): boolean {
    if (!result.totalMarks) return false;
    return (result.marksScored / result.totalMarks) * 100 >= 33;
}

export function getPercentage(result: IResult): number {
    if (!result.totalMarks) return 0;
    return Math.round((result.marksScored / result.totalMarks) * 100);
}

export const SUBJECT_CONFIG: Record<string, { color: string; bg: string; light: string; gradient: string }> = {
    English: { color: "#3b82f6", bg: "#eff6ff", light: "#dbeafe", gradient: "from-blue-500 to-primary" },
    Mathematics: { color: "#7c3aed", bg: "#f5f3ff", light: "#ede9fe", gradient: "from-violet-500 to-purple-600" },
    Science: { color: "#059669", bg: "#ecfdf5", light: "#d1fae5", gradient: "from-emerald-500 to-green-600" },
    Physics: { color: "#4f46e5", bg: "#eef2ff", light: "#e0e7ff", gradient: "from-indigo-500 to-primary" },
    Chemistry: { color: "#db2777", bg: "#fdf2f8", light: "#fce7f3", gradient: "from-pink-500 to-rose-600" },
    Biology: { color: "#16a34a", bg: "#f0fdf4", light: "#dcfce7", gradient: "from-green-500 to-emerald-600" },
    History: { color: "#d97706", bg: "#fffbeb", light: "#fef3c7", gradient: "from-amber-500 to-yellow-600" },
    Geography: { color: "#0d9488", bg: "#f0fdfa", light: "#ccfbf1", gradient: "from-teal-500 to-cyan-600" },
    Hindi: { color: "#ea580c", bg: "#fff7ed", light: "#fed7aa", gradient: "from-orange-500 to-red-500" },
    Computer: { color: "#0284c7", bg: "#f0f9ff", light: "#bae6fd", gradient: "from-sky-500 to-blue-500" },
};

export function getSubjectConfig(subject: string) {
    const key = Object.keys(SUBJECT_CONFIG).find((k) =>
        subject.toLowerCase().includes(k.toLowerCase())
    );
    return SUBJECT_CONFIG[key ?? ""] ?? {
        color: "#6b7280", bg: "#f9fafb", light: "#f3f4f6", gradient: "from-gray-500 to-gray-600",
    };
}

export const CLASS_OPTIONS = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
export const BATCH_OPTIONS = ["All", "Morning", "Evening", "Night"];