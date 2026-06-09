import { useState, useEffect } from "react";
import {
  LayoutDashboard, Plane, BookOpen, Settings, BarChart3, Users,
  ChevronLeft, ChevronRight, ChevronDown, ShoppingCart, GitBranch, X,
} from "lucide-react";

type Screen =
  | "dashboard" | "flight-bookings" | "flight-management"
  | "flight-pos" | "segment-management" | "sub-agents"
  | "reports"   | "settings";

interface SidebarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  /** mobile drawer open state */
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ activeScreen, onNavigate, mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [flightsOpen, setFlightsOpen] = useState(true);

  const isFlightScreen = [
    "flight-bookings","flight-management","flight-pos","segment-management",
  ].includes(activeScreen);

  // auto-expand flights group when a flight sub-page is active
  useEffect(() => {
    if (isFlightScreen) setFlightsOpen(true);
  }, [isFlightScreen]);

  // lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navigate = (screen: Screen) => {
    onNavigate(screen);
    onMobileClose(); // close drawer on mobile after selection
  };

  // ─── shared nav item renderer ────────────────────────────────────────────────
  const navItem = (
    icon: React.ReactNode,
    label: string,
    screen: Screen,
    indent = false,
    isMobile = false,
  ) => {
    const active = activeScreen === screen;
    const baseH  = isMobile ? "min-h-[48px]" : indent ? "" : "min-h-[44px]";
    const indentPl = isMobile ? "pl-12" : "pl-11";
    const py = indent ? (isMobile ? "py-3" : "py-2") : (isMobile ? "py-3" : "py-[11px]");

    return (
      <button
        key={screen}
        onClick={() => navigate(screen)}
        className={[
          "w-full flex items-center gap-3 rounded-[10px] transition-all duration-150 relative",
          indent ? indentPl : "px-3",
          py,
          baseH,
          active
            ? "bg-[#4F46E5] text-white"
            : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        ].join(" ")}
      >
        {/* Active indicators */}
        {active && !indent && (
          <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-white rounded-r-full" />
        )}
        {active && indent && (
          <span className="absolute left-[42px] top-2 bottom-2 w-[2px] bg-[#06B6D4] rounded-r-full" />
        )}

        <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 20 }}>
          {icon}
        </span>

        {/* Label — always visible in mobile drawer; hidden when desktop collapsed */}
        <span
          className={[
            "text-[13px] font-medium truncate flex-1 text-left",
            !isMobile && collapsed ? "hidden" : "",
          ].join(" ")}
        >
          {label}
        </span>
      </button>
    );
  };

  // ─── Flights accordion ───────────────────────────────────────────────────────
  const flightsGroup = (isMobile = false) => (
    <div>
      <button
        onClick={() => setFlightsOpen(!flightsOpen)}
        className={[
          "w-full flex items-center gap-3 px-3 rounded-[10px] transition-all duration-150",
          isMobile ? "py-3 min-h-[48px]" : "py-[11px]",
          isFlightScreen && !flightsOpen
            ? "bg-[#4F46E5] text-white"
            : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        ].join(" ")}
      >
        <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 20 }}>
          <Plane size={20} />
        </span>
        <span className={["text-[13px] font-medium flex-1 text-left", !isMobile && collapsed ? "hidden" : ""].join(" ")}>
          Flights
        </span>
        <ChevronDown
          size={14}
          className={[
            "flex-shrink-0 transition-transform duration-200",
            flightsOpen ? "rotate-180" : "",
            !isMobile && collapsed ? "hidden" : "",
          ].join(" ")}
        />
      </button>

      {/* Sub-items with smooth height animation */}
      <div
        className="overflow-hidden transition-all duration-250 ease-in-out"
        style={{ maxHeight: flightsOpen ? 300 : 0, opacity: flightsOpen ? 1 : 0 }}
      >
        <div className="mt-1 space-y-0.5">
          {navItem(<BookOpen size={15} />,     "Flight Bookings",   "flight-bookings",    true, isMobile)}
          {navItem(<ShoppingCart size={15} />, "Flight POS",        "flight-pos",         true, isMobile)}
          {navItem(<GitBranch size={15} />,    "Segment Mgmt",      "segment-management", true, isMobile)}
        </div>
      </div>
    </div>
  );

  // ─── Sidebar inner content (shared for desktop & mobile) ────────────────────
  const sidebarContent = (isMobile = false) => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
        <div
          className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
        >
          <Plane size={16} className="text-white" strokeWidth={2.5} />
        </div>
        {(isMobile || !collapsed) && (
          <span className="text-sidebar-foreground font-bold text-[15px] tracking-tight">AeroDesk</span>
        )}
        {/* Close button — mobile only */}
        {isMobile && (
          <button
            onClick={onMobileClose}
            className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide">
        {/* Section label */}
        <p className={["text-sidebar-foreground/30 uppercase text-[10px] font-bold tracking-widest px-3 mb-2",
          !isMobile && collapsed ? "hidden" : ""].join(" ")}>
          Main
        </p>

        {navItem(<LayoutDashboard size={20} />, "Dashboard", "dashboard", false, isMobile)}

        {/* Flights group — accordion on both */}
        {(!collapsed || isMobile) ? (
          flightsGroup(isMobile)
        ) : (
          navItem(<Plane size={20} />, "Flights", "flight-pos", false, false)
        )}

        <p className={["text-sidebar-foreground/30 uppercase text-[10px] font-bold tracking-widest px-3 mt-4 mb-2",
          !isMobile && collapsed ? "hidden" : ""].join(" ")}>
          Management
        </p>

        {navItem(<Users size={20} />,    "Sub Agents", "sub-agents", false, isMobile)}
        {navItem(<BarChart3 size={20} />, "Reports",   "reports",    false, isMobile)}
        {navItem(<Settings size={20} />, "Settings",   "settings",   false, isMobile)}
      </nav>

      {/* Collapse toggle — desktop only */}
      {!isMobile && (
        <div className="px-3 py-4 flex-shrink-0" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-[10px] text-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-150"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} />
                <span className="text-[13px] font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Mobile: user profile strip at bottom */}
      {isMobile && (
        <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
            >
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-sidebar-foreground truncate">Admin User</p>
              <p className="text-[11px] text-sidebar-foreground/40 truncate">Super Admin</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* ── DESKTOP sidebar (md+) ─────────────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 flex-shrink-0"
        style={{ width: collapsed ? 72 : 260 }}
      >
        {sidebarContent(false)}
      </aside>

      {/* ── MOBILE drawer (< md) ──────────────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        className={[
          "md:hidden fixed inset-0 z-40 transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
        onClick={onMobileClose}
      />

      {/* Drawer panel */}
      <aside
        className={[
          "md:hidden fixed top-0 left-0 h-full z-50 flex flex-col bg-sidebar border-r border-sidebar-border",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        style={{
          width: 280,
          boxShadow: mobileOpen ? "4px 0 32px rgba(15,23,42,0.12)" : "none",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {sidebarContent(true)}
      </aside>
    </>
  );
}
