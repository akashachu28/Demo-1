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
        return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-900/30", label: "Eligible" };
      case "restricted":
        return { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-900/30", label: "Restricted" };
      case "pending":
        return { icon: AlertTriangle, color: "text-blue-500", bg: "bg-blue-900/30", label: "Pending Review" };
      case "ineligible":
        return { icon: XCircle, color: "text-red-500", bg: "bg-red-900/30", label: "Ineligible" };
      default:
        return { icon: CheckCircle, color: "text-gray-500", bg: "bg-gray-900/30", label: "Unknown" };
    }
  };

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="border-b border-gray-800 bg-[#1059A9] px-8 py-6">
        <h1 className="text-2xl font-semibold text-white">Eligibility</h1>
        <p className="text-sm text-gray-400 mt-1">State-by-state contractor eligibility status</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <p className="text-3xl font-semibold text-white mb-1">36</p>
            <p className="text-sm text-gray-400">Total States</p>
          </div>
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <p className="text-3xl font-semibold text-green-500 mb-1">33</p>
            <p className="text-sm text-gray-400">Fully Compliant</p>
          </div>
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <p className="text-3xl font-semibold text-orange-500 mb-1">2</p>
            <p className="text-sm text-gray-400">Restricted</p>
          </div>
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <p className="text-3xl font-semibold text-blue-500 mb-1">1</p>
            <p className="text-sm text-gray-400">Pending Review</p>
          </div>
        </div>

        {/* State Eligibility Table */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">State Eligibility Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Contractors</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Requirements</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {stateEligibility.map((item) => {
                  const statusConfig = getStatusConfig(item.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={item.state} className="hover:bg-gray-800/30">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-white font-medium">{item.state}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">{item.contractors}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{item.requirements} met</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700/50 rounded-full h-2 w-24">
                            <div
                              className={`h-2 rounded-full ${
                                item.compliant >= 95 ? 'bg-green-500' : item.compliant >= 85 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.compliant}%` }}
                            />
                          </div>
                          <span className="text-sm text-white">{item.compliant}%</span>
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
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Requirements Breakdown</h3>
          <div className="space-y-4">
            {requirementsByState.map((req) => {
              const percentage = (req.met / req.required) * 100;
              return (
                <div key={req.requirement} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{req.requirement}</span>
                    <span className="text-sm text-white font-medium">{req.met}/{req.required} states</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
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
