interface Metric {
  label: string;
  value: string;
  color: "blue" | "purple" | "green" | "orange" | "red";
}

interface MetricBarProps {
  metrics: Metric[];
}

const valueColors = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  green: "text-green-600",
  orange: "text-orange-600",
  red: "text-red-600",
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
