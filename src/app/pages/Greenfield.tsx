import { TrendingUp, MapPin, Users, DollarSign, Target } from "lucide-react";

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
        return "text-green-500 bg-green-900/30";
      case "Medium":
        return "text-orange-500 bg-orange-900/30";
      case "High":
        return "text-red-500 bg-red-900/30";
      default:
        return "text-gray-500 bg-gray-900/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="border-b border-gray-800 bg-[#1059A9] px-8 py-6">
        <h1 className="text-2xl font-semibold text-white">Greenfield Expansion</h1>
        <p className="text-sm text-gray-400 mt-1">New market opportunities and expansion analysis</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Market Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {marketMetrics.map((metric) => (
            <div key={metric.metric} className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
              <p className="text-sm text-gray-400 mb-2">{metric.metric}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <span className="text-xs text-green-400">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expansion Opportunities */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Top Expansion Opportunities</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Target className="w-4 h-4" />
              <span>Ranked by opportunity score</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Market Size</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Current Contractors</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Difficulty</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Time to Market</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {expansionOpportunities.map((opp, idx) => (
                  <tr key={opp.state} className="hover:bg-gray-800/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          idx === 0 ? 'bg-yellow-900/30' : idx === 1 ? 'bg-gray-700/30' : 'bg-orange-900/30'
                        }`}>
                          <span className="text-sm font-semibold text-white">#{idx + 1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-white">{opp.state}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700/50 rounded-full h-2 w-20">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${opp.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-white">{opp.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300 font-medium">{opp.market}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-400">{opp.contractors}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getDifficultyColor(opp.difficulty)}`}>
                        {opp.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">{opp.timeToMarket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Requirements Breakdown */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Entry Requirements by State</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Licenses</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Insurance</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Bonds</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Other</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {requirements.map((req) => {
                  const total = req.licenses + req.insurance + req.bonds + req.other;
                  return (
                    <tr key={req.state} className="hover:bg-gray-800/30">
                      <td className="px-4 py-4 text-sm font-medium text-white">{req.state}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{req.licenses}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{req.insurance}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{req.bonds}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{req.other}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-white">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              <div className="bg-[#0f1425] rounded-lg p-4 border border-gray-800">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white font-semibold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Research Nevada Requirements</p>
                    <p className="text-xs text-gray-400">High opportunity score with low entry difficulty</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0f1425] rounded-lg p-4 border border-gray-800">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white font-semibold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Identify Local Partners</p>
                    <p className="text-xs text-gray-400">Build relationships in target markets</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0f1425] rounded-lg p-4 border border-gray-800">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white font-semibold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Budget Allocation</p>
                    <p className="text-xs text-gray-400">Prepare $125K average entry cost per state</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Factors</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-white">Regulatory Changes</p>
                  <p className="text-xs text-gray-400">Monitor pending legislation in target states</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-white">Market Competition</p>
                  <p className="text-xs text-gray-400">Assess existing player presence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-white">Resource Availability</p>
                  <p className="text-xs text-gray-400">Ensure adequate contractor pipeline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
