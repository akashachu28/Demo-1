import { CheckCircle, Clock, AlertTriangle, ChevronRight } from "lucide-react";

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: "compliant" | "warning" | "violation";
  lastChecked: string;
  nextReview: string;
}

interface ComplianceStatusCardProps {
  item: ComplianceItem;
}

const statusConfig = {
  compliant: {
    icon: CheckCircle,
    bg: "bg-green-50",
    border: "border-green-200",
    iconColor: "text-green-600",
    label: "Compliant",
    labelColor: "text-green-700",
  },
  warning: {
    icon: Clock,
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-600",
    label: "Needs Attention",
    labelColor: "text-orange-700",
  },
  violation: {
    icon: AlertTriangle,
    bg: "bg-red-50",
    border: "border-red-200",
    iconColor: "text-red-600",
    label: "Violation",
    labelColor: "text-red-700",
  },
};

export function ComplianceStatusCard({ item }: ComplianceStatusCardProps) {
  const config = statusConfig[item.status];
  const StatusIcon = config.icon;

  return (
    <div className={`bg-white rounded-lg border ${config.border} p-6 hover:shadow-md transition-shadow cursor-pointer group`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
          <StatusIcon className={`w-6 h-6 ${config.iconColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <span className={`text-sm font-medium ${config.labelColor} whitespace-nowrap`}>
              {config.label}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4">{item.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <div>
              <span className="font-medium">Last Checked:</span> {item.lastChecked}
            </div>
            <div>
              <span className="font-medium">Next Review:</span> {item.nextReview}
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
      </div>
    </div>
  );
}
