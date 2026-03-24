import { Activity, User, FileText, Shield, Clock, Filter } from "lucide-react";
import { useState } from "react";

const auditLogs = [
  { id: "1", action: "License Verified", user: "Sarah Martinez", target: "John Smith - CA-12345", timestamp: "Mar 23, 2026 14:32:15", type: "verification", ip: "192.168.1.100" },
  { id: "2", action: "Document Uploaded", user: "Mike Peterson", target: "Insurance_TX_SarahJohnson.pdf", timestamp: "Mar 23, 2026 13:45:22", type: "document", ip: "192.168.1.101" },
  { id: "3", action: "Contractor Added", user: "Admin User", target: "Robert Chen", timestamp: "Mar 23, 2026 12:18:43", type: "contractor", ip: "192.168.1.105" },
  { id: "4", action: "Compliance Check", user: "System", target: "California Jurisdiction", timestamp: "Mar 23, 2026 11:00:00", type: "compliance", ip: "System" },
  { id: "5", action: "License Renewed", user: "Sarah Martinez", target: "Lisa Anderson - WA-34567", timestamp: "Mar 23, 2026 10:22:35", type: "renewal", ip: "192.168.1.100" },
  { id: "6", action: "Document Approved", user: "Mike Peterson", target: "Bond_NY_EmilyBrown.pdf", timestamp: "Mar 23, 2026 09:15:18", type: "document", ip: "192.168.1.101" },
  { id: "7", action: "User Login", user: "Sarah Martinez", target: "Dashboard Access", timestamp: "Mar 23, 2026 08:30:05", type: "auth", ip: "192.168.1.100" },
  { id: "8", action: "Settings Changed", user: "Admin User", target: "Notification Preferences", timestamp: "Mar 22, 2026 16:45:12", type: "settings", ip: "192.168.1.105" },
];

export function AuditTrail() {
  const [filterType, setFilterType] = useState("all");

  const filteredLogs = auditLogs.filter(log => filterType === "all" || log.type === filterType);

  const getActionIcon = (type: string) => {
    switch (type) {
      case "verification":
        return Shield;
      case "document":
        return FileText;
      case "contractor":
        return User;
      case "compliance":
        return Activity;
      case "renewal":
        return Clock;
      default:
        return Activity;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case "verification":
        return "text-green-600 bg-green-100";
      case "document":
        return "text-blue-600 bg-blue-100";
      case "contractor":
        return "text-purple-600 bg-purple-100";
      case "compliance":
        return "text-orange-600 bg-orange-100";
      case "renewal":
        return "text-teal-600 bg-teal-100";
      case "auth":
        return "text-gray-600 bg-gray-100";
      case "settings":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const stats = [
    { label: "Total Events", value: "12,847", icon: Activity },
    { label: "Today", value: "247", icon: Clock },
    { label: "Active Users", value: "24", icon: User },
    { label: "System Events", value: "1,234", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-[#0E4665] px-8 py-4">
        <h1 className="text-2xl font-semibold text-white">Audit Trail</h1>
        <p className="text-sm text-blue-100 mt-1">Complete system activity log and compliance tracking</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Events</option>
              <option value="verification">Verifications</option>
              <option value="document">Documents</option>
              <option value="contractor">Contractors</option>
              <option value="compliance">Compliance</option>
              <option value="renewal">Renewals</option>
              <option value="auth">Authentication</option>
              <option value="settings">Settings</option>
            </select>
            <span className="text-sm text-gray-600">
              Showing {filteredLogs.length} of {auditLogs.length} events
            </span>
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h3>
          <div className="space-y-3">
            {filteredLogs.map((log) => {
              const Icon = getActionIcon(log.type);
              const colorClass = getActionColor(log.type);
              return (
                <div key={log.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{log.target}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{log.user}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          <span>{log.ip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
