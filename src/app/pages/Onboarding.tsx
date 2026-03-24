import { Users, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";

const onboardingQueue = [
  { id: "1", name: "Robert Chen", state: "California", stage: "Document Review", progress: 75, submitted: "2 days ago", assignee: "Sarah M." },
  { id: "2", name: "Amanda White", state: "Texas", stage: "License Verification", progress: 60, submitted: "3 days ago", assignee: "John D." },
  { id: "3", name: "Carlos Rodriguez", state: "Florida", stage: "Background Check", progress: 40, submitted: "5 days ago", assignee: "Sarah M." },
  { id: "4", name: "Michelle Lee", state: "New York", stage: "Initial Review", progress: 25, submitted: "1 week ago", assignee: "Mike P." },
  { id: "5", name: "Thomas Anderson", state: "Illinois", stage: "Insurance Verification", progress: 80, submitted: "1 day ago", assignee: "John D." },
];

const recentlyCompleted = [
  { id: "1", name: "Patricia Davis", state: "Washington", completedDate: "Mar 20, 2026", duration: "4.2 hrs" },
  { id: "2", name: "Kevin Brown", state: "Arizona", completedDate: "Mar 19, 2026", duration: "3.8 hrs" },
  { id: "3", name: "Jessica Wilson", state: "Colorado", completedDate: "Mar 18, 2026", duration: "5.1 hrs" },
];

export function Onboarding() {
  const stats = [
    { label: "In Queue", value: "34", icon: Clock, color: "blue" },
    { label: "In Progress", value: "12", icon: Users, color: "purple" },
    { label: "Completed (7D)", value: "18", icon: CheckCircle, color: "green" },
    { label: "Issues", value: "3", icon: AlertCircle, color: "red" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-[#0E4665] px-8 py-4">
        <h1 className="text-2xl font-semibold text-white">Onboarding</h1>
        <p className="text-sm text-blue-100 mt-1">Track contractor onboarding progress and status</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Onboarding Queue */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Onboarding Queue</h3>
          <div className="space-y-4">
            {onboardingQueue.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.state}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-600 font-medium">{item.stage}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted {item.submitted}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-gray-500">Assignee: {item.assignee}</p>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Completed */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Completed</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Completed</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentlyCompleted.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{item.state}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{item.completedDate}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{item.duration}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
