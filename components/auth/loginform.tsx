"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useGoogleLogin } from "@react-oauth/google"
import {
    Mail, Lock, Eye, EyeOff, ArrowRight, Loader2,
    AlertCircle, BookOpen, Users, Trophy, Star, CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { getServerUrl } from "../utils/config"
import { toast } from "react-toastify"

export default function Login() {
    const router = useRouter()
    const { login } = useAuth()

    const [formData, setFormData] = useState({ gmail: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
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
            toast.success("Login successful! Welcome back 🎉")
            router.push("/profile")
        } catch (err) {
            setError("Invalid email or password. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setGoogleLoading(true)
            try {
                const res = await axios.post(`${getServerUrl()}/login`, {
                    googleToken: tokenResponse.access_token,
                })
                if (res.data.success) {
                    localStorage.setItem("token", res.data.token)
                    login(res.data.user)
                    toast.success("Login successful! Welcome back 🎉")
                    router.push("/profile")
                } else {
                    toast.error(res.data.message || "Google sign-in failed")
                }
            } catch {
                toast.error("Google sign-in failed ❌")
            } finally {
                setGoogleLoading(false)
            }
        },
        onError: () => toast.error("Google sign-in cancelled"),
    })

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
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
            <div className="w-full max-w-7xl pr-10 max-sm:pr-0 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 mt-10 sm:mt-14">

                {/* Decorative dot grid — hidden on small screens */}
                <div className="absolute inset-0 pointer-events-none hidden sm:block">
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

                {/* ── LEFT SIDE — hidden on mobile ── */}
                <div className="hidden lg:flex flex-1 relative overflow-hidden rounded-2xl p-8 xl:p-12 flex-col justify-center gap-8">
                    <div className="relative z-10 max-w-md">
                        <h2 className="text-slate-900 text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-4">
                            Start your <span className="text-cyan-500">learning journey</span>
                        </h2>
                        <p className="text-slate-500 text-base leading-relaxed">
                            Join thousands of students who have transformed their careers through our industry-leading programs.
                        </p>
                    </div>

                    <div className="relative z-10 gap-3 max-w-xl grid grid-cols-3">
                        {stats.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                                    <Icon size={16} className="text-cyan-500" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-slate-900 font-bold text-base leading-none">{value}</span>
                                    <span className="text-slate-400 text-[10px] mt-1 leading-tight">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 max-w-md flex flex-col gap-2.5">
                        {features.map(f => (
                            <div key={f} className="flex items-center gap-2.5">
                                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                                <span className="text-slate-600 text-sm">{f}</span>
                            </div>
                        ))}
                    </div>

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
                <div className="w-full lg:w-auto lg:min-w-95 xl:min-w-105 flex flex-col justify-center">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                        <div className="h-1 w-full bg-linear-to-r from-cyan-400 to-teal-500" />

                        <div className="px-5 sm:px-7 pt-6 pb-7">
                            <div className="mb-6">
                                <h2 className="text-slate-900 text-xl font-bold tracking-tight">Sign In</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Enter your credentials to continue</p>
                            </div>

                            <form onSubmit={onSubmit} className="space-y-3.5">
                                <div>
                                    <label htmlFor="gmail" className="text-xs font-medium text-slate-600 block mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email" name="gmail" id="gmail"
                                            placeholder="you@example.com"
                                            value={formData.gmail} onChange={handleChange}
                                            required className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label htmlFor="password" className="text-xs font-medium text-slate-600">Password</label>
                                        <Link href="/forgot-password" className="text-[11px] text-cyan-500 hover:text-cyan-600 transition-colors font-medium">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password" id="password"
                                            placeholder="Your password"
                                            value={formData.password} onChange={handleChange}
                                            required className={`${inputClass} pr-9`}
                                        />
                                        <button type="button" onClick={() => setShowPassword(p => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
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

                                <button type="submit" disabled={loading}
                                    className="w-full mt-1 bg-cyan-400 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-sm tracking-wide transition-all duration-150 shadow shadow-cyan-400/30 flex items-center justify-center gap-1.5">
                                    {loading ? <><Loader2 size={14} className="animate-spin" /> Signing in...</> : <>Sign In <ArrowRight size={14} /></>}
                                </button>

                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-slate-100" />
                                    <span className="text-slate-300 text-[11px]">or</span>
                                    <div className="flex-1 h-px bg-slate-100" />
                                </div>

                                <button type="button" onClick={() => handleGoogleLogin()} disabled={googleLoading}
                                    className="w-full flex items-center justify-center hover:scale-[1.02] gap-2.5 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed text-slate-700 font-medium text-sm py-2.5 rounded-lg transition-all duration-150 shadow-sm">
                                    {googleLoading ? <Loader2 size={14} className="animate-spin" /> : (
                                        <svg width="16" height="16" viewBox="0 0 48 48">
                                            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.05 29.56 1 24 1 14.82 1 7.07 6.48 3.64 14.19l7.08 5.5C12.43 13.61 17.76 9.5 24 9.5z" />
                                            <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.67c-.55 2.9-2.2 5.36-4.67 7.02l7.17 5.57C43.27 37.28 46.5 31.36 46.5 24.5z" />
                                            <path fill="#FBBC05" d="M10.72 28.31A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.72-4.31l-7.08-5.5A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.55 10.72l8.17-6.41z" />
                                            <path fill="#34A853" d="M24 47c5.56 0 10.22-1.84 13.63-5l-7.17-5.57c-1.84 1.24-4.2 1.97-6.46 1.97-6.24 0-11.57-4.11-13.28-9.69l-8.17 6.41C7.07 41.52 14.82 47 24 47z" />
                                        </svg>
                                    )}
                                    {googleLoading ? "Signing in..." : "Sign in with Google"}
                                </button>

                                <p className="text-center text-slate-400 text-xs pt-0.5">
                                    Don't have an account?{" "}
                                    <Link href="/auth" className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors">Sign Up</Link>
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