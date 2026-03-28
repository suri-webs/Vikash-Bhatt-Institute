'use client'

import { useState } from "react"
import axios from "axios"
import {
    User, Mail, Lock, Eye, EyeOff, FileText,
    ArrowRight, Loader2, AlertCircle, CheckCircle2, GraduationCap,
} from "lucide-react"
import { toast } from "react-toastify"

interface FormData {
    username: string
    gmail: string
    password: string
    rollNumber: string
}

/* ── Sub-components ── */

function MobileLogo() {
    return (
        <div className="flex md:hidden items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#0891b2] to-[#06b6d4]">
                <GraduationCap size={15} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
                <p className="font-semibold text-sm leading-none text-slate-900">Vikash Bhatt</p>
                <p className="text-[9px] font-semibold tracking-widest uppercase mt-0.5 text-[#0891b2]">Classes</p>
            </div>
        </div>
    )
}

function FormHeader() {
    return (
        <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-[#0891b2]">
                Student Registration
            </p>
            <h2 className="text-[22px] font-semibold tracking-tight text-slate-900">
                Create your account
            </h2>
            <p className="text-sm mt-1 text-slate-400">
                Fill in your details to get started
            </p>
        </div>
    )
}

function InputWrapper({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-[5px] tracking-[0.04em] uppercase">
                {label}
            </label>
            <div className="relative">{children}</div>
        </div>
    )
}

function InputIcon({ children }: { children: React.ReactNode }) {
    return (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex">
            {children}
        </span>
    )
}

const inputBase = "w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] py-[10px] pr-3 pl-9 text-[13.5px] text-slate-800 outline-none transition-all duration-[180ms] placeholder:text-slate-400 focus:bg-white focus:border-[#0891b2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]"

function UsernameField({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <InputWrapper label="Username">
            <InputIcon><User size={13} /></InputIcon>
            <input type="text" name="username" placeholder="e.g. rahul_sharma"
                value={value} onChange={onChange} required className={inputBase} />
        </InputWrapper>
    )
}

function EmailField({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <InputWrapper label="Email Address">
            <InputIcon><Mail size={13} /></InputIcon>
            <input type="email" name="gmail" placeholder="you@email.com"
                value={value} onChange={onChange} required className={inputBase} />
        </InputWrapper>
    )
}

function PasswordField({ value, onChange, showPassword, togglePassword }: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    showPassword: boolean
    togglePassword: () => void
}) {
    return (
        <InputWrapper label="Password">
            <InputIcon><Lock size={13} /></InputIcon>
            <input type={showPassword ? "text" : "password"} name="password"
                placeholder="Min. 8 chars" value={value} onChange={onChange} required
                className={`${inputBase} pr-9`} />
            <button type="button" onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 flex bg-transparent border-0 cursor-pointer p-0">
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
        </InputWrapper>
    )
}

function RollNumberField({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <InputWrapper label="Roll Number">
            <InputIcon><FileText size={13} /></InputIcon>
            <input type="text" name="rollNumber" placeholder="VBC-001"
                value={value} onChange={onChange} required className={inputBase} />
        </InputWrapper>
    )
}

function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 bg-rose-50 border-[1.5px] border-rose-200 rounded-[10px] px-3 py-[9px]">
            <AlertCircle size={13} className="text-rose-500 shrink-0" />
            <p className="text-rose-500 text-xs">{message}</p>
        </div>
    )
}

function SubmitButton({ loading }: { loading: boolean }) {
    return (
        <button type="submit" disabled={loading}
            className={`w-full font-bold text-sm text-white py-3 rounded-[10px] border-0 flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(8,145,178,0.3)] transition-all duration-200
                ${loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-br from-[#0891b2] to-[#06b6d4] cursor-pointer"
                }`}>
            {loading
                ? <><Loader2 size={14} className="animate-spin" /> Creating Account...</>
                : <>Register Now <ArrowRight size={14} /></>
            }
        </button>
    )
}

function SuccessScreen() {
    return (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-100">
                <CheckCircle2 size={30} className="text-[#0891b2]" />
            </div>
            <div>
                <p className="font-semibold text-lg text-slate-900">Registration Successful!</p>
                <p className="text-sm mt-1 text-slate-400">Your account is ready. Welcome aboard.</p>
            </div>
            <a href="/login" className="flex items-center gap-1.5 text-sm font-semibold mt-1 text-[#0891b2]">
                Sign in to your portal <ArrowRight size={14} />
            </a>
        </div>
    )
}

function FormFooter() {
    return (
        <div className="border-t border-slate-100 mt-5 pt-3.5 text-center">
            <p className="text-[10px] text-slate-300">© 2026 Vikash Bhatt Classes · All rights reserved</p>
        </div>
    )
}

/* ── Main ── */
export default function RegistrationForm() {
    const [formData, setFormData] = useState<FormData>({ username: "", gmail: "", password: "", rollNumber: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const data = new FormData()
            Object.entries(formData).forEach(([k, v]) => data.append(k, v))
            data.append("role", "student")

            const res = await axios.post("/api/users", data, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (res.data.success) {
                toast.success("Registration successful 🎉")
                setSuccess(true)
            } else {
                toast.error(res.data.error || "Something went wrong")
            }

        } catch (err: any) {
            if (err.response?.data?.error?.includes("duplicate key")) {
                toast.error("Username or Email already exists ❌")
            } else {
                toast.error("Something went wrong ❌")
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex-1 flex flex-col  justify-center px-9 py-8 bg-white md:px-9 px-6">
            {success ? (
                <SuccessScreen />
            ) : (
                <>
                    <MobileLogo />
                    <FormHeader />

                    <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
                        <UsernameField value={formData.username} onChange={handleChange} />
                        <EmailField value={formData.gmail} onChange={handleChange} />

                        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                            <PasswordField
                                value={formData.password}
                                onChange={handleChange}
                                showPassword={showPassword}
                                togglePassword={() => setShowPassword(p => !p)}
                            />
                            <RollNumberField value={formData.rollNumber} onChange={handleChange} />
                        </div>

                        {error && <ErrorBanner message={error} />}

                        <p className="text-[11px] text-slate-400 leading-relaxed">
                            By registering, you agree to our{" "}
                            <a href="#" className="text-[#0891b2] font-semibold">Terms of Service</a>
                            {" "}and{" "}
                            <a href="#" className="text-[#0891b2] font-semibold">Privacy Policy</a>.
                        </p>

                        <SubmitButton loading={loading} />

                        <p className="text-center text-xs text-slate-400">
                            Already have an account?{" "}
                            <a href="/login" className="text-[#0891b2] font-bold">Sign in</a>
                        </p>
                    </form>

                    <FormFooter />
                </>
            )}
        </div>
    )
}