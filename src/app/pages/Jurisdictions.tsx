import { MapPin, FileText, Users, DollarSign } from "lucide-react";

const jurisdictions = [
  { state: "California", counties: 58, contractors: 87, licenses: 142, regulations: "High", avgCost: "$485" },
  { state: "Texas", counties: 254, contractors: 64, licenses: 98, regulations: "Medium", avgCost: "$395" },
  { state: "Florida", counties: 67, contractors: 53, licenses: 78, regulations: "Medium", avgCost: "$405" },
  { state: "New York", counties: 62, contractors: 48, licenses: 71, regulations: "High", avgCost: "$520" },
  { state: "Illinois", counties: 102, contractors: 32, licenses: 45, regulations: "Medium", avgCost: "$425" },
  { state: "Washington", counties: 39, contractors: 29, licenses: 41, regulations: "Medium", avgCost: "$410" },
  { state: "Arizona", counties: 15, contractors: 24, licenses: 35, regulations: "Low", avgCost: "$365" },
  { state: "Colorado", counties: 64, contractors: 18, licenses: 28, regulations: "Medium", avgCost: "$390" },
];

const regulatoryUpdates = [
  { state: "California", update: "New licensing requirements for HVAC contractors", date: "Mar 15, 2026", impact: "High" },
  { state: "Texas", update: "Updated insurance minimums effective Q2", date: "Mar 10, 2026", impact: "Medium" },
  { state: "New York", update: "Background check process streamlined", date: "Mar 5, 2026", impact: "Low" },
  { state: "Florida", update: "Bond requirements increased for certain trades", date: "Feb 28, 2026", impact: "High" },
];

export function Jurisdictions() {
  const getRegulationColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-500 bg-red-900/30";
      case "Medium":
        return "text-orange-500 bg-orange-900/30";
      case "Low":
        return "text-green-500 bg-green-900/30";
      default:
        return "text-gray-500 bg-gray-900/30";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="border-b border-gray-800 bg-[#0E4665] px-8 py-6">
        <h1 className="text-2xl font-semibold text-white">Jurisdictions</h1>
        <p className="text-sm text-gray-400 mt-1">State and county compliance requirements</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <p className="text-sm text-gray-400">Active States</p>
            </div>
            <p className="text-3xl font-semibold text-white">36</p>
          </div>
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-purple-500" />
              <p className="text-sm text-gray-400">Total Counties</p>
            </div>
            <p className="text-3xl font-semibold text-white">721</p>
          </div>
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-500" />
              <p className="text-sm text-gray-400">Total Licenses</p>
            </div>
            <p className="text-3xl font-semibold text-white">583</p>
          </div>
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              <p className="text-sm text-gray-400">Avg Cost/License</p>
            </div>
            <p className="text-3xl font-semibold text-white">$425</p>
          </div>
        </div>

        {/* Jurisdictions Table */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">State Jurisdictions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Counties</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Contractors</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Licenses</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Complexity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Avg Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {jurisdictions.map((jurisdiction) => (
                  <tr key={jurisdiction.state} className="hover:bg-gray-800/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-white font-medium">{jurisdiction.state}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">{jurisdiction.counties}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{jurisdiction.contractors}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{jurisdiction.licenses}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getRegulationColor(jurisdiction.regulations)}`}>
                        {jurisdiction.regulations}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300 font-medium">{jurisdiction.avgCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulatory Updates */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Regulatory Updates</h3>
          <div className="space-y-4">
            {regulatoryUpdates.map((update, idx) => (
              <div key={idx} className="bg-[#0f1425] rounded-lg p-4 border border-gray-800">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-white">{update.state}</span>
                  </div>
                  <span className={`text-xs font-medium ${getImpactColor(update.impact)}`}>
                    {update.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{update.update}</p>
                <p className="text-xs text-gray-500">{update.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
