import { CheckCircle, AlertTriangle, Users, TrendingUp, ArrowRight, MoreVertical, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function Greenfield() {
  const metrics = [
    { 
      label: "Market Size", 
      value: "$148M", 
      change: "+12%", 
      subtext: "+/- 112% growth YoY",
      positive: true 
    },
    { 
      label: "Avg Revenue/State", 
      value: "$29.6M", 
      change: "+8%", 
      subtext: "+8% State Average",
      positive: true 
    },
    { 
      label: "Entry Cost", 
      value: "$125K", 
      change: "-5%", 
      subtext: "-5% Cost to Enter",
      positive: true 
    },
    { 
      label: "Time to Profitability", 
      value: "8 months", 
      change: "2mo", 
      subtext: "⚡2mo faster return",
      positive: true 
    },
  ];

  const opportunities = [
    {
      rank: 1,
      state: "Nevada",
      score: 92,
      growth: "+12% growth YoY",
      marketSize: "$45M",
      contractors: 0,
      difficulty: "Low",
      timeToMarket: "3 months",
      features: ["Fast licensing", "Low competition"],
      warning: "Moderate insurance cost",
      details: "2 Delivery: Cost",
      complexity: "Low",
      duration: "3 months",
      badge: "Recommended"
    },
    {
      rank: 2,
      state: "Oregon",
      score: 88,
      marketSize: "$38M",
      contractors: 0,
      difficulty: "Medium",
      timeToMarket: "4 months"
    },
    {
      rank: 3,
      state: "Utah",
      score: 85,
      marketSize: "$25M",
      contractors: 0,
      difficulty: "Low",
      timeToMarket: "3 months"
    },
    {
      rank: 4,
      state: "New Mexico",
      score: 82,
      marketSize: "$22M",
      contractors: 0,
      difficulty: "Medium",
      timeToMarket: "5 months"
    },
    {
      rank: 5,
      state: "Montana",
      score: 78,
      marketSize: "$15M",
      contractors: 0,
      difficulty: "High",
      timeToMarket: "6 months"
    }
  ];

  const requirements = [
    { state: "Nevada", licenses: 3, insurance: 2, complexity: "Simple", score: 15, color: "bg-green-100 text-green-700" },
    { state: "Oregon", licenses: 4, insurance: 3, complexity: "Moderate", score: 13, color: "bg-orange-100 text-orange-700" },
    { state: "Utah", licenses: 3, insurance: 2, complexity: "Low", score: 12, color: "bg-green-100 text-green-700" },
    { state: "New Mexico", licenses: 5, insurance: 3, complexity: "Moderate", score: 21, color: "bg-orange-100 text-orange-700" },
    { state: "Montana", licenses: 6, insurance: 4, complexity: "Complex", score: 22, color: "bg-red-100 text-red-700" }
  ];

  const actions = [
    { 
      number: 1, 
      title: "Research Nevada", 
      subtitle: "High opportunity score with low entry difficulty",
      link: "Open requirements"
    },
    { 
      number: 2, 
      title: "Identify Partners", 
      subtitle: "Build relationships in target markets",
      link: "View contractor pool"
    },
    { 
      number: 3, 
      title: "Budget Allocation", 
      subtitle: "Prepare $125k entry capital per per state",
      link: "Open cost breakdown"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "High":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Greenfield Expansion"
        subtitle="New market opportunities and expansion analysis"
      />

      <div className="p-8 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <div className="flex items-end gap-2 mb-1">
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <span className={`text-sm font-medium mb-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-xs text-gray-500">{metric.subtext}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Opportunity Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Top Expansion Opportunities</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                    State/Rank
                  </button>
                  <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                    Top Right
                  </button>
                </div>
              </div>

              {/* Nevada Featured Card */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 relative">
                <span className="absolute top-4 left-4 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                  Recommended
                </span>
                <div className="flex items-start justify-between mt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">🏛️</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Nevada</h3>
                      <p className="text-sm text-gray-600">Score: 92 <span className="text-green-600">+12% growth YoY</span></p>
                    </div>
                  </div>
                  <img src="/api/placeholder/120/80" alt="US Flag" className="w-24 h-16 object-cover rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Fast licensing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Low competition</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-700">Moderate insurance cost</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">2 Delivery: Cost</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">⚠️ Low</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">📅 3 months</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Fast licensing</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Low competition</span>
                    <span className="text-gray-500 ml-auto">does NOT cost →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Opportunities Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Top Expansion Opportunities</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Score</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Market Size</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Current Contractors</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Difficulty</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Time to Market</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {opportunities.map((opp) => (
                      <tr key={opp.state} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                              opp.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              #{opp.rank}
                            </span>
                            <span className="text-sm font-medium text-gray-900">⊕ {opp.state}</span>
                          </div>
                          {opp.rank === 1 && (
                            <div className="ml-8 mt-1">
                              <span className="text-xs text-blue-600">📊 E2-Acse 2sta</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${opp.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{opp.score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{opp.marketSize}</p>
                            {opp.rank === 1 && <p className="text-xs text-gray-500">↑ Simple</p>}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{opp.contractors}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(opp.difficulty)}`}>
                            {opp.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{opp.timeToMarket}</td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 hover:text-blue-700">
                            {opp.timeToMarket} →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Entry Requirements */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Entry Requirements by State</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Licenses</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Insurance</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Complexity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requirements.map((req) => (
                      <tr key={req.state} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{req.state}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{req.licenses}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{req.insurance}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${req.color}`}>
                            {req.complexity} {req.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendation */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Recommendation</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-2">
                    <span className="text-blue-600 font-medium">🎯 Nevada</span> is the best expansion target
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Confidence 92%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Low regulatory complexity</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">High market size ($45M)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Zero competition</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">Suggested Action:</p>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-sm">Start licensing process</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                {actions.map((action) => (
                  <div key={action.number} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white font-bold">{action.number}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900">{action.title}</p>
                          <button className="text-xs text-blue-600 hover:text-blue-700">
                            {action.link}
                          </button>
                        </div>
                        <p className="text-xs text-gray-600">{action.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
