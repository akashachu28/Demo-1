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
  ChevronDown,
  ListTodo,
  SidebarOpen,
  SidebarClose,
  LogOut,
  User,
  Bell
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../auth/contexts/AuthContext";
import { ACCESS_LEVELS, AccessLevel } from "../../../constants/accessLevels";
import renuityLogo from "../../../assets/renuityLogo.svg";
import renuityLogoC from "../../../assets/renuityLogo-cropped.svg";
import { GlobalSearch } from "./GlobalSearch";

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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { hasAccess, user, logout } = useAuth();
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

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "License Expiring Soon",
      message: "John Anderson's electrical license expires in 30 days",
      time: "2 hours ago",
      unread: true,
      type: "warning"
    },
    {
      id: 2,
      title: "New Contractor Registration",
      message: "Sarah Chen has submitted a new contractor application",
      time: "4 hours ago",
      unread: true,
      type: "info"
    },
    {
      id: 3,
      title: "Document Approved",
      message: "Certificate of Insurance for BuildRight Construction approved",
      time: "1 day ago",
      unread: false,
      type: "success"
    },
    {
      id: 4,
      title: "Compliance Alert",
      message: "Metro Commercial Services requires updated safety certificate",
      time: "2 days ago",
      unread: false,
      type: "error"
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showProfileDropdown || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showNotifications]);
  
  const allSidebarSections: SidebarSection[] = [
    {
      title: "",
      items: [
        { path: "/", label: "Dashboard", icon: BarChart3, end: true, accessLevel: ACCESS_LEVELS.DASHBOARD },
      ],
    },
    {
      title: "",
      items: [
        { path: "/tasks", label: "Tasks", icon: ListTodo, accessLevel: ACCESS_LEVELS.DASHBOARD },
      ],
    },
    {
      title: "",
      items: [
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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header - Full Width */}
      <header className="sticky top-0 z-40 bg-gray-50 ">
        <div className="px-1 py-1 flex items-center justify-between gap-6">
          {/* Logo Section with Collapse Button */}
          <div className={`${isCollapsed ? 'w-16' : 'w-64'} flex items-center justify-between transition-all duration-300 flex-shrink-0`}>
            {isCollapsed ? (
              <button
                onClick={() => setIsCollapsed(false)}
                className="relative group w-full flex justify-center transition-opacity"
                title="Expand sidebar"
              >
                {/* Logo - hidden on hover */}
                <img 
                  src={renuityLogoC} 
                  alt="Renuity Logo" 
                  className="w-8 h-8 group-hover:opacity-0 transition-opacity"
                />
                {/* SidebarOpen icon - shown on hover, positioned exactly over logo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <SidebarOpen className="w-8  text-[#0E4665]" />
                </div>
              </button>
            ) : (
              <>
                <div className="flex-1 flex justify-center">
                  <img 
                    src={renuityLogo} 
                    alt="Renuity Logo" 
                    className="h-10"
                  />
                </div>
                
                {/* Collapse Button - Only show when expanded */}
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="transition-colors group relative"
                  title="Collapse sidebar"
                >
                  <SidebarClose className="w-8  text-[#0E4665]" />
                </button>
              </>
            )}
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 flex justify-center max-w-2xl mx-auto">
            <GlobalSearch />
          </div>

          {/* Right side content */}
          <div className="flex items-center gap-1">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-6 h-6 text-[#0E4665]" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#0E4665] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-blue-600 font-medium">{unreadCount} new</span>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          setShowNotifications(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {/* Notification Type Indicator */}
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'error' ? 'bg-red-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            'bg-blue-500'
                          }`}></div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium text-gray-900 truncate ${
                                notification.unread ? 'font-semibold' : ''
                              }`}>
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                      }}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center rounded-lg p-2 transition-colors"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#0E4665] via-[#18587a] to-[#143346] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>
  
              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-50 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                  </div>
  
                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#0E4665] hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
  
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-[#0E4665] hover:text-white transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

            
          
        </div>
      </header>

      {/* Sidebar and Main Content Container */}
      <div className="flex flex-1 p-1 overflow-hidden">
        {/* Sidebar - Fixed */}
        <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-br from-[#36B0C9] via-[#3798ab] to-[#218295] rounded-lg flex-shrink-0 flex flex-col transition-all duration-300`}>
          {/* Navigation - Scrollable */}
          <nav className="py-4 px-2 overflow-y-auto flex-1 scrollbar-hide">
          {sidebarSections.map((section, idx) => (
            <div key={section.title || `section-${idx}`} className={idx > 0 ? "mt-1" : ""}>
              {!isCollapsed && section.title && (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <span>{section.title}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSections[section.title] ? '' : '-rotate-90'
                    }`}
                  />
                </button>
              )}
              {(!isCollapsed && (!section.title || expandedSections[section.title])) || isCollapsed ? (
                <div className={!isCollapsed && section.title ? "mt-2 space-y-1" : "space-y-1"}>
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ease-in-out ${
                          isCollapsed 
                            ? "justify-center" 
                            : item.indent 
                              ? "pl-8" 
                              : ""
                        } ${
                          isActive
                            ? "bg-gradient-to-br from-[#003057] via-[#15436b] to-[#18466f] text-white shadow-sm"
                            : "text-gray-50 hover:bg-[#003057] hover:text-white hover:shadow-sm"
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

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto bg-[#e8e8e8]">
        <Outlet />
      </main>
      </div>
    </div>
  );
}
