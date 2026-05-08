import { Activity, User, FileText, Shield, Clock, Filter } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

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

  const kpiData = [
    {
      title: "Total Events",
      value: "12,847",
      change: "All time",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100",
    },
    {
      title: "Today",
      value: "247",
      change: "Last 24 hours",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100",
    },
    {
      title: "Active Users",
      value: "24",
      change: "Currently online",
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100",
    },
    {
      title: "System Events",
      value: "1,234",
      change: "Automated actions",
      icon: Shield,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Audit Trail"
          subtitle="Complete system activity log and compliance tracking"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2 rounded-lg">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {kpiData.map((kpi) => (
                <Card
                  key={kpi.title}
                  className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] text-gray-700 mb-1">
                        {kpi.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-700">
                          {kpi.value}
                        </p>
                        <p className="text-xs text-gray-500">{kpi.change}</p>
                      </div>
                    </div>
                    <div
                      className={`w-12 h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <Card className="p-4 bg-white border border-gray-200">
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
            </Card>

            {/* Audit Log */}
            <Card className="p-6 bg-white border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h2>
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
