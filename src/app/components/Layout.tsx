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
  Settings,
  SidebarOpen,
  SidebarClose,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import renuityLogo from "../assets/renuityLogo.svg";
import renuityLogoC from "../assets/renuityLogo-cropped.svg";
import { ACCESS_LEVELS, AccessLevel } from "../constants/accessLevels";

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  end?: boolean;
  indent?: boolean;
  accessLevel: AccessLevel;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export function Layout() {
  const { hasAccess } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "LICENSES": true,
    "OPERATIONS": true,
    "COMPLIANCE": true,
    "REPORTING": true,
    "SYSTEM CONFIG": true
  });

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const allSidebarSections: SidebarSection[] = [
    {
      title: "LICENSES",
      items: [
        { path: "/", label: "Compliance Map", icon: BarChart3, end: true, accessLevel: ACCESS_LEVELS.DASHBOARD },
        { path: "/reports", label: "Licenses", icon: FileText, accessLevel: ACCESS_LEVELS.EXECUTIVE_REPORTS },
      ],
    },
    {
      title: "OPERATIONS",
      items: [
        { path: "/contractors", label: "Contractors", icon: Users, accessLevel: ACCESS_LEVELS.CONTRACTORS },
        { path: "/contractors/register", label: "Register", icon: UserPlus, accessLevel: ACCESS_LEVELS.CONTRACTORS_REGISTER },
        { path: "/onboarding", label: "Onboarding", icon: UserPlus, accessLevel: ACCESS_LEVELS.ONBOARDING },
        { path: "/eligibility", label: "Eligibility", icon: ListChecks, accessLevel: ACCESS_LEVELS.ELIGIBILITY },
        { path: "/retainer", label: "Retainer Ledger", icon: BookUser, accessLevel: ACCESS_LEVELS.RETAINER_LEDGER },
      ],
    },
    {
      title: "COMPLIANCE",
      items: [
        { path: "/documents", label: "Documents", icon: ClipboardList, accessLevel: ACCESS_LEVELS.DOCUMENTS },
        { path: "/documents/processor", label: "Document Processor", icon: FileCheck, indent: true, accessLevel: ACCESS_LEVELS.DOCUMENT_PROCESSOR },
        { path: "/renewals", label: "Renewals", icon: RefreshCw, accessLevel: ACCESS_LEVELS.RENEWALS },
        { path: "/jurisdictions", label: "Jurisdictions", icon: Gavel, accessLevel: ACCESS_LEVELS.JURISDICTIONS },
        { path: "/credentials", label: "Credentials", icon: FileCheck, accessLevel: ACCESS_LEVELS.CREDENTIALS },
        { path: "/audit", label: "Audit Trail", icon: CheckSquare, accessLevel: ACCESS_LEVELS.AUDIT_TRAIL },
      ],
    },
    {
      title: "REPORTING",
      items: [
        { path: "/greenfield", label: "Greenfield", icon: TrendingUp, accessLevel: ACCESS_LEVELS.GREENFIELD },
      ],
    },
    {
      title: "SYSTEM CONFIG",
      items: [
        { path: "/system-rules", label: "System Rules", icon: Settings, accessLevel: ACCESS_LEVELS.SYSTEM_RULES },
      ],
    },
  ];

  // Filter sections and items based on user access
  const sidebarSections = allSidebarSections
    .map(section => ({
      ...section,
      items: section.items.filter(item => hasAccess(item.accessLevel))
    }))
    .filter(section => section.items.length > 0);

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
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-white  transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSections[section.title] ? '' : '-rotate-90'
                    }`}
                  />
                </button>
              )}
              {(!isCollapsed && expandedSections[section.title]) || isCollapsed ? (
                <div className={!isCollapsed ? "mt-2" : ""}>
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
              ) : null}
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
