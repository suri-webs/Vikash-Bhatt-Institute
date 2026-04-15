"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    AlertCircle,
    BookOpen,
    Users,
    Trophy,
    Star,
    CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { getServerUrl } from "../utils/config"

export default function Login() {
    const router = useRouter()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        gmail: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await axios.post(`${getServerUrl()}/login`, formData)
            const { user } = response.data
            login(user)
            console.log(user);
            router.push("/profile")
        } catch (err) {
            setError("Invalid email or password. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const inputClass =
        "w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-150"

    const stats = [
        { icon: Users, label: "Students Enrolled", value: "12,000+" },
        { icon: BookOpen, label: "Courses Available", value: "80+" },
        { icon: Trophy, label: "Success Rate", value: "94%" },
    ]

    const features = [
        "Live & recorded classes by expert faculty",
        "Doubt sessions & personalised mentorship",
        "Mock tests with detailed performance reports",
    ]

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-[85%] mt-20 gap-10 flex justify-between items-center h-full">

                {/* Decorative dot grid */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, row) =>
                        [...Array(8)].map((_, col) => (
                            <div
                                key={`${row}-${col}`}
                                className="absolute w-1 h-1 rounded-full bg-teal-300/40"
                                style={{
                                    left: `${8 + col * 12 + (row % 2) * 5}%`,
                                    top: `${12 + row * 14}%`,
                                }}
                            />
                        ))
                    )}
                </div>

                {/* ── LEFT SIDE ── */}
                <div className="flex-1 relative overflow-hidden rounded-2xl p-12 flex flex-col justify-center min-h-120 gap-8">

                    {/* Heading */}
                    <div className="relative z-10 max-w-md">
                        <h2 className="text-slate-900 text-4xl font-bold leading-tight tracking-tight mb-4">
                            Start your <span className="text-primary">learning journey</span>
                        </h2>
                        <p className="text-slate-500 text-base leading-relaxed">
                            Join thousands of students who have transformed their careers through our industry-leading programs.
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="relative z-10  gap-4 max-w-xl  grid grid-cols-3">
                        {stats.map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className=" bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex  items-center gap-4"
                            >
                                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center mb-2">
                                    <Icon size={16} className="text-cyan-500" />
                                </div>
                                <div className="flex flex-col ">
                                    <span className="text-slate-900 font-bold text-lg leading-none">{value}</span>
                                    <span className="text-slate-400 text-[11px] mt-1 leading-tight">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Feature list */}
                    <div className="relative z-10 max-w-md flex flex-col gap-2.5">
                        {features.map(f => (
                            <div key={f} className="flex items-center gap-2.5">
                                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                                <span className="text-slate-600 text-sm">{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Rating badge */}
                    <div className="relative z-10 flex items-center gap-3 max-w-md">
                        <div className="flex -space-x-2">
                            {["bg-cyan-400", "bg-teal-400", "bg-emerald-400", "bg-sky-400"].map((c, i) => (
                                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                                    {["A", "R", "S", "M"][i]}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                                ))}
                                <span className="text-slate-700 text-xs font-semibold ml-1">4.9</span>
                            </div>
                            <p className="text-slate-400 text-[11px]">Rated by 3,200+ students</p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT SIDE (form) ── */}
                <div className="min-w-sm flex flex-col justify-center py-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                        <div className="h-1 w-full bg-linear-to-r from-cyan-400 to-teal-500" />

                        <div className="px-7 pt-6 pb-7">
                            <div className="mb-6">
                                <h2 className="text-slate-900 text-xl font-bold tracking-tight">
                                    Sign In
                                </h2>
                                <p className="text-slate-400 text-xs mt-0.5">
                                    Enter your credentials to continue
                                </p>
                            </div>

                            <form onSubmit={onSubmit} className="space-y-3.5">
                                <div>
                                    <label
                                        htmlFor="gmail"
                                        className="text-xs font-medium text-slate-600 block mb-1"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            name="gmail"
                                            id="gmail"
                                            placeholder="you@example.com"
                                            value={formData.gmail}
                                            onChange={handleChange}
                                            required
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label htmlFor="password" className="text-xs font-medium text-slate-600">
                                            Password
                                        </label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-[11px] text-cyan-500 hover:text-cyan-600 transition-colors font-medium"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            placeholder="Your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClass} pr-9`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                        <AlertCircle size={13} className="text-red-400 shrink-0" />
                                        <p className="text-red-500 text-xs">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-1 bg-cyan-400 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-sm tracking-wide transition-all duration-150 shadow shadow-cyan-400/30 flex items-center justify-center gap-1.5"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight size={14} />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-slate-400 text-xs pt-0.5">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/auth"
                                        className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>

                    <p className="text-center text-slate-400 text-[11px] mt-4">
                        © 2026 vikas Bhatt Classes · New Delhi, India
                    </p>
                </div>
            </div>
        </div>
    )
}