import { Outlet, NavLink } from "react-router";
import { 
  Shield, 
  FileText, 
  BarChart3, 
  Users, 
  UserPlus, 
  ListChecks,
  BookUser,
  RefreshCw,
  Gavel,
  FileCheck,
  ClipboardList,
  CheckSquare,
  TrendingUp
} from "lucide-react";

export function Layout() {
  const sidebarSections = [
    {
      title: "LICENSES",
      items: [
        { path: "/", label: "Compliance Map", icon: BarChart3, end: true },
        { path: "/reports", label: "Executive Reports", icon: FileText },
      ],
    },
    {
      title: "OPERATIONS",
      items: [
        { path: "/contractors", label: "Contractors", icon: Users },
        { path: "/onboarding", label: "Onboarding", icon: UserPlus },
        { path: "/eligibility", label: "Eligibility", icon: ListChecks },
        { path: "/retainer", label: "Retainer Ledger", icon: BookUser },
      ],
    },
    {
      title: "COMPLIANCE",
      items: [
        { path: "/renewals", label: "Renewals", icon: RefreshCw },
        { path: "/jurisdictions", label: "Jurisdictions", icon: Gavel },
        { path: "/credentials", label: "Credentials", icon: FileCheck },
        { path: "/documents", label: "Documents", icon: ClipboardList },
        { path: "/audit", label: "Audit Trail", icon: CheckSquare },
      ],
    },
    {
      title: "REPORTING",
      items: [
        { path: "/greenfield", label: "Greenfield", icon: TrendingUp },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#1059A9] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1059A9] border-r border-gray-800 flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-base">Renulty</h1>
              <p className="text-xs text-gray-400">COMPLIANCE HUB</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-88px)]">
          {sidebarSections.map((section, idx) => (
            <div key={section.title} className={idx > 0 ? "mt-6" : ""}>
              <h3 className="text-xs font-semibold text-white mb-2 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#0B3E76] text-white"
                          : "text-gray-400 hover:bg-[#0B3E76] hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
