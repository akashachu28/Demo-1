interface CategoryCardProps {
  title: string;
  icon: string;
  color: "blue" | "purple" | "green" | "orange" | "teal";
  stats: { label: string; value: string }[];
  tags: string[];
}

const colorClasses = {
  blue: {
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    accent: "text-blue-600",
  },
  purple: {
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    accent: "text-purple-600",
  },
  green: {
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    accent: "text-green-600",
  },
  orange: {
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    accent: "text-orange-600",
  },
  teal: {
    iconBg: "bg-teal-100",
    iconText: "text-teal-600",
    accent: "text-teal-600",
  },
};

export function CategoryCard({ title, icon, color, stats, tags }: CategoryCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center text-xl ${colors.iconText}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="space-y-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className={`text-sm font-semibold ${colors.accent}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
