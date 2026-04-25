"use client";

import { MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const BIO_MAX = 500;

interface LocationState {
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
}

function formatLocation(loc: LocationState): string {
  return [loc.address, loc.city, loc.state, loc.pincode, loc.country].filter(Boolean).join(", ");
}

interface AdditionalInfoProps {
  location: LocationState;
  bio: string;
  editing: boolean;
  onLocationChange: (field: keyof LocationState, value: string) => void;
  onBioChange: (value: string) => void;
}

const inputCls = "rounded-xl border-[#0BBFE0] focus-visible:ring-cyan-100 text-gray-800 placeholder:text-gray-300 text-sm";

export function AdditionalInfoSection({ location, bio, editing, onLocationChange, onBioChange }: AdditionalInfoProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <MapPin size={13} className="text-[#0BBFE0]" />
        <h3 className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">Additional Information</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-2">Location</label>
          {editing ? (
            <div className="space-y-2">
              <Input value={location.address} onChange={(e) => onLocationChange("address", e.target.value)} placeholder="Street address" className={inputCls} />
              <Input value={location.city}    onChange={(e) => onLocationChange("city", e.target.value)}    placeholder="City"           className={`${inputCls} w-1/2`} />
              <div className="flex gap-2">
                <Input value={location.state}   onChange={(e) => onLocationChange("state", e.target.value)}   placeholder="State"   className={inputCls} />
                <Input value={location.country} onChange={(e) => onLocationChange("country", e.target.value)} placeholder="Country" className={inputCls} />
              </div>
              <Input value={location.pincode} onChange={(e) => onLocationChange("pincode", e.target.value)} placeholder="Pincode" className={`${inputCls} w-1/3`} />
            </div>
          ) : (
            <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 min-h-24 text-gray-800">
              {formatLocation(location) || <span className="text-gray-400">Not specified</span>}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Bio</label>
          {editing ? (
            <>
              <Textarea rows={5} value={bio} maxLength={BIO_MAX} onChange={(e) => onBioChange(e.target.value)} placeholder="Tell us about yourself..." className="rounded-xl border-[#0BBFE0] focus-visible:ring-cyan-100 text-gray-800 placeholder:text-gray-300 resize-none text-sm" />
              <p className="text-xs text-gray-400 mt-1">{bio.length}/{BIO_MAX} characters</p>
            </>
          ) : (
            <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 min-h-25 text-gray-800">
              {bio || <span className="text-gray-400">No bio added yet</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}