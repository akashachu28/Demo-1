import { Outlet, NavLink } from "react-router";
import { 
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
import renuityLogo from "../assets/renuityLogo.svg";

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
        { path: "/documents", label: "Documents", icon: ClipboardList },
        { path: "/documents/processor", label: "Document Processor", icon: FileCheck, indent: true },
        { path: "/renewals", label: "Renewals", icon: RefreshCw },
        { path: "/jurisdictions", label: "Jurisdictions", icon: Gavel },
        { path: "/credentials", label: "Credentials", icon: FileCheck },
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
    <div className="min-h-screen bg-[#0E4665] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0E4665] border-r border-gray-800 flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 bg-white">
          <div className="flex justify-center items-center gap-3 ">
            <img 
              src={renuityLogo} 
              alt="Renuity Logo" 
              className="w-50 h-10 "
            />

          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4 overflow-y-auto h-[calc(100vh-88px)] scrollbar-hide">
          {sidebarSections.map((section, idx) => (
            <div key={section.title} className={idx > 0 ? "mt-6" : ""}>
              <h3 className="text-xs font-semibold text-white mb-2 px-3">
                {section.title}
              </h3>
              <div className="">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 transition-colors ${
                        item.indent ? "px-6 pl-9" : "px-3"
                      } ${
                        isActive
                          ? "bg-[#003057] text-white"
                          : "text-gray-400 hover:bg-[#003057] hover:text-white"
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
