import { 
  ChevronRight,
  Minus,
  Sparkles
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import map from '../assets/mapDummy.png';


export function Dashboard() {
  const statsCards = [
    { 
      title: "Active Licenses", 
      value: "24,853", 
      change: "+2.9%",
      positive: true,
      icons: true
    },
    { 
      title: "Pending AI Review", 
      value: "237", 
      change: null,
      positive: null,
      icons: false
    },
    { 
      title: "Expiring (30 days)", 
      value: "1,205", 
      change: "+20%",
      positive: true,
      icons: false,
      highlight: true
    },
    { 
      title: "Readiness Score", 
      value: "92.5%", 
      change: "+2.1%",
      positive: true,
      icons: false
    },
  ];

  const insights = [
    {
      color: "bg-blue-500",
      title: "Houston market is 85% ready",
      subtitle: "12 contractors need COI updates"
    },
    {
      color: "bg-yellow-500",
      title: "23 electricians need new COI updates",
      subtitle: "47 days stidified"
    },
    {
      color: "bg-orange-500",
      title: "California License Rule Change",
      subtitle: "Effective Jan 2025 - tixks\n↳ Flagged & auto-notified"
    },
    {
      color: "bg-green-500",
      title: "37 licenses expired in the last 74...",
      subtitle: "Flagged & auto-notified"
    },
  ];

  const alerts = [
    {
      severity: "High",
      severityColor: "text-red-600",
      issue: "Expired License",
      jurisdiction: "TX-Law Lv License",
      status: "TX-Law-LV License expired 2 days ago",
      time: "2 min ago"
    },
    {
      severity: "Medium",
      severityColor: "text-yellow-600",
      issue: "COI Expiring",
      jurisdiction: "XT Plumbing - CA Batch",
      status: "XT Plumbing - CA Batch expires in 5 days",
      time: "1 hour ago"
    },
    {
      severity: "Low",
      severityColor: "text-blue-600",
      issue: "Document Reject",
      jurisdiction: "Quality Roofing - FL",
      status: "Quality Roofing - FL Resubmission invalid",
      time: "1 hour ago"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Executive Command Center"
        subtitle="Central Liscense Registry — Real-time Greenfield Readiness"
      />

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* US Market Readiness Map */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">U.S. Market Readiness Map</h2>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Minus className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Map Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={map} 
                alt="U.S. Market Readiness Map" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">At Risk (70-84)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-700 rounded-full"></div>
                <span className="text-gray-600">Blocked (≈70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">At ≈70%</span>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-lg px-6 py-2 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4 py-2 border-b-1 border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>POWERED</span>
              </div>
            </div>

            <div className="">
              {insights.map((insight, index) => (
                <div key={index} className="flex gap-3 border-b-1 border-gray-200 py-2">
                  <div className={`w-2 h-2 ${insight.color} rounded-full mt-1.5 flex-shrink-0`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">{insight.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 mt-6
             border-gray-300 border-1 rounded-lg px-3 py-2 hover:bg-gray-50">
              View All Insights (8)
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Jurisdiction
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Status
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acted/Time ago</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alerts.map((alert, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${alert.severityColor}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-900">
                      {alert.issue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">
                      {alert.jurisdiction}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {alert.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {alert.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Jurisdiction Drill-Down</span>
                <span className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Texas
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Harris County</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">Houston</span>
                <span className="text-gray-600">85% Ready | 67 At Ris | $4.2M Coverage</span>
              </div>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                View All 254 Jurisdictions
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
