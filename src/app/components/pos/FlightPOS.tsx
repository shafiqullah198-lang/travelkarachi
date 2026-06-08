import { useState } from "react";
import { ArrowLeftRight, Calendar, Search, Plus, Minus, ChevronDown, Tag } from "lucide-react";

const recentSearches = [
  "KHI → ISB · Jun 15 · 2 Pax",
  "DXB → LHR · Jun 20 · 1 Pax",
  "KHI → DXB · Jul 1 · 3 Pax",
  "ISB → RUH · Jun 25 · 2 Pax",
  "LHR → JFK · Jul 10 · 1 Pax",
];

export function FlightPOS() {
  const [tripType, setTripType] = useState("Round Trip");
  const [from, setFrom] = useState("KHI");
  const [to, setTo] = useState("DXB");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [promoOpen, setPromoOpen] = useState(false);

  const swap = () => { setFrom(to); setTo(from); };

  const counter = (label: string, val: number, onInc: () => void, onDec: () => void) => (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[13px] text-[#64748B]">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={onDec} disabled={val === 0}
          className="w-7 h-7 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#EEF2FF] hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-30 transition-all">
          <Minus size={12} />
        </button>
        <span className="text-[14px] font-semibold text-[#0F172A] w-4 text-center">{val}</span>
        <button onClick={onInc}
          className="w-7 h-7 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#EEF2FF] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
          <Plus size={12} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="-mx-4 md:-mx-8 -mt-4 md:-mt-8">
      {/* Hero banner */}
      <div className="relative w-full flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden"
        style={{ minHeight: 200, background: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 8L37 22L52 22L41 32L45 47L30 38L15 47L19 32L8 22L23 22Z' fill='white'/%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }} />

        {/* Trip type tabs */}
        <div className="flex gap-2 mb-4 relative z-10 mt-6">
          {["Round Trip", "One Way", "Multi City"].map((type) => (
            <button key={type} onClick={() => setTripType(type)}
              className={`px-3 md:px-5 py-2 rounded-full text-[12px] md:text-[13px] font-semibold transition-all ${
                tripType === type ? "bg-white text-[#4F46E5] shadow-lg" : "bg-white/15 text-white hover:bg-white/25"
              }`}>
              {type}
            </button>
          ))}
        </div>
        <p className="text-white/70 text-[13px] relative z-10 mb-6">Search across 500+ airlines worldwide</p>
      </div>

      {/* Search card — overlaps hero */}
      <div className="px-4 md:px-8 -mt-8 md:-mt-16 relative z-10 pb-8">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white rounded-[16px] md:rounded-[18px] shadow-[0_16px_48px_rgba(15,23,42,0.16)] p-5 md:p-8">

            {/* Route row */}
            <div className="flex items-stretch gap-2 md:gap-4 mb-4">
              <div className="flex-1 border border-[#E2E8F0] rounded-[10px] p-2.5 md:p-3 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/10 transition-all">
                <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider mb-1">From</p>
                <input value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())}
                  className="text-[28px] md:text-[42px] font-bold text-[#4F46E5] leading-none w-full focus:outline-none bg-transparent"
                  maxLength={3} />
                <p className="text-[10px] md:text-[12px] text-[#94A3B8] mt-1 truncate">Jinnah Intl Airport</p>
              </div>

              <button onClick={swap}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#EEF2FF] border-2 border-white flex items-center justify-center text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-all shadow-md flex-shrink-0 self-center">
                <ArrowLeftRight size={14} />
              </button>

              <div className="flex-1 border border-[#E2E8F0] rounded-[10px] p-2.5 md:p-3 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/10 transition-all">
                <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider mb-1">To</p>
                <input value={to} onChange={(e) => setTo(e.target.value.toUpperCase())}
                  className="text-[28px] md:text-[42px] font-bold text-[#4F46E5] leading-none w-full focus:outline-none bg-transparent"
                  maxLength={3} />
                <p className="text-[10px] md:text-[12px] text-[#94A3B8] mt-1 truncate">Dubai Intl Airport</p>
              </div>
            </div>

            {/* Date row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="border border-[#E2E8F0] rounded-[10px] px-4 flex items-center gap-3 h-12 md:h-14 focus-within:border-[#4F46E5] transition-colors">
                <Calendar size={16} className="text-[#94A3B8] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-[#94A3B8]">Depart</p>
                  <input type="date" defaultValue="2026-06-15"
                    className="text-[13px] font-semibold text-[#0F172A] focus:outline-none bg-transparent w-full" />
                </div>
              </div>
              <div className="border border-[#E2E8F0] rounded-[10px] px-4 flex items-center gap-3 h-12 md:h-14 focus-within:border-[#4F46E5] transition-colors">
                <Calendar size={16} className="text-[#94A3B8] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-[#94A3B8]">Return</p>
                  <input type="date" defaultValue="2026-06-22" disabled={tripType === "One Way"}
                    className="text-[13px] font-semibold text-[#0F172A] focus:outline-none bg-transparent w-full disabled:opacity-40" />
                </div>
              </div>
            </div>

            {/* Passengers + Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="border border-[#E2E8F0] rounded-[10px] px-4 py-3">
                <p className="text-[10px] text-[#94A3B8] mb-2">Passengers</p>
                <div className="space-y-2">
                  {counter("Adults",   adults,   () => setAdults(a => Math.min(a+1,9)),   () => setAdults(a => Math.max(a-1,1)))}
                  {counter("Children", children, () => setChildren(c => Math.min(c+1,9)), () => setChildren(c => Math.max(c-1,0)))}
                  {counter("Infants",  infants,  () => setInfants(i => Math.min(i+1,4)),  () => setInfants(i => Math.max(i-1,0)))}
                </div>
              </div>
              <div className="border border-[#E2E8F0] rounded-[10px] px-4 py-3">
                <p className="text-[10px] text-[#94A3B8] mb-3">Cabin Class</p>
                <div className="space-y-2">
                  {["Economy","Business","First"].map((cls) => (
                    <button key={cls} onClick={() => setCabinClass(cls)}
                      className={`w-full px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-left transition-all ${cabinClass === cls ? "bg-[#4F46E5] text-white" : "text-[#64748B] hover:bg-[#F8FAFC]"}`}>
                      {cls}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Promo */}
            <div className="mb-4">
              <button onClick={() => setPromoOpen(!promoOpen)}
                className="flex items-center gap-2 text-[13px] text-[#4F46E5] font-medium hover:underline">
                <Tag size={13} />
                Have a promo code?
                <ChevronDown size={12} className={`transition-transform ${promoOpen ? "rotate-180" : ""}`} />
              </button>
              {promoOpen && (
                <div className="mt-2 flex gap-2">
                  <input type="text" placeholder="Enter promo code"
                    className="flex-1 h-9 px-4 rounded-[8px] border border-[#E2E8F0] text-[13px] focus:outline-none focus:border-[#4F46E5]" />
                  <button className="px-4 h-9 rounded-[8px] bg-[#EEF2FF] text-[#4F46E5] text-[13px] font-semibold hover:bg-[#4F46E5] hover:text-white transition-colors">
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Search button */}
            <button className="w-full h-12 md:h-14 rounded-[10px] text-white font-semibold text-[14px] md:text-[15px] flex items-center justify-center gap-2 hover:scale-[1.01] hover:shadow-xl transition-all"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              <Search size={17} />
              Search Flights
            </button>
          </div>

          {/* Recent searches */}
          <div className="mt-5">
            <p className="text-[12px] text-[#94A3B8] font-medium mb-2">Recent Searches</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {recentSearches.map((s) => (
                <button key={s}
                  className="flex-shrink-0 px-3 md:px-4 py-1.5 md:py-2 bg-white border border-[#E2E8F0] rounded-full text-[11px] md:text-[12px] text-[#64748B] hover:bg-[#EEF2FF] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
