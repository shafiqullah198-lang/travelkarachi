import { useState } from "react";
import { Check, ChevronDown, Upload, ArrowRight } from "lucide-react";

const steps = ["Search", "Select", "Passengers", "Review", "Confirm"];

export function PassengerBookingForm() {
  const [activeStep] = useState(2);
  const [title, setTitle] = useState("Mr");
  const [fareStickyOpen, setFareStickyOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Stepper */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] px-4 md:px-8 py-4 md:py-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-x-auto">
        <div className="flex items-center justify-between min-w-[340px] max-w-2xl mx-auto">
          {steps.map((step, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            return (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[12px] md:text-[13px] font-semibold transition-all ${
                    done ? "bg-[#22C55E] text-white" : active ? "bg-[#4F46E5] text-white shadow-[0_0_0_4px_#EEF2FF]" : "bg-[#F1F5F9] text-[#94A3B8]"
                  }`}>
                    {done ? <Check size={14} strokeWidth={2.5} /> : i + 1}
                  </div>
                  <span className={`text-[10px] md:text-[11px] font-medium whitespace-nowrap ${active ? "text-[#4F46E5]" : done ? "text-[#22C55E]" : "text-[#94A3B8]"}`}>
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 w-10 md:w-16 mx-2 mb-5 rounded-full ${i < activeStep ? "bg-[#22C55E]" : "bg-[#E2E8F0]"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Fare summary toggle bar */}
      <div className="lg:hidden bg-white border border-[#E2E8F0] rounded-[12px] p-3 shadow-sm">
        <button onClick={() => setFareStickyOpen(!fareStickyOpen)}
          className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-[#0F172A]">Fare Summary</span>
            <span className="text-[12px] font-bold text-[#4F46E5]">$340.00</span>
          </div>
          <ChevronDown size={16} className={`text-[#94A3B8] transition-transform ${fareStickyOpen ? "rotate-180" : ""}`} />
        </button>
        {fareStickyOpen && (
          <div className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-2">
            {[
              { label: "Base Fare", value: "$280.00" },
              { label: "Taxes",     value: "$58.00"  },
              { label: "Surcharge", value: "$24.00"  },
              { label: "Discount",  value: "-$12.00" },
              { label: "Promo",     value: "-$10.00" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-[12px] text-[#64748B]">{row.label}</span>
                <span className={`text-[12px] font-medium ${row.value.startsWith("-") ? "text-[#22C55E]" : "text-[#0F172A]"}`}>{row.value}</span>
              </div>
            ))}
            <button className="w-full h-10 mt-2 rounded-[10px] text-white font-semibold text-[13px] flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              Continue to Review <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Form */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#4F46E5] text-white text-[12px] font-bold flex items-center justify-center">1</div>
                <span className="text-[13px] md:text-[14px] font-semibold text-[#0F172A]">Passenger 1 — Adult</span>
              </div>
              <ChevronDown size={16} className="text-[#94A3B8]" />
            </div>

            <div className="px-4 md:px-6 py-4 md:py-5 space-y-4 md:space-y-5">
              {/* Title */}
              <div>
                <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">Title</label>
                <div className="flex gap-2 flex-wrap">
                  {["Mr","Mrs","Miss","Dr"].map((t) => (
                    <button key={t} onClick={() => setTitle(t)}
                      className={`px-3 md:px-4 py-2 rounded-[10px] text-[13px] font-medium border transition-all ${
                        title === t ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]" : "border-[#E2E8F0] text-[#64748B] hover:border-[#4F46E5]"
                      }`}>{t}</button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <FloatingInput label="First Name" placeholder="e.g. Sara" />
                <FloatingInput label="Last Name"  placeholder="e.g. Malik" />
              </div>

              {/* DOB */}
              <div>
                <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">Date of Birth</label>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <SelectField placeholder="Day"   options={Array.from({length:31},(_,i)=>String(i+1).padStart(2,"0"))} />
                  <SelectField placeholder="Month" options={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]} />
                  <SelectField placeholder="Year"  options={Array.from({length:70},(_,i)=>String(2006-i))} />
                </div>
              </div>

              {/* Nationality + Passport */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <SelectField label="Nationality" placeholder="Select country" options={["Pakistan","UAE","United Kingdom","Saudi Arabia","USA","Germany"]} />
                <FloatingInput label="Passport Number" placeholder="e.g. AA1234567" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">Passport Expiry</label>
                  <input type="date"
                    className="w-full h-[48px] md:h-[52px] px-4 rounded-[10px] border border-[#E2E8F0] text-[13px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">Gender</label>
                  <div className="flex gap-2">
                    {["Male","Female"].map((g) => (
                      <button key={g}
                        className="flex-1 h-[48px] md:h-[52px] rounded-[10px] border border-[#E2E8F0] text-[13px] font-medium text-[#64748B] hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-all">
                        {g === "Male" ? "♂ " : "♀ "}{g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">Passport Copy</label>
                <div className="border-2 border-dashed border-[#E2E8F0] rounded-[10px] p-5 flex flex-col items-center gap-2 hover:border-[#4F46E5] hover:bg-[#F8FAFF] transition-all cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                    <Upload size={16} className="text-[#4F46E5]" />
                  </div>
                  <p className="text-[13px] font-medium text-[#0F172A] text-center">
                    Drag here or <span className="text-[#4F46E5]">click to browse</span>
                  </p>
                  <p className="text-[11px] text-[#94A3B8]">JPG, PNG, PDF — max 5MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Summary — desktop only (sticky) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="bg-white border border-[#E2E8F0] rounded-[18px] shadow-[0_8px_32px_rgba(15,23,42,0.12)] p-6 sticky top-20">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-semibold text-[#0F172A]">Fare Summary</h3>
              <span className="text-[11px] font-medium text-[#06B6D4] bg-[#ECFEFF] px-2 py-0.5 rounded-full border border-[#A5F3FC]">KHI → DXB</span>
            </div>

            {/* Flight mini-card */}
            <div className="bg-[#EEF2FF] rounded-[10px] p-3 mb-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-[#4F46E5]">Emirates</span>
                <span className="text-[11px] text-[#94A3B8]">EK-601</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[16px] font-bold text-[#0F172A]">KHI</p>
                  <p className="text-[11px] text-[#94A3B8]">06:30 AM</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-[#94A3B8]">2h 15m</p>
                  <div className="flex items-center gap-1">
                    <div className="w-10 h-px bg-[#CBD5E1]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
                  </div>
                  <p className="text-[10px] text-[#94A3B8]">Non-stop</p>
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-[#0F172A]">DXB</p>
                  <p className="text-[11px] text-[#94A3B8]">08:45 AM</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#C7D2FE]">
                <span className="text-[11px] text-[#4F46E5] font-medium">Economy · Jun 15, 2026</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-0">
              {[
                { label: "Base Fare", value: "$280.00" },
                { label: "Taxes",     value: "$58.00"  },
                { label: "Surcharge", value: "$24.00"  },
                { label: "Discount",  value: "-$12.00" },
                { label: "Promo",     value: "-$10.00" },
              ].map((row, i, arr) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-[13px] text-[#64748B]">{row.label}</span>
                    <span className={`text-[13px] font-medium ${row.value.startsWith("-") ? "text-[#22C55E]" : "text-[#0F172A]"}`}>{row.value}</span>
                  </div>
                  {i < arr.length - 1 && <div className="border-t border-dashed border-[#E2E8F0]" />}
                </div>
              ))}
            </div>

            <div className="border-t-2 border-[#E2E8F0] mt-3 pt-4 flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#0F172A]">Total</span>
              <span className="text-2xl font-bold text-[#4F46E5]">$340.00</span>
            </div>

            <button className="w-full h-[52px] rounded-[10px] text-white font-semibold text-[14px] flex items-center justify-center gap-2 mt-5 hover:shadow-xl transition-all hover:scale-[1.01]"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              Continue to Review <ArrowRight size={16} />
            </button>
            <button className="w-full h-10 mt-2 rounded-[10px] border border-[#E2E8F0] text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">{label}</label>
      <input type="text" placeholder={placeholder}
        className="w-full px-4 rounded-[10px] border border-[#E2E8F0] text-[13px] text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all"
        style={{ height: 48 }} />
    </div>
  );
}

function SelectField({ label, placeholder, options }: { label?: string; placeholder: string; options: string[] }) {
  return (
    <div>
      {label && <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">{label}</label>}
      <div className="relative">
        <select className="w-full px-4 pr-8 rounded-[10px] border border-[#E2E8F0] text-[13px] text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all appearance-none bg-white"
          style={{ height: 48 }}>
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
      </div>
    </div>
  );
}
