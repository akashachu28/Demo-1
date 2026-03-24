import { TrendingUp, MapPin, Users, DollarSign, Target } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const expansionOpportunities = [
  { state: "Nevada", score: 92, contractors: 0, market: "$45M", difficulty: "Low", timeToMarket: "3 months" },
  { state: "Oregon", score: 88, contractors: 0, market: "$38M", difficulty: "Medium", timeToMarket: "4 months" },
  { state: "Utah", score: 85, contractors: 0, market: "$28M", difficulty: "Low", timeToMarket: "3 months" },
  { state: "New Mexico", score: 82, contractors: 0, market: "$22M", difficulty: "Medium", timeToMarket: "5 months" },
  { state: "Montana", score: 78, contractors: 0, market: "$15M", difficulty: "High", timeToMarket: "6 months" },
];

const marketMetrics = [
  { metric: "Market Size", value: "$148M", change: "+12%" },
  { metric: "Avg Revenue/State", value: "$29.6M", change: "+8%" },
  { metric: "Entry Cost", value: "$125K", change: "-5%" },
  { metric: "Time to Profitability", value: "8 months", change: "-2mo" },
];

const requirements = [
  { state: "Nevada", licenses: 3, insurance: 2, bonds: 1, other: 2 },
  { state: "Oregon", licenses: 4, insurance: 3, bonds: 2, other: 3 },
  { state: "Utah", licenses: 3, insurance: 2, bonds: 1, other: 1 },
  { state: "New Mexico", licenses: 5, insurance: 3, bonds: 2, other: 4 },
  { state: "Montana", licenses: 6, insurance: 4, bonds: 3, other: 5 },
];

export function Greenfield() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-orange-600 bg-orange-100";
      case "High":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Greenfield Expansion"
        subtitle="New market opportunities and expansion analysis"
      />

      <div className="p-8 space-y-6">
        {/* Market Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {marketMetrics.map((metric) => (
            <div key={metric.metric} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 mb-2">{metric.metric}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <span className="text-xs text-green-600 font-medium">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expansion Opportunities */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Expansion Opportunities</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>Ranked by opportunity score</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Market Size</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Current Contractors</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Difficulty</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Time to Market</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expansionOpportunities.map((opp, idx) => (
                  <tr key={opp.state} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          idx === 0 ? 'bg-yellow-100' : idx === 1 ? 'bg-gray-100' : 'bg-orange-100'
                        }`}>
                          <span className="text-sm font-semibold text-gray-900">#{idx + 1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">{opp.state}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${opp.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{opp.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 font-medium">{opp.market}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{opp.contractors}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(opp.difficulty)}`}>
                        {opp.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{opp.timeToMarket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Requirements Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Entry Requirements by State</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Licenses</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Insurance</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bonds</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Other</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requirements.map((req) => {
                  const total = req.licenses + req.insurance + req.bonds + req.other;
                  return (
                    <tr key={req.state} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{req.state}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{req.licenses}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{req.insurance}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{req.bonds}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{req.other}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white font-semibold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Research Nevada Requirements</p>
                    <p className="text-xs text-gray-600">High opportunity score with low entry difficulty</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white font-semibold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Identify Local Partners</p>
                    <p className="text-xs text-gray-600">Build relationships in target markets</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white font-semibold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Budget Allocation</p>
                    <p className="text-xs text-gray-600">Prepare $125K average entry cost per state</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">Regulatory Changes</p>
                  <p className="text-xs text-gray-600">Monitor pending legislation in target states</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">Market Competition</p>
                  <p className="text-xs text-gray-600">Assess existing player presence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">Resource Availability</p>
                  <p className="text-xs text-gray-600">Ensure adequate contractor pipeline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
