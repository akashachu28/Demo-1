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
  TrendingUp,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import renuityLogo from "../assets/renuityLogo.svg";

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  end?: boolean;
  indent?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export function Layout() {
  const { user, logout } = useAuth();

  const sidebarSections: SidebarSection[] = [
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

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#0E4665] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0E4665] border-r border-gray-800 flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 bg-white">
          <div className="flex justify-center items-center gap-3">
            <img 
              src={renuityLogo} 
              alt="Renuity Logo" 
              className="w-50 h-10"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4 overflow-y-auto flex-1 scrollbar-hide">
          {sidebarSections.map((section, idx) => (
            <div key={section.title} className={idx > 0 ? "mt-6" : ""}>
              <h3 className="text-xs font-semibold text-white mb-2 px-3">
                {section.title}
              </h3>
              <div>
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

        {/* User Profile & Logout */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#36b0c9] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-[#003057] hover:text-white transition-colors rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
