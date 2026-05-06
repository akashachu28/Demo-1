import { Calendar, AlertCircle } from "lucide-react";

const expiringLicenses = [
  {
    id: "1",
    name: "Salesforce Enterprise",
    vendor: "Salesforce",
    expiryDate: "Apr 15, 2026",
    daysLeft: 23,
  },
  {
    id: "2",
    name: "Zoom Business",
    vendor: "Zoom",
    expiryDate: "Apr 28, 2026",
    daysLeft: 36,
  },
  {
    id: "3",
    name: "Jira Software",
    vendor: "Atlassian",
    expiryDate: "May 5, 2026",
    daysLeft: 43,
  },
  {
    id: "4",
    name: "GitHub Enterprise",
    vendor: "GitHub",
    expiryDate: "May 12, 2026",
    daysLeft: 50,
  },
];

export function ExpiringLicenses() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Expiring Soon</h3>
        <div className="flex items-center gap-2 text-orange-600">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{expiringLicenses.length} licenses</span>
        </div>
      </div>

      <div className="space-y-4">
        {expiringLicenses.map((license) => (
          <div key={license.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{license.name}</p>
              <p className="text-sm text-gray-600 mt-1">{license.vendor}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{license.expiryDate}</span>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                {license.daysLeft} days left
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
        View All Expiring Licenses
      </button>
    </div>
  );
}
