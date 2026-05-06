import { Calendar, Building2, Users, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface License {
  id: string;
  name: string;
  vendor: string;
  status: "active" | "expiring" | "expired";
  expiryDate: string;
  seats: number;
  usedSeats: number;
  cost: string;
}

interface LicenseCardProps {
  license: License;
}

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle,
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },
  expiring: {
    label: "Expiring Soon",
    icon: Clock,
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  expired: {
    label: "Expired",
    icon: AlertCircle,
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },
};

export function LicenseCard({ license }: LicenseCardProps) {
  const config = statusConfig[license.status];
  const StatusIcon = config.icon;
  const usagePercentage = (license.usedSeats / license.seats) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{license.name}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{license.vendor}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${config.border} ${config.bg}`}>
          <StatusIcon className={`w-4 h-4 ${config.text}`} />
          <span className={`text-sm ${config.text}`}>{config.label}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        {/* Expiry Date */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Expires:</span>
          <span className="text-gray-900 font-medium">{license.expiryDate}</span>
        </div>

        {/* Seat Usage */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Seats:</span>
              <span className="text-gray-900 font-medium">
                {license.usedSeats} / {license.seats}
              </span>
            </div>
            <span className="text-gray-600">{usagePercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                usagePercentage > 90
                  ? "bg-red-500"
                  : usagePercentage > 75
                  ? "bg-orange-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </div>

        {/* Cost */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-sm text-gray-600">Annual Cost</span>
          <span className="font-semibold text-gray-900">{license.cost}</span>
        </div>
      </div>
    </div>
  );
}
