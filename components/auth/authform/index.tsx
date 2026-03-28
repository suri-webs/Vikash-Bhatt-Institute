'use client'

import RegistrationForm from "./form"
import LeftPanel from "./leftpanel"



export default function Form() {
    return (
        <div className="min-h-screen mt-10 max-sm:my-20 flex items-center justify-center p-4 ">
            <div className="w-full flex border overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(15,23,42,0.12)] max-w-220">
                <LeftPanel />
                <RegistrationForm />
            </div>
        </div>
    )
}