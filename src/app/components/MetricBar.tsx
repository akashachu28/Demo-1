interface Metric {
  label: string;
  value: string;
  color: "blue" | "purple" | "green" | "orange" | "red";
}

interface MetricBarProps {
  metrics: Metric[];
}

const valueColors = {
  blue: "text-[#36B0C9]",
  purple: "text-[#36B0C9]",
  green: "text-[#36B0C9]",
  orange: "text-[#36B0C9]",
  red: "text-[#36B0C9]",
};

export function MetricBar({ metrics }: MetricBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 divide-x divide-gray-200">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="p-4 text-center"
        >
          <p className={`text-xl font-bold mb-1 ${valueColors[metric.color]}`}>{metric.value}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
