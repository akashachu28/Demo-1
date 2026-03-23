interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "purple" | "green" | "orange" | "red";
}

const colorClasses = {
  blue: "bg-blue-900/30 border-blue-800/50",
  purple: "bg-purple-900/30 border-purple-800/50",
  green: "bg-green-900/30 border-green-800/50",
  orange: "bg-orange-900/30 border-orange-800/50",
  red: "bg-red-900/30 border-red-800/50",
};

export function DashboardCard({ title, value, subtitle, color }: DashboardCardProps) {
  return (
    <div className={`rounded-lg border p-6 ${colorClasses[color]}`}>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">{title}</p>
      <p className="text-4xl font-semibold text-white mb-2">{value}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}
