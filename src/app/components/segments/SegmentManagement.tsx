import { useState } from "react";
import { Search, Plus, Pencil, Copy, Trash2, Filter, GitBranch } from "lucide-react";

const statusStyles: Record<string, string> = {
  Active:    "bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]",
  Inactive:  "bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1]",
  Cancelled: "bg-[#FEF2F2] text-[#B91C1C] border border-[#FCA5A5]",
};

const segments = [
  { id: "SEG-0091", origin: "KHI", dest: "DXB", airline: "Emirates",        aircraft: "B777", dep: "06:30", arr: "08:45", dur: "2h 15m", seats: 248, status: "Active"    },
  { id: "SEG-0090", origin: "LHR", dest: "JFK", airline: "British Airways",  aircraft: "A380", dep: "09:00", arr: "12:00", dur: "7h 00m", seats: 524, status: "Active"    },
  { id: "SEG-0089", origin: "ISB", dest: "RUH", airline: "PIA",              aircraft: "B737", dep: "14:00", arr: "16:15", dur: "2h 15m", seats: 162, status: "Inactive"  },
  { id: "SEG-0088", origin: "DXB", dest: "SIN", airline: "Emirates",        aircraft: "A350", dep: "23:30", arr: "07:45", dur: "7h 15m", seats: 312, status: "Active"    },
  { id: "SEG-0087", origin: "CDG", dest: "MUC", airline: "Air France",       aircraft: "A320", dep: "11:30", arr: "13:05", dur: "1h 35m", seats: 180, status: "Cancelled" },
  { id: "SEG-0086", origin: "BOM", dest: "LHR", airline: "Jet Airways",      aircraft: "B787", dep: "03:00", arr: "07:30", dur: "9h 30m", seats: 256, status: "Active"    },
  { id: "SEG-0085", origin: "CAI", dest: "IST", airline: "Turkish Airlines", aircraft: "B737", dep: "08:45", arr: "12:15", dur: "3h 30m", seats: 162, status: "Active"    },
];

export function SegmentManagement() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = segments.filter((s) =>
    [s.id, s.origin, s.dest, s.airline].some((f) => f.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleAll = () => setSelected(
    filtered.every((s) => selected.includes(s.id)) ? [] : filtered.map((s) => s.id)
  );
  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl md:text-2xl font-semibold text-[#0F172A]">Segment Management</h1>
          <span className="bg-[#EEF2FF] text-[#4338CA] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#A5B4FC]">
            {segments.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input type="text" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-8 pr-3 w-36 md:w-48 rounded-[10px] border border-[#E2E8F0] bg-white text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] shadow-[0_1px_2px_rgba(15,23,42,0.04)]" />
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)}
            className={`h-9 px-3 rounded-[10px] border text-[12px] font-medium flex items-center gap-1.5 transition-colors ${filterOpen ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]" : "border-[#E2E8F0] text-[#64748B] bg-white"}`}>
            <Filter size={13} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 h-9 rounded-[10px] text-[12px] md:text-[13px] font-semibold text-white hover:shadow-md transition-all"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
            <Plus size={14} />
            <span className="hidden sm:inline">Add Segment</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Filter row */}
      {filterOpen && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-wrap gap-2">
          <select className="h-9 px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-[#64748B] bg-[#F8FAFC] focus:outline-none focus:border-[#4F46E5]">
            <option>All Airlines</option>
            <option>Emirates</option><option>PIA</option><option>British Airways</option>
          </select>
          <select className="h-9 px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-[#64748B] bg-[#F8FAFC] focus:outline-none focus:border-[#4F46E5]">
            <option>All Routes</option>
            <option>KHI → DXB</option><option>LHR → JFK</option>
          </select>
          <input type="date"
            className="h-9 px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-[#94A3B8] bg-[#F8FAFC] focus:outline-none focus:border-[#4F46E5]" />
          <select className="h-9 px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-[#64748B] bg-[#F8FAFC] focus:outline-none focus:border-[#4F46E5]">
            <option>All Statuses</option>
            <option>Active</option><option>Inactive</option><option>Cancelled</option>
          </select>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-[#E2E8F0] rounded-[18px] flex flex-col items-center justify-center py-12 gap-4">
          <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center">
            <GitBranch size={28} className="text-[#CBD5E1]" />
          </div>
          <div className="text-center">
            <p className="text-[15px] font-semibold text-[#0F172A] mb-1">No segments found</p>
            <p className="text-[13px] text-[#94A3B8]">Adjust filters or add a new segment</p>
          </div>
          <button className="flex items-center gap-2 px-5 h-9 rounded-[10px] text-[13px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
            <Plus size={14} /> Add Segment
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] md:rounded-[18px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="w-10 px-4 py-3.5">
                    <input type="checkbox" checked={filtered.every((s) => selected.includes(s.id))} onChange={toggleAll}
                      className="w-4 h-4 rounded accent-[#4F46E5]" />
                  </th>
                  {["Segment ID","Origin","Dest","Airline","Aircraft","Dep","Arr","Dur","Seats","Status","Actions"].map((col) => (
                    <th key={col} className="px-3 md:px-4 py-3.5 text-left text-[11px] md:text-[13px] font-semibold text-[#94A3B8] whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((seg, i) => (
                  <tr key={seg.id}
                    className={`border-b border-dashed border-[#E2E8F0] hover:bg-[#EEF2FF]/20 transition-colors ${i % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"}`}
                    style={{ height: 52 }}>
                    <td className="px-4">
                      <input type="checkbox" checked={selected.includes(seg.id)} onChange={() => toggle(seg.id)}
                        className="w-4 h-4 rounded accent-[#4F46E5]" />
                    </td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-medium text-[#4F46E5] whitespace-nowrap">{seg.id}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-bold text-[#0F172A]">{seg.origin}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-bold text-[#0F172A]">{seg.dest}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] text-[#64748B] whitespace-nowrap">{seg.airline}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] text-[#64748B]">{seg.aircraft}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-medium text-[#0F172A]">{seg.dep}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-medium text-[#0F172A]">{seg.arr}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] text-[#64748B]">{seg.dur}</td>
                    <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-semibold text-[#0F172A]">{seg.seats}</td>
                    <td className="px-3 md:px-4">
                      <span className={`inline-flex text-[10px] md:text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusStyles[seg.status]}`}>
                        {seg.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-4">
                      <div className="flex items-center gap-1">
                        {[
                          { icon: <Pencil size={13} />, bg: "#EEF2FF", color: "#4F46E5", title: "Edit"      },
                          { icon: <Copy size={13} />,   bg: "#ECFEFF", color: "#06B6D4", title: "Duplicate" },
                          { icon: <Trash2 size={13} />, bg: "#FEF2F2", color: "#EF4444", title: "Delete"    },
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
        </div>
      )}
    </div>
  );
}
