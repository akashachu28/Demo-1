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
  User,
  X,
  SidebarOpen,
  SidebarClose
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import renuityLogo from "../assets/renuityLogo.svg";
import renuityLogoC from "../assets/renuityLogo-cropped.svg";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className="min-h-screen bg-[#0E4665] flex ">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-[#0E4665] border-r border-gray-800 flex-shrink-0 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className={`${isCollapsed ? 'p-4 py-7' : 'p-6'} border-b border-gray-800 bg-white flex items-center justify-between`}>
          <div className="flex justify-center items-center gap-3 flex-1">
            {isCollapsed ? (
              <button
                onClick={() => setIsCollapsed(false)}
                className="relative group w-full transition-opacity"
                title="Expand sidebar"
              >
                {/* Logo - hidden on hover */}
                <img 
                  src={renuityLogoC} 
                  alt="Renuity Logo" 
                  className="w-8  group-hover:opacity-0 transition-opacity"
                />
                {/* SidebarOpen icon - shown on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <SidebarOpen className="w-8 text-[#0E4665]" />
                </div>
                {/* Hover tooltip */}
                {/* <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Expand Sidebar
                </div> */}
              </button>
            ) : (
              <img 
                src={renuityLogo} 
                alt="Renuity Logo" 
                className="w-50 h-10"
              />
            )}
          </div>
          
          {/* Collapse Button - Only show when expanded */}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="  transition-colors group relative"
              title="Collapse sidebar"
            >
              <SidebarClose className="w-8 text-[#0E4665]" />
              
              {/* Tooltip */}
              {/* <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Collapse
              </div> */}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="py-4 overflow-y-auto flex-1 scrollbar-hide">
          {sidebarSections.map((section, idx) => (
            <div key={section.title} className={idx > 0 ? "mt-6" : ""}>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-white mb-2 px-3">
                  {section.title}
                </h3>
              )}
              <div>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 transition-all duration-200 ease-in-out ${
                        isCollapsed 
                          ? "px-4 justify-center" 
                          : item.indent 
                            ? "px-6 pl-9" 
                            : "px-3"
                      } ${
                        isActive
                          ? "bg-[#003057] text-white shadow-sm"
                          : "text-gray-400 hover:bg-[#003057] hover:text-white hover:shadow-sm hover:translate-x-1"
                      } active:scale-95`
                    }
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
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
