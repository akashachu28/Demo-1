interface CategoryCardProps {
  title: string;
  icon: string;
  color: "blue" | "purple" | "green" | "orange" | "teal";
  stats: { label: string; value: string }[];
  tags: string[];
}

const colorClasses = {
  blue: {
    bg: "bg-blue-900/20",
    border: "border-blue-800/50",
    iconBg: "bg-blue-600",
  },
  purple: {
    bg: "bg-purple-900/20",
    border: "border-purple-800/50",
    iconBg: "bg-purple-600",
  },
  green: {
    bg: "bg-green-900/20",
    border: "border-green-800/50",
    iconBg: "bg-green-600",
  },
  orange: {
    bg: "bg-orange-900/20",
    border: "border-orange-800/50",
    iconBg: "bg-orange-600",
  },
  teal: {
    bg: "bg-teal-900/20",
    border: "border-teal-800/50",
    iconBg: "bg-teal-600",
  },
};

export function CategoryCard({ title, icon, color, stats, tags }: CategoryCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-6`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center text-xl`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-3 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-sm font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
