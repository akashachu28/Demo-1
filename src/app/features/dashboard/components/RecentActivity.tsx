import { FileText, UserPlus, AlertTriangle, CheckCircle } from "lucide-react";

const activities = [
  {
    id: "1",
    type: "license_added",
    icon: FileText,
    title: "New license added",
    description: "Microsoft Office 365 Enterprise",
    time: "2 hours ago",
    color: "blue",
  },
  {
    id: "2",
    type: "user_assigned",
    icon: UserPlus,
    title: "User assigned to license",
    description: "5 users added to Adobe Creative Cloud",
    time: "5 hours ago",
    color: "green",
  },
  {
    id: "3",
    type: "compliance_warning",
    icon: AlertTriangle,
    title: "Compliance warning",
    description: "GDPR data retention review needed",
    time: "1 day ago",
    color: "orange",
  },
  {
    id: "4",
    type: "compliance_passed",
    icon: CheckCircle,
    title: "Compliance check passed",
    description: "ISO 27001 annual audit completed",
    time: "2 days ago",
    color: "green",
  },
  {
    id: "5",
    type: "license_renewed",
    icon: FileText,
    title: "License renewed",
    description: "Slack Enterprise renewed for 12 months",
    time: "3 days ago",
    color: "blue",
  },
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
};

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[activity.color as keyof typeof colorClasses]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
