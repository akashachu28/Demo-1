import { MapPin, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const stateEligibility = [
  { state: "California", status: "eligible", contractors: 87, requirements: 12, compliant: 98 },
  { state: "Texas", status: "eligible", contractors: 64, requirements: 10, compliant: 100 },
  { state: "Florida", status: "eligible", contractors: 53, requirements: 11, compliant: 96 },
  { state: "New York", status: "eligible", contractors: 48, requirements: 14, compliant: 95 },
  { state: "Illinois", status: "restricted", contractors: 32, requirements: 13, compliant: 88 },
  { state: "Washington", status: "eligible", contractors: 29, requirements: 9, compliant: 97 },
  { state: "Arizona", status: "eligible", contractors: 24, requirements: 8, compliant: 99 },
  { state: "Colorado", status: "pending", contractors: 18, requirements: 10, compliant: 92 },
];

const requirementsByState = [
  { requirement: "General Liability Insurance", required: 36, met: 33 },
  { requirement: "Workers Compensation", required: 36, met: 35 },
  { requirement: "Professional License", required: 36, met: 36 },
  { requirement: "Bond/Surety", required: 28, met: 25 },
  { requirement: "Background Check", required: 36, met: 34 },
];

export function Eligibility() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "eligible":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Eligible" };
      case "restricted":
        return { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-100", label: "Restricted" };
      case "pending":
        return { icon: AlertTriangle, color: "text-blue-600", bg: "bg-blue-100", label: "Pending Review" };
      case "ineligible":
        return { icon: XCircle, color: "text-red-600", bg: "bg-red-100", label: "Ineligible" };
      default:
        return { icon: CheckCircle, color: "text-gray-600", bg: "bg-gray-100", label: "Unknown" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-[#0E4665] px-8 py-4">
        <h1 className="text-2xl font-semibold text-white">Eligibility</h1>
        <p className="text-sm text-blue-100 mt-1">State-by-state contractor eligibility status</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-gray-900 mb-1">36</p>
            <p className="text-sm text-gray-600">Total States</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-green-600 mb-1">33</p>
            <p className="text-sm text-gray-600">Fully Compliant</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-orange-600 mb-1">2</p>
            <p className="text-sm text-gray-600">Restricted</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-blue-600 mb-1">1</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </div>
        </div>

        {/* State Eligibility Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">State Eligibility Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contractors</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Requirements</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stateEligibility.map((item) => {
                  const statusConfig = getStatusConfig(item.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={item.state} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-900 font-medium">{item.state}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{item.contractors}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{item.requirements} met</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                            <div
                              className={`h-2 rounded-full ${
                                item.compliant >= 95 ? 'bg-green-500' : item.compliant >= 85 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.compliant}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900 font-medium">{item.compliant}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Requirements Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements Breakdown</h3>
          <div className="space-y-4">
            {requirementsByState.map((req) => {
              const percentage = (req.met / req.required) * 100;
              return (
                <div key={req.requirement} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{req.requirement}</span>
                    <span className="text-sm text-gray-900 font-medium">{req.met}/{req.required} states</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage === 100 ? 'bg-green-500' : percentage >= 85 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
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
