import { Users, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

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
    { 
      title: "In Queue", 
      value: "34", 
      change: "Awaiting review",
      icon: Clock, 
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 via-yellow-50 to-yellow-100"
    },
    { 
      title: "In Progress", 
      value: "12", 
      change: "Being processed",
      icon: Users, 
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100"
    },
    { 
      title: "Completed (7D)", 
      value: "18", 
      change: "Successfully onboarded",
      icon: CheckCircle, 
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100"
    },
    { 
      title: "Issues", 
      value: "3", 
      change: "Requires attention",
      icon: AlertCircle, 
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 via-red-50 to-red-100"
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Onboarding"
          subtitle="Track contractor onboarding progress and status"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2 rounded-lg">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] text-gray-700 mb-1">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-700">
                          {stat.value}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Onboarding Queue */}
            <Card className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Active Onboarding Queue</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {onboardingQueue.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:bg-gray-100 transition-colors">
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
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">View Details →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recently Completed */}
            <Card className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recently Completed</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
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
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{item.state}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{item.completedDate}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{item.duration}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-md text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
