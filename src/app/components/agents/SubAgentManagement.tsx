import { useState } from "react";
import { Search, Plus, Eye, Pencil, Phone, MoreHorizontal } from "lucide-react";

const statusStyles: Record<string, string> = {
  Active:        "bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]",
  Suspended:     "bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]",
  Blocked:       "bg-[#FEF2F2] text-[#B91C1C] border border-[#FCA5A5]",
  "Pending KYC": "bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1]",
};

const agents = [
  { id: 1, name: "Falcon Travels",  company: "Falcon Intl",  initials: "FT", color: "#4F46E5", email: "info@falcon.pk",      phone: "+92-21-1234567", city: "Karachi",   creditLimit: 500000, creditUsed: 210000, balance: 290000, status: "Active"      },
  { id: 2, name: "Sky Bridge Intl", company: "Sky Group",    initials: "SB", color: "#06B6D4", email: "ops@skybridge.com",   phone: "+92-42-9876543", city: "Lahore",    creditLimit: 350000, creditUsed: 280000, balance: 70000,  status: "Active"      },
  { id: 3, name: "Horizon Agency",  company: "Horizon LLC",  initials: "HA", color: "#22C55E", email: "book@horizon.ae",     phone: "+971-4-1234567", city: "Dubai",     creditLimit: 800000, creditUsed: 520000, balance: 280000, status: "Active"      },
  { id: 4, name: "Global Wings",    company: "Global Corp",  initials: "GW", color: "#7C3AED", email: "sales@globalwings.pk",phone: "+92-51-5555555", city: "Islamabad", creditLimit: 200000, creditUsed: 178000, balance: 22000,  status: "Suspended"   },
  { id: 5, name: "AirConnect Ltd",  company: "AirConnect",   initials: "AC", color: "#F59E0B", email: "admin@airconnect.sa", phone: "+966-11-888888", city: "Riyadh",    creditLimit: 600000, creditUsed: 45000,  balance: 555000, status: "Active"      },
  { id: 6, name: "TravelPro KHI",   company: "TravelPro",    initials: "TP", color: "#EF4444", email: "info@travelpro.pk",   phone: "+92-21-7777777", city: "Karachi",   creditLimit: 150000, creditUsed: 0,      balance: 150000, status: "Pending KYC" },
  { id: 7, name: "Nova Travels",    company: "Nova Group",   initials: "NT", color: "#0F172A", email: "nova@travels.com",    phone: "+44-20-9999999", city: "London",    creditLimit: 1000000,creditUsed: 850000, balance: 150000, status: "Blocked"     },
];

const stats = [
  { label: "Total Agents",         value: "127",   color: "#4F46E5", bg: "#EEF2FF" },
  { label: "Active Today",         value: "84",    color: "#22C55E", bg: "#F0FDF4" },
  { label: "Credit Extended",      value: "$8.4M", color: "#06B6D4", bg: "#ECFEFF" },
  { label: "Pending KYC",          value: "9",     color: "#F59E0B", bg: "#FFFBEB" },
];

function CreditBar({ used, limit }: { used: number; limit: number }) {
  const pct = Math.round((used / limit) * 100);
  const color = pct > 85 ? "#EF4444" : pct > 60 ? "#F59E0B" : "#22C55E";
  return (
    <div>
      <span className="text-[11px] md:text-[12px] font-medium text-[#0F172A] whitespace-nowrap">
        ${(used / 1000).toFixed(0)}k / ${(limit / 1000).toFixed(0)}k
      </span>
      <div className="mt-1 h-1 rounded-full bg-[#E2E8F0] w-20 md:w-28 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
      </div>
    </div>
  );
}

