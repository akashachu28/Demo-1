import { CheckCircle, AlertTriangle, Users, TrendingUp, ArrowRight, MoreVertical, ChevronRight, DollarSign, Clock, Target, ChevronRightIcon } from "lucide-react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

export function Greenfield() {
  const metrics = [
    { 
      title: "Market Size", 
      value: "$148M", 
      change: "+12% growth YoY",
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100"
    },
    { 
      title: "Avg Revenue/State", 
      value: "$29.6M", 
      change: "+8% State Average",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100"
    },
    { 
      title: "Entry Cost", 
      value: "$125K", 
      change: "-5% Cost to Enter",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100"
    },
    { 
      title: "Time to Profitability", 
      value: "8 months", 
      change: "2mo faster return",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 via-yellow-50 to-yellow-100"
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
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Greenfield Expansion"
          subtitle="New market opportunities and expansion analysis"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2 rounded-lg">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {metrics.map((metric) => (
                <Card
                  key={metric.title}
                  className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] text-gray-700 mb-1">
                        {metric.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-700">
                          {metric.value}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{metric.change}</p>
                    </div>
                    <div
                      className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {/* Featured Opportunity Card */}
              <div className="lg:col-span-2 space-y-2">
                <Card className="bg-gradient-to-r from-sky-200/70 to-cyan-800/40 overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-gray-50">
                    <h2 className="text-lg font-semibold text-gray-900">Top Expansion Opportunities</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <button className="px-3 py-1 text-sm bg-white rounded-md hover:bg-gray-200 transition-colors">
                        State/Rank
                      </button>
                      <button className="px-3 py-1 text-sm bg-white rounded-md hover:bg-gray-200 transition-colors">
                        Top Right
                      </button>
                    </div>
                  </div>

                  {/* Nevada Featured Card */}
                  <div className="p-6  relative">
                    <span className="absolute top-4 left-4 px-2 py-1 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white text-xs font-medium rounded-md">
                      Recommended
                    </span>
                    <div className="flex items-start justify-between mt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xl font-bold">🏛️</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Nevada</h3>
                          <p className="text-sm text-gray-600">Score: 92 <span className="text-green-600">+12% growth YoY</span></p>
                        </div>
                      </div>
                      <img src="/api/placeholder/120/80" alt="US Flag" className="w-24 h-16 object-cover rounded-lg" />
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
                </Card>

                {/* Opportunities Table */}
                <Card className="bg-white border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
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
                          <tr key={opp.state} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
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
                                    className="bg-cyan-600 h-2 rounded-full" 
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
                              <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(opp.difficulty)}`}>
                                {opp.difficulty}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">{opp.timeToMarket}</td>
                            <td className="px-4 py-4">
                              <button className="text-blue-600 flex items-end gap-2 text-sm text-nowrap hover:text-blue-700 transition-colors">
                                {opp.timeToMarket} <ChevronRightIcon className="w-4 h-4"/>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Entry Requirements */}
                <Card className="bg-white border border-gray-200">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Entry Requirements by State</h3>
                    <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
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
                          <tr key={req.state} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{req.state}</td>
                            <td className="px-4 py-4 text-sm text-gray-700">{req.licenses}</td>
                            <td className="px-4 py-4 text-sm text-gray-700">{req.insurance}</td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${req.color}`}>
                                {req.complexity} {req.score}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-2">
                {/* AI Recommendation */}
                <Card className="p-6 bg-white border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">AI Recommendation</h3>
                    <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
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
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                        <span className="text-sm">Start licensing process</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>

                {/* Recommended Actions */}
                <Card className="p-6 bg-white border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                  <div className="space-y-3">
                    {actions.map((action) => (
                      <div key={action.number} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-white font-bold">{action.number}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900">{action.title}</p>
                              <button className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                                {action.link}
                              </button>
                            </div>
                            <p className="text-xs text-gray-600">{action.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
