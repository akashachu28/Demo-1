import { MapPin, FileText, Users, DollarSign } from "lucide-react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

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
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-orange-600 bg-orange-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-orange-600";
      case "Low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const kpiData = [
    {
      title: "Active States",
      value: "36",
      change: "All jurisdictions",
      icon: MapPin,
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100",
    },
    {
      title: "Total Counties",
      value: "721",
      change: "Across all states",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100",
    },
    {
      title: "Total Licenses",
      value: "583",
      change: "Active licenses",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100",
    },
    {
      title: "Avg Cost/License",
      value: "$425",
      change: "Per jurisdiction",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Jurisdictions"
          subtitle="State and county compliance requirements"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2 rounded-lg">
            {/* Overview Stats */}
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

            {/* Jurisdictions Table */}
            <Card className="p-6 bg-white border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">State Jurisdictions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Counties</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contractors</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Licenses</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Complexity</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Avg Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {jurisdictions.map((jurisdiction) => (
                      <tr key={jurisdiction.state} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-900 font-medium">{jurisdiction.state}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{jurisdiction.counties}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{jurisdiction.contractors}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{jurisdiction.licenses}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRegulationColor(jurisdiction.regulations)}`}>
                            {jurisdiction.regulations}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 font-medium">{jurisdiction.avgCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Regulatory Updates */}
            <Card className="p-6 bg-white border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Regulatory Updates</h2>
              <div className="space-y-4">
                {regulatoryUpdates.map((update, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">{update.state}</span>
                      </div>
                      <span className={`text-xs font-medium ${getImpactColor(update.impact)}`}>
                        {update.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{update.update}</p>
                    <p className="text-xs text-gray-500">{update.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
