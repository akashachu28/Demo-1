import { Calendar, AlertTriangle, Clock, CheckCircle, DollarSign } from "lucide-react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

const upcomingRenewals = [
  { id: "1", contractor: "John Smith", license: "CA-12345", state: "California", expiryDate: "Apr 15, 2026", daysLeft: 23, cost: "$450", status: "pending" },
  { id: "2", contractor: "Mike Davis", license: "FL-45678", state: "Florida", expiryDate: "Apr 20, 2026", daysLeft: 28, cost: "$380", status: "pending" },
  { id: "3", contractor: "David Wilson", license: "IL-78901", state: "Illinois", expiryDate: "May 5, 2026", daysLeft: 43, cost: "$420", status: "initiated" },
  { id: "4", contractor: "James Taylor", license: "AZ-89012", state: "Arizona", expiryDate: "May 12, 2026", daysLeft: 50, cost: "$350", status: "initiated" },
  { id: "5", contractor: "Emily Brown", license: "NY-23456", state: "New York", expiryDate: "Jun 8, 2026", daysLeft: 77, cost: "$520", status: "scheduled" },
];

const recentRenewals = [
  { contractor: "Sarah Johnson", license: "TX-67890", state: "Texas", renewedDate: "Mar 18, 2026", cost: "$400", newExpiry: "Mar 18, 2027" },
  { contractor: "Lisa Anderson", license: "WA-34567", state: "Washington", renewedDate: "Mar 15, 2026", cost: "$390", newExpiry: "Mar 15, 2027" },
  { contractor: "Jennifer Martinez", license: "CO-56789", state: "Colorado", renewedDate: "Mar 10, 2026", cost: "$410", newExpiry: "Mar 10, 2027" },
];

export function Renewals() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { color: "text-orange-600", bg: "bg-orange-100", label: "Action Required" };
      case "initiated":
        return { color: "text-blue-600", bg: "bg-blue-100", label: "In Progress" };
      case "scheduled":
        return { color: "text-purple-600", bg: "bg-purple-100", label: "Scheduled" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-100", label: "Unknown" };
    }
  };

  const stats = [
    { 
      title: "Due in 30 Days", 
      value: "27", 
      change: "Action required",
      icon: Clock, 
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 via-yellow-50 to-yellow-100"
    },
    { 
      title: "In Progress", 
      value: "12", 
      change: "Being processed",
      icon: AlertTriangle, 
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100"
    },
    { 
      title: "Completed (30D)", 
      value: "45", 
      change: "Successfully renewed",
      icon: CheckCircle, 
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100"
    },
    { 
      title: "Total Cost (30D)", 
      value: "$18.4K", 
      change: "Renewal expenses",
      icon: DollarSign, 
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100"
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="License Renewals"
          subtitle="Track and manage contractor license renewals"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2 rounded-lg">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] text-gray-700 mb-1">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-700">
                          {stat.value}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Upcoming Renewals */}
            <Card className="bg-white border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Renewals</h3>
                <span className="text-sm text-gray-600">Next 90 days</span>
              </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contractor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">License</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Expires</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Days Left</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cost</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {upcomingRenewals.map((renewal) => {
                      const statusConfig = getStatusConfig(renewal.status);
                      return (
                        <tr key={renewal.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4 text-sm text-gray-900 font-medium">{renewal.contractor}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{renewal.license}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{renewal.state}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{renewal.expiryDate}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-sm font-medium ${
                              renewal.daysLeft <= 30 ? 'text-red-600' : renewal.daysLeft <= 60 ? 'text-orange-600' : 'text-blue-600'
                            }`}>
                              {renewal.daysLeft} days
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{renewal.cost}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recently Completed */}
            <Card className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recently Completed</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contractor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">License</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Renewed Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cost</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">New Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentRenewals.map((renewal, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">{renewal.contractor}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{renewal.license}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{renewal.state}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{renewal.renewedDate}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{renewal.cost}</td>
                        <td className="px-4 py-4 text-sm text-green-600 font-medium">{renewal.newExpiry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
