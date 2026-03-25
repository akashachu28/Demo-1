import { User, LogOut, ChevronDown, Bell, User2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { GlobalSearch } from "./GlobalSearch";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

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

  return (
    <div className="flex flex-col gap-6 bg-white">
      <div className="border-b border-gray-200 bg-[#0E4665] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-blue-100 mt-1">{subtitle}</p>
          </div>
          
          <GlobalSearch/>

          <div className="flex items-center gap-4">
            {/* Optional Action Button */}
            {action && <div>{action}</div>}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 rounded-lg px-3 transition-colors"
              >
                <div className="w-10 h-10 bg-[#36b0c9] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                {/* <ChevronDown className={`w-4 h-4 text-white transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} /> */}
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
                        // Add profile navigation here if needed
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
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
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
                          // Handle notification click
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
                        // Navigate to notifications page
                      }}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
  
            
          </div>

          
        </div>
      </div>
      
    </div>
  );
}
