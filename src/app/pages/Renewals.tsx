import { Calendar, AlertTriangle, Clock, CheckCircle, DollarSign } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

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
    { label: "Due in 30 Days", value: "27", icon: Clock, color: "orange" },
    { label: "In Progress", value: "12", icon: AlertTriangle, color: "blue" },
    { label: "Completed (30D)", value: "45", icon: CheckCircle, color: "green" },
    { label: "Total Cost (30D)", value: "$18.4K", icon: DollarSign, color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="License Renewals"
        subtitle="Track and manage contractor license renewals"
      />

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

        {/* Upcoming Renewals */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
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
                    <tr key={renewal.id} className="hover:bg-gray-50">
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
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently Completed */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Completed</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
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
                  <tr key={idx} className="hover:bg-gray-50">
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
        </div>
      </div>
    </div>
  );
}
