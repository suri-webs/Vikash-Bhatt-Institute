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
} from "lucide-react"
import Link from "next/link"

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
            const response = await axios.post("/api/login", formData)

            const { user } = response.data
            login(user)
            router.push("/profile")
        } catch (err) {
            setError("Invalid email or password. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const inputClass =
        "w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-150"

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-[85%] mt-20 gap-10 flex justify-end items-center h-full ">
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
                                        <Mail
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
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
                                        <label
                                            htmlFor="password"
                                            className="text-xs font-medium text-slate-600"
                                        >
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
                                        <Lock
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
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
                                        <AlertCircle
                                            size={13}
                                            className="text-red-400 shrink-0"
                                        />
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
                        © 2026 Vikash Bhatt Classes · New Delhi, India
                    </p>
                </div>
            </div>
        </div>
    )
}