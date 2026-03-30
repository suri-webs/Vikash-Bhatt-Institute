"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "Search courses, subjects...", onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSearch) {
            onSearch(query);
        }
    };

    return (
        <div
            className={`
                hidden sm:flex
                items-center gap-2
                w-125 h-10
                px-3
                rounded-2xl border
                bg-white
                transition-all duration-200
                ${focused
                    ? "border-[#0BBFE0] shadow-[0_0_0_3px_rgba(11,191,224,0.15)]"
                    : "border-gray-200 hover:border-gray-300"
                }
            `}
        >
            {/* Search Icon */}
            <Search
                size={16}
                className={`shrink-0 transition-colors duration-200 ${focused ? "text-[#0BBFE0]" : "text-gray-400"}`}
            />

            {/* Input */}
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none min-w-0"
            />

            {/* Clear Button */}
            {query && (
                <button
                    onClick={handleClear}
                    className="shrink-0 p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                    aria-label="Clear search"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
}