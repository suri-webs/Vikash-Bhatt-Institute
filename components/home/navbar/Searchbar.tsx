"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, BookOpen, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Course, searchCourses } from "@/lib/course";

interface SearchBarProps {
    placeholder?: string;
}

// ── Subject color tags ────────────────────────────────────────────────────

const subjectColors: Record<string, string> = {
    Mathematics: "bg-blue-50 text-blue-600 border-blue-100",
    Science: "bg-green-50 text-green-600 border-green-100",
    Physics: "bg-violet-50 text-violet-600 border-violet-100",
    Chemistry: "bg-orange-50 text-orange-600 border-orange-100",
    Biology: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Accountancy: "bg-amber-50 text-amber-600 border-amber-100",
    Economics: "bg-rose-50 text-rose-600 border-rose-100",
    English: "bg-sky-50 text-sky-600 border-sky-100",
};

function subjectColor(subject: string) {
    return subjectColors[subject] ?? "bg-gray-50 text-gray-600 border-gray-100";
}

function formatPrice(price: number) {
    return `₹${price.toLocaleString("en-IN")}`;
}

// ── Component ─────────────────────────────────────────────────────────────

export function SearchBar({ placeholder = "Search courses, subjects..." }: SearchBarProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [results, setResults] = useState<Course[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const showDropdown = focused && query.trim().length > 0;

    // ── Search on query change ──
    useEffect(() => {
        if (query.trim().length === 0) {
            setResults([]);
            setActiveIndex(-1);
            return;
        }
        setResults(searchCourses(query));
        setActiveIndex(-1);
    }, [query]);

    // ── Close dropdown on outside click ──
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery("");
        setResults([]);
        inputRef.current?.focus();
    };

    const navigateToCourse = (id: string) => {
        setQuery("");
        setResults([]);
        setFocused(false);
        router.push(`/courses/${id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, -1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0 && results[activeIndex]) {
                navigateToCourse(results[activeIndex].id);
            }
        } else if (e.key === "Escape") {
            setFocused(false);
        }
    };

    return (
        <div ref={containerRef} className="relative w-130 hidden sm:block">

            {/* ── Input bar ── */}
            <div
                className={`
                    flex items-center gap-2 h-10 px-3 rounded-2xl border bg-white
                    transition-all duration-200
                    ${focused
                        ? "border-[#0BBFE0] shadow-[0_0_0_3px_rgba(11,191,224,0.15)]"
                        : "border-gray-200 hover:border-gray-300"
                    }
                `}
            >
                <Search
                    size={15}
                    className={`shrink-0 transition-colors duration-200 ${focused ? "text-[#0BBFE0]" : "text-gray-400"}`}
                />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none min-w-0"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="shrink-0 p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={13} />
                    </button>
                )}
            </div>

            {/* ── Dropdown ── */}
            {showDropdown && (
                <div className="absolute top-12 left-0 right-0 z-50 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">

                    {results.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">No courses found</p>
                            <p className="text-xs text-gray-400">
                                Try searching by subject or class level
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Result count header */}
                            <div className="px-3 pt-3 pb-1.5">
                                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                                    {results.length} course{results.length !== 1 ? "s" : ""} found
                                </p>
                            </div>

                            {/* Results list */}
                            <ul className="max-h-80 overflow-y-auto pb-2">
                                {results.map((course, i) => (
                                    <li key={course.id}>
                                        <button
                                            onMouseDown={() => navigateToCourse(course.id)}
                                            onMouseEnter={() => setActiveIndex(i)}
                                            className={`
                                                w-full flex items-center gap-3 px-3 py-2.5 text-left
                                                transition-colors duration-100 group
                                                ${activeIndex === i ? "bg-[#f0fbfe]" : "hover:bg-gray-50"}
                                            `}
                                        >
                                            {/* Course image / fallback */}
                                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback to icon on broken image
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                        (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
                                                    }}
                                                />
                                                <BookOpen size={16} className="text-gray-300 hidden" />
                                            </div>

                                            {/* Text */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                                                    {highlightMatch(course.title, query)}
                                                </p>
                                                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${subjectColor(course.subject)}`}>
                                                        {course.subject}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 truncate">
                                                        {course.classLevel}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price + arrow */}
                                            <div className="shrink-0 flex items-center gap-1">
                                                <span className="text-sm font-bold text-[#0BBFE0]">
                                                    {formatPrice(course.price)}
                                                </span>
                                                <ChevronRight
                                                    size={14}
                                                    className={`text-gray-300 transition-transform duration-150 ${activeIndex === i ? "translate-x-0.5 text-[#0BBFE0]" : ""}`}
                                                />
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer hint */}
                            <div className="border-t border-gray-50 px-3 py-2 flex items-center justify-between">
                                <p className="text-[10px] text-gray-300">
                                    ↑↓ navigate · Enter to open · Esc to close
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Highlight matching text ───────────────────────────────────────────────

function highlightMatch(text: string, query: string) {
    if (!query.trim()) return <>{text}</>;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-[#d0f4fc] text-[#0BBFE0] rounded px-0.5 not-italic font-semibold">
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
}