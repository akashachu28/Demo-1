interface Metric {
  label: string;
  value: string;
  color: "blue" | "purple" | "green" | "orange" | "red";
}

interface MetricBarProps {
  metrics: Metric[];
}

const colorClasses = {
  blue: "bg-blue-900/40 border-blue-700/50",
  purple: "bg-purple-900/40 border-purple-700/50",
  green: "bg-green-900/40 border-green-700/50",
  orange: "bg-orange-900/40 border-orange-700/50",
  red: "bg-red-900/40 border-red-700/50",
};

export function MetricBar({ metrics }: MetricBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`rounded-lg border p-4 ${colorClasses[metric.color]}`}
        >
          <p className="text-2xl font-semibold text-white mb-1">{metric.value}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
