import { useState } from "react";
import { Search, Download, Plus, Filter, Eye, CheckCircle, XCircle, Printer, ChevronLeft, ChevronRight, X } from "lucide-react";

const statusStyles: Record<string, string> = {
  Pending:  "bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]",
  Approved: "bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]",
  Rejected: "bg-[#FEF2F2] text-[#B91C1C] border border-[#FCA5A5]",
  Issued:   "bg-[#EEF2FF] text-[#4338CA] border border-[#A5B4FC]",
  Void:     "bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1]",
};

const bookings = [
  { ref: "BK-20241", passenger: "Sara Malik",     route: "KHI → DXB", airline: "Emirates",        date: "Jun 12, 2026", cls: "Economy",  amount: "$380",    status: "Approved" },
  { ref: "BK-20240", passenger: "James Okafor",   route: "LHR → JFK", airline: "British Airways",  date: "Jun 13, 2026", cls: "Business", amount: "$2,840",  status: "Pending"  },
  { ref: "BK-20239", passenger: "Ayesha Khan",    route: "ISB → RUH", airline: "PIA",              date: "Jun 14, 2026", cls: "Economy",  amount: "$420",    status: "Issued"   },
  { ref: "BK-20238", passenger: "Marco Rossi",    route: "MXP → CDG", airline: "Air France",       date: "Jun 15, 2026", cls: "First",    amount: "$5,200",  status: "Approved" },
  { ref: "BK-20237", passenger: "Lin Wei",        route: "PEK → SIN", airline: "Singapore Air",    date: "Jun 16, 2026", cls: "Business", amount: "$1,920",  status: "Rejected" },
  { ref: "BK-20236", passenger: "Priya Sharma",   route: "BOM → LHR", airline: "Jet Airways",      date: "Jun 17, 2026", cls: "Economy",  amount: "$610",    status: "Approved" },
  { ref: "BK-20235", passenger: "Ahmed Hassan",   route: "CAI → IST", airline: "Turkish Airlines", date: "Jun 18, 2026", cls: "Economy",  amount: "$290",    status: "Pending"  },
  { ref: "BK-20234", passenger: "Elena Popescu",  route: "OTP → MUC", airline: "Lufthansa",        date: "Jun 19, 2026", cls: "Business", amount: "$1,100",  status: "Void"     },
  { ref: "BK-20233", passenger: "Tariq Mehmood",  route: "KHI → LHR", airline: "PIA",              date: "Jun 20, 2026", cls: "Economy",  amount: "$850",    status: "Issued"   },
  { ref: "BK-20232", passenger: "Sophie Laurent", route: "CDG → NYC", airline: "Air France",       date: "Jun 21, 2026", cls: "First",    amount: "$4,800",  status: "Approved" },
];

const tabs = ["All", "Pending", "Approved", "Rejected", "Issued", "Void"];

