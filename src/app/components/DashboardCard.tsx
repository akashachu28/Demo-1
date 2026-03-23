interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "purple" | "green" | "orange" | "red";
}

const colorClasses = {
  blue: "border-l-4 border-l-blue-500",
  purple: "border-l-4 border-l-purple-500",
  green: "border-l-4 border-l-green-500",
  orange: "border-l-4 border-l-orange-500",
  red: "border-l-4 border-l-red-500",
};

const valueColors = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  green: "text-green-600",
  orange: "text-orange-600",
  red: "text-red-600",
};

export function DashboardCard({ title, value, subtitle, color }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${colorClasses[color]} hover:shadow-md transition-shadow`}>
      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">{title}</p>
      <p className={`text-3xl font-bold mb-2 ${valueColors[color]}`}>{value}</p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}
