import { Input } from "@/components/ui/input";

export const editInputCls =
  "w-full text-sm rounded-xl border border-[#0BBFE0] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-100 transition-all text-gray-800 placeholder:text-gray-300";

interface ViewEditFieldProps {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}

export function ViewEditField({
  label,
  value,
  editing,
  onChange,
  type = "text",
  placeholder,
}: ViewEditFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1.5">{label}</label>
      {editing ? (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl py-5 border-[#0bc0e079] focus-visible:ring-cyan-100 text-gray-800 placeholder:text-gray-300"
        />
      ) : (
        <div className="w-full text-sm rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800">
          {value || <span className="text-gray-400">Not specified</span>}
        </div>
      )}
    </div>
  );
}