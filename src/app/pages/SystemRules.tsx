import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Plus, MoreVertical, ChevronDown, Trash2, Copy, TrendingUp } from "lucide-react";

export function SystemRules() {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: "Rule 1: General Liability Insurance",
      expanded: true,
      conditions: [
        { field: "Contractor Type", operator: "=", value: "Electrical" },
        { field: "Scope of Work", operator: "=", value: "High Risk" }
      ],
      then: "Specific Endorsement = CG 20 10 required..",
      validations: [
        { label: "Verify Expiration Date (OCR)", checked: true },
        { label: "Extract Policy # (OCR)", checked: true },
        { label: "Validate Insurer Rating (> A-)", checked: true }
      ]
    },
    {
      id: 2,
      name: "Rule 2: Local Licensing",
      expanded: false,
      conditions: [
        { field: "Electrical Licenses", operator: "", value: "" }
      ],
      then: "Minimum Coverage > Los Angeles City",
      validations: []
    }
  ]);

  const [selectedState, setSelectedState] = useState("California");
  const [selectedCounty, setSelectedCounty] = useState("Los Angeles");
  const [selectedCity, setSelectedCity] = useState("Los Angeles");

  return (
    <div className="h-full bg-gray-50">
      <PageHeader 
        title="System Rules"
        subtitle="Configure compliance rules and validation parameters"
      />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Rules Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Defining Rules For:</span>
                <div className="flex gap-2">
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>STATE: California</option>
                    <option>STATE: Texas</option>
                    <option>STATE: Florida</option>
                  </select>
                  <select 
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>COUNTY: Los Angeles</option>
                    <option>COUNTY: Orange</option>
                  </select>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>CITY: Los Angeles</option>
                    <option>CITY: Santa Monica</option>
                  </select>
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Rules List */}
            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  {/* Rule Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          setRules(rules.map(r => 
                            r.id === rule.id ? { ...r, expanded: !r.expanded } : r
                          ));
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${rule.expanded ? '' : '-rotate-90'}`} />
                      </button>
                      <span className="text-sm font-medium text-gray-900">{rule.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rule.id === 1 && (
                        <button className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                          New Rule
                        </button>
                      )}
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Rule Content */}
                  {rule.expanded && (
                    <div className="p-4 space-y-4">
                      {/* Conditions */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-700">IF</span>
                          {rule.conditions.map((condition, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <select className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900">
                                <option>{condition.field}</option>
                              </select>
                              {condition.operator && (
                                <>
                                  <span className="text-sm text-gray-600">{condition.operator}</span>
                                  <select className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900">
                                    <option>{condition.value}</option>
                                  </select>
                                </>
                              )}
                              {idx < rule.conditions.length - 1 && (
                                <span className="text-sm font-semibold text-gray-700">AND</span>
                              )}
                            </div>
                          ))}
                          {rule.conditions.length === 1 && rule.conditions[0].operator === "" && (
                            <span className="text-sm font-semibold text-gray-700">THEN</span>
                          )}
                        </div>

                        {rule.conditions.length > 1 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700">THEN</span>
                          </div>
                        )}

                        {/* Then Action */}
                        <div className="flex items-center gap-2 ml-12">
                          <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                            {rule.then}
                          </div>
                          <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Validation Parameters */}
                      {rule.validations.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Validation Parameters</h4>
                          <div className="flex gap-4">
                            {rule.validations.map((validation, idx) => (
                              <label key={idx} className="flex items-center gap-2 cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={validation.checked}
                                  onChange={() => {}}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{validation.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View Audit Logs
              </button>
              <p className="text-xs text-gray-500">
                Last updated: Dec 3, 2025 at 9:32 AM by AI System
              </p>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Los Angeles, CA | Electrical</h4>
                  <p className="text-xs text-gray-500 mb-3">(Real-time drift detected) ⚡</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      89% of Electrical Contractors in Los Angeles have General Liability &gt; $5M
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      20% of recent failures: Contractors listed as Electrical but missing CG 20 10 endorsement, mostly high-risk work
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-xs text-gray-500">
                      Last updated 3 days ago by AI System
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Moderate Risk</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">80%</span>
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">High</span>
                      <span className="text-gray-600">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Simulate with Data</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
