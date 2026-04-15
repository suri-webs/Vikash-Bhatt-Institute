"use client";

import { useRef } from "react";
import { User, CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ViewEditField } from "./Vieweditfield";

interface PersonalInfoProps {
  fullName: string;
  gmail: string;
  phone: string;
  dob: string;
  editing: boolean;
  classIn: string;
  rollNumber: number|string
  onChange: (field: string, value: string | number) => void;
}

function formatDob(dob: string): string {
  if (!dob) return "";
  const [year, month, day] = dob.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${String(day).padStart(2, "0")} ${months[month - 1]} ${year}`;
}

export function PersonalInfoSection({
  fullName, gmail, phone, dob, classIn, rollNumber,
  editing, onChange,
}: PersonalInfoProps) {
  const dobRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <User size={13} className="text-[#0BBFE0]" />
        <h3 className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">
          Personal Information
        </h3>
      </div>

      <div className="space-y-4">
        <ViewEditField
          label="Full Name"
          value={fullName}
          editing={editing}
          onChange={(v) => onChange("firstName", v)}
          placeholder="Enter your first name"
        />
        <ViewEditField
          label="Class"
          value={classIn}
          editing={editing}
          onChange={(v) => onChange("classIn", v)}
          placeholder="Enter your Class"
        />
        <ViewEditField
          label="rollNumber"
          value={String(rollNumber)}
          editing={editing}
          onChange={(v) => onChange("rollNumberNo", v)}
          placeholder="Enter your rollNumber No."
        />

        <ViewEditField
          label="Email Address"
          value={gmail}
          editing={editing}
          onChange={(v) => onChange("gmail", v)}
          type="email"
          placeholder="Enter your email"
        />
        <ViewEditField
          label="Phone Number"
          value={phone}
          editing={editing}
          onChange={(v) => onChange("phone", v)}
          placeholder="12345678"
        />

        {/* Date of Birth */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Date of Birth</label>
          {editing ? (
            <div
              onClick={() => dobRef.current?.showPicker?.()}
              className="flex items-center w-full text-sm rounded-xl border border-[#0BBFE0] bg-white px-4 py-3 cursor-pointer focus-within:ring-2 focus-within:ring-cyan-100 transition-all"
            >
              <CalendarDays size={15} className="text-gray-400 mr-2.5 shrink-0" />
              <input
                ref={dobRef}
                type="date"
                value={dob}
                onChange={(e) => onChange("dob", e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-800"
              />
            </div>
          ) : (
            <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800">
              {dob ? formatDob(dob) : <span className="text-gray-400">Not specified</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}