export function FlightBookings() {
  const [activeTab, setActiveTab] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = activeTab === "All" ? bookings : bookings.filter((b) => b.status === activeTab);

  const toggleSelect = (ref: string) =>
    setSelected((prev) => prev.includes(ref) ? prev.filter((r) => r !== ref) : [...prev, ref]);

  const allSelected = filtered.every((b) => selected.includes(b.ref));
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map((b) => b.ref));

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl md:text-2xl font-semibold text-[#0F172A]">Flight Bookings</h1>
          <span className="bg-[#EEF2FF] text-[#4338CA] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#A5B4FC]">4,821</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 h-9 rounded-[10px] border border-[#E2E8F0] text-[12px] font-medium text-[#0F172A] bg-white hover:bg-[#F8FAFC] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 md:px-4 h-9 rounded-[10px] text-[12px] md:text-[13px] font-semibold text-white hover:shadow-md transition-all"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
            <Plus size={14} />
            <span className="hidden sm:inline">New Booking</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Filter bar — collapsible on mobile */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        {/* Top row always visible */}
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input type="text" placeholder="Search bookings…"
              className="w-full h-9 pl-8 pr-3 rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5]" />
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-1.5 h-9 px-3 rounded-[8px] border text-[12px] font-medium transition-colors ${filterOpen ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]" : "border-[#E2E8F0] text-[#64748B] bg-white hover:bg-[#F8FAFC]"}`}>
            <Filter size={13} />
            Filters
          </button>
        </div>

        {/* Expandable filters */}
        {filterOpen && (
          <div className="px-4 pb-3 flex flex-col sm:flex-row gap-2 border-t border-[#F1F5F9]">
            <select className="flex-1 h-9 px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-[#64748B] bg-[#F8FAFC] focus:outline-none focus:border-[#4F46E5]">
              <option>All Airlines</option>
              <option>Emirates</option>
              <option>PIA</option>
              <option>British Airways</option>
            </select>
            <input type="date"
              className="flex-1 h-9 px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-[#94A3B8] bg-[#F8FAFC] focus:outline-none focus:border-[#4F46E5]" />
            <button onClick={() => setFilterOpen(false)}
              className="h-9 px-3 rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] flex items-center gap-1 text-[12px]">
              <X size={12} /> Clear
            </button>
          </div>
        )}
      </div>

      {/* Status tabs — horizontal scroll on mobile */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[12px] md:text-[13px] font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === tab
                ? "bg-[#4F46E5] text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)]"
                : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Table — horizontal scroll on mobile */}
      <div className="bg-white border border-[#E2E8F0] rounded-[16px] md:rounded-[18px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="w-10 px-4 py-3.5">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll}
                    className="w-4 h-4 rounded accent-[#4F46E5] cursor-pointer" />
                </th>
                {["Ref#","Passenger","Route","Airline","Date","Class","Amount","Status","Actions"].map((col) => (
                  <th key={col} className="px-3 md:px-4 py-3.5 text-left text-[12px] md:text-[13px] font-semibold text-[#94A3B8] whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking, i) => (
                <tr key={booking.ref}
                  className={`border-b border-dashed border-[#E2E8F0] hover:bg-[#EEF2FF]/20 transition-colors ${i % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"}`}
                  style={{ height: 52 }}>
                  <td className="w-10 px-4">
                    <input type="checkbox" checked={selected.includes(booking.ref)} onChange={() => toggleSelect(booking.ref)}
                      className="w-4 h-4 rounded accent-[#4F46E5] cursor-pointer" />
                  </td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-medium text-[#4F46E5] whitespace-nowrap">{booking.ref}</td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-medium text-[#0F172A] whitespace-nowrap">{booking.passenger}</td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] text-[#0F172A] whitespace-nowrap">{booking.route}</td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] text-[#64748B] whitespace-nowrap">{booking.airline}</td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] text-[#64748B] whitespace-nowrap">{booking.date}</td>
                  <td className="px-3 md:px-4">
                    <span className="text-[10px] md:text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full whitespace-nowrap">{booking.cls}</span>
                  </td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-semibold text-[#0F172A] whitespace-nowrap">{booking.amount}</td>
                  <td className="px-3 md:px-4">
                    <span className={`inline-flex text-[10px] md:text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-4">
                    <div className="flex items-center gap-1">
                      {[
                        { icon: <Eye size={13} />,          bg: "#ECFEFF", color: "#06B6D4", title: "View"    },
                        { icon: <CheckCircle size={13} />,  bg: "#F0FDF4", color: "#22C55E", title: "Approve" },
                        { icon: <XCircle size={13} />,      bg: "#FEF2F2", color: "#EF4444", title: "Reject"  },
                        { icon: <Printer size={13} />,      bg: "#F8FAFC", color: "#64748B", title: "Print"   },
                      ].map((btn) => (
                        <button key={btn.title} title={btn.title}
                          className="w-7 h-7 md:w-8 md:h-8 rounded-[7px] flex items-center justify-center hover:scale-105 transition-all"
                          style={{ background: btn.bg, color: btn.color }}>
                          {btn.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 md:px-6 py-3 md:py-4 border-t border-[#E2E8F0] gap-3">
          <p className="text-[12px] md:text-[13px] text-[#94A3B8]">
            Showing <span className="font-medium text-[#0F172A]">1–{filtered.length}</span> of{" "}
            <span className="font-medium text-[#0F172A]">4,821</span>
          </p>
          <div className="flex items-center gap-1.5">
            <select className="h-8 px-2 rounded-[6px] border border-[#E2E8F0] text-[12px] text-[#64748B] bg-white focus:outline-none">
              <option>25 / page</option>
              <option>50 / page</option>
            </select>
            {[<ChevronLeft size={13} />, 1, 2, 3, <ChevronRight size={13} />].map((item, i) => (
              <button key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-[6px] text-[12px] md:text-[13px] font-medium transition-colors ${
                  item === 1 ? "bg-[#4F46E5] text-white" : "border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                }`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