export function SubAgentManagement() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = agents.filter((a) =>
    [a.name, a.city, a.email, a.company].some((f) => f.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleAll = () => setSelected(
    filtered.every((a) => selected.includes(a.id)) ? [] : filtered.map((a) => a.id)
  );
  const toggle = (id: number) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl md:text-2xl font-semibold text-[#0F172A]">Sub Agents</h1>
          <span className="bg-[#F0FDF4] text-[#15803D] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#86EFAC]">127 Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input type="text" placeholder="Search agents…" value={search} onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-8 pr-3 w-36 md:w-48 rounded-[10px] border border-[#E2E8F0] bg-white text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] shadow-[0_1px_2px_rgba(15,23,42,0.04)]" />
          </div>
          <button className="flex items-center gap-1.5 px-3 h-9 rounded-[10px] text-[12px] md:text-[13px] font-semibold text-white hover:shadow-md transition-all"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
            <Plus size={14} />
            <span className="hidden sm:inline">Add Sub Agent</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stats strip — 2 cols mobile, 4 cols sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label}
            className="bg-white border border-[#E2E8F0] rounded-[12px] md:rounded-[14px] p-3 md:p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex-shrink-0 flex items-center justify-center text-base font-bold"
              style={{ background: s.bg, color: s.color }}>
              {s.value[0]}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] md:text-[17px] font-bold text-[#0F172A] leading-none">{s.value}</p>
              <p className="text-[10px] md:text-[12px] text-[#94A3B8] truncate mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table — horizontal scroll on mobile */}
      <div className="bg-white border border-[#E2E8F0] rounded-[16px] md:rounded-[18px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="w-10 px-4 py-3.5">
                  <input type="checkbox"
                    checked={filtered.length > 0 && filtered.every((a) => selected.includes(a.id))}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded accent-[#4F46E5]" />
                </th>
                {["Agent","Email","Phone","City","Credit Limit","Balance","Status","Actions"].map((col) => (
                  <th key={col} className="px-3 md:px-4 py-3.5 text-left text-[11px] md:text-[13px] font-semibold text-[#94A3B8] whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((agent, i) => (
                <tr key={agent.id}
                  className={`border-b border-dashed border-[#E2E8F0] hover:bg-[#EEF2FF]/20 transition-colors ${i % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"}`}
                  style={{ height: 56 }}>
                  <td className="px-4">
                    <input type="checkbox" checked={selected.includes(agent.id)} onChange={() => toggle(agent.id)}
                      className="w-4 h-4 rounded accent-[#4F46E5]" />
                  </td>
                  <td className="px-3 md:px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                        style={{ background: agent.color }}>
                        {agent.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] md:text-[13px] font-semibold text-[#0F172A] truncate">{agent.name}</p>
                        <span className="text-[10px] font-medium text-[#7C3AED] bg-[#F5F3FF] px-1.5 py-0.5 rounded-full">{agent.company}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 text-[11px] md:text-[13px] text-[#64748B] whitespace-nowrap">{agent.email}</td>
                  <td className="px-3 md:px-4 text-[11px] md:text-[13px] text-[#64748B] whitespace-nowrap">{agent.phone}</td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] text-[#64748B]">{agent.city}</td>
                  <td className="px-3 md:px-4"><CreditBar used={agent.creditUsed} limit={agent.creditLimit} /></td>
                  <td className="px-3 md:px-4 text-[12px] md:text-[13px] font-semibold text-[#0F172A] whitespace-nowrap">
                    ${(agent.balance / 1000).toFixed(0)}k
                  </td>
                  <td className="px-3 md:px-4">
                    <span className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusStyles[agent.status]}`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-4">
                    <div className="flex items-center gap-1">
                      {[
                        { icon: <Eye size={13} />,           bg: "#EEF2FF", color: "#4F46E5", title: "View"  },
                        { icon: <Pencil size={13} />,        bg: "#F5F3FF", color: "#7C3AED", title: "Edit"  },
                        { icon: <Phone size={13} />,         bg: "#F0FDF4", color: "#22C55E", title: "Call"  },
                        { icon: <MoreHorizontal size={13} />,bg: "#F8FAFC", color: "#64748B", title: "More"  },
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
    </div>
  );
}
