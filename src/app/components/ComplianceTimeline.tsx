import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const timelineEvents = [
  {
    id: "1",
    date: "Mar 20, 2026",
    title: "GDPR Compliance Audit",
    description: "Quarterly data protection review completed successfully",
    status: "completed",
  },
  {
    id: "2",
    date: "Mar 15, 2026",
    title: "Software License Audit",
    description: "All licenses verified and documented",
    status: "completed",
  },
  {
    id: "3",
    date: "Apr 1, 2026",
    title: "Security Compliance Review",
    description: "ISO 27001 compliance check scheduled",
    status: "upcoming",
  },
  {
    id: "4",
    date: "Apr 15, 2026",
    title: "License Renewal Deadline",
    description: "Multiple licenses need renewal attention",
    status: "warning",
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  upcoming: {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  warning: {
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
};

export function ComplianceTimeline() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance Timeline</h3>

      <div className="space-y-6">
        {timelineEvents.map((event, index) => {
          const config = statusConfig[event.status as keyof typeof statusConfig];
          const Icon = config.icon;
          const isLast = index === timelineEvents.length - 1;

          return (
            <div key={event.id} className="relative">
              {!isLast && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
              )}
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0 relative z-10`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-sm text-gray-500 mb-1">{event.date}</p>
                  <h4 className="font-semibold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
