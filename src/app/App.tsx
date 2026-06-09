import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { LoginPage } from "./components/LoginPage";
import { LayoutDashboard, Plane, Users, BarChart3, Settings } from "lucide-react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { FlightBookings } from "./components/bookings/FlightBookings";
import { FlightPOS } from "./components/pos/FlightPOS";
import { PassengerBookingForm } from "./components/booking-form/PassengerBookingForm";
import { SegmentManagement } from "./components/segments/SegmentManagement";
import { SubAgentManagement } from "./components/agents/SubAgentManagement";

type Screen =
  | "dashboard"
  | "flight-bookings"
  | "flight-management"
  | "flight-pos"
  | "segment-management"
  | "sub-agents"
  | "reports"
  | "settings";

const screenMeta: Record<Screen, { breadcrumb: string; page: string }> = {
  dashboard:            { breadcrumb: "AeroDesk",   page: "Dashboard"          },
  "flight-bookings":    { breadcrumb: "Flights",    page: "Flight Bookings"    },
  "flight-management":  { breadcrumb: "Flights",    page: "Passenger Booking"  },
  "flight-pos":         { breadcrumb: "Flights",    page: "Flight POS"         },
  "segment-management": { breadcrumb: "Flights",    page: "Segment Management" },
  "sub-agents":         { breadcrumb: "Management", page: "Sub Agents"         },
  reports:              { breadcrumb: "AeroDesk",   page: "Reports"            },
  settings:             { breadcrumb: "AeroDesk",   page: "Settings"           },
};

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white border border-[#E2E8F0] rounded-[18px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] gap-3">
      <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-2xl">📋</div>
      <p className="text-[16px] font-semibold text-[#0F172A]">{title}</p>
      <p className="text-[13px] text-[#94A3B8]">This screen is coming soon</p>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn]               = useState(false);
  const [screen, setScreen]                       = useState<Screen>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const meta        = screenMeta[screen];
  const isFullBleed = screen === "flight-pos";

  const renderScreen = () => {
    switch (screen) {
      case "dashboard":          return <Dashboard />;
      case "flight-bookings":    return <FlightBookings />;
      case "flight-pos":         return <FlightPOS onBookFlight={() => setScreen("flight-management")} />;
      case "flight-management":  return <PassengerBookingForm />;
      case "segment-management": return <SegmentManagement />;
      case "sub-agents":         return <SubAgentManagement />;
      case "reports":            return <PlaceholderScreen title="Reports" />;
      case "settings":           return <PlaceholderScreen title="Settings" />;
      default:                   return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">

      {/* Sidebar — desktop always visible, mobile as drawer */}
      <Sidebar
        activeScreen={screen}
        onNavigate={(s) => setScreen(s as Screen)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content column */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar
          breadcrumb={meta.breadcrumb}
          page={meta.page}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        <main
          className={`flex-1 overflow-y-auto ${isFullBleed ? "p-0" : "p-4 md:p-8"} pb-[72px] md:pb-0`}
          style={{ scrollbarWidth: "thin", scrollbarColor: "#E2E8F0 transparent" }}
        >
          {renderScreen()}
        </main>
      </div>

      {/* ── Mobile bottom navigation bar ─────────────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid #E2E8F0",
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "calc(60px + env(safe-area-inset-bottom))",
        }}
      >
        {([
          { icon: <LayoutDashboard size={22} />, label: "Home",     screens: ["dashboard"]                                                              },
          { icon: <Plane size={22} />,           label: "Flights",  screens: ["flight-bookings","flight-pos","segment-management"]   },
          { icon: <Users size={22} />,           label: "Agents",   screens: ["sub-agents"]                                                             },
          { icon: <BarChart3 size={22} />,       label: "Reports",  screens: ["reports"]                                                                },
          { icon: <Settings size={22} />,        label: "Settings", screens: ["settings"]                                                               },
        ] as { icon: React.ReactNode; label: string; screens: Screen[] }[]).map((item) => {
          const active = item.screens.includes(screen);
          // tapping Flights opens drawer so user can pick a sub-page
          const handleTap = () => {
            if (item.label === "Flights") {
              setMobileSidebarOpen(true);
            } else {
              setScreen(item.screens[0]);
            }
          };
          return (
            <button
              key={item.label}
              onClick={handleTap}
              className="flex-1 flex flex-col items-center justify-center gap-1 relative transition-all active:scale-95"
            >
              {/* Active top pill indicator */}
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg,#4F46E5,#7C3AED)" }}
                />
              )}
              {/* Icon */}
              <span
                className="transition-all duration-150"
                style={{
                  color: active ? "#4F46E5" : "#94A3B8",
                  filter: active ? "drop-shadow(0 0 6px rgba(79,70,229,0.3))" : "none",
                  transform: active ? "translateY(-1px)" : "translateY(0)",
                }}
              >
                {item.icon}
              </span>
              {/* Label */}
              <span
                className="text-[10px] font-semibold tracking-wide transition-colors duration-150"
                style={{ color: active ? "#4F46E5" : "#94A3B8" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
