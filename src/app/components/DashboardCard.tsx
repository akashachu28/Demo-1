interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "purple" | "green" | "orange" | "red";
}

const colorClasses = {
  blue: "border-l-4 border-l-[#36B0C9]",
  purple: "border-l-4 border-l-[#36B0C9]",
  green: "border-l-4 border-l-[#36B0C9]",
  orange: "border-l-4 border-l-[#36B0C9]",
  red: "border-l-4 border-l-[#36B0C9]",
};

const valueColors = {
  blue: "text-[#0E4665]",
  purple: "text-[#0E4665]",
  green: "text-[#0E4665]",
  orange: "text-[#0E4665]",
  red: "text-[#0E4665]",
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
