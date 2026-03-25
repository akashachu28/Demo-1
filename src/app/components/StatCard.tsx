import { Circle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string | null;
  positive?: boolean | null;
  icons?: boolean;
  highlight?: boolean;
}

export function StatCard({ title, value, change, positive, icons, highlight }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icons && (
          <div className="flex gap-1">
            <Circle className="w-4 h-4 text-blue-500 fill-blue-500" />
            <Circle className="w-4 h-4 text-blue-400 fill-blue-400" />
            <Circle className="w-4 h-4 text-gray-300 fill-gray-300" />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className={`text-3xl font-bold ${highlight ? 'text-orange-500' : 'text-gray-900'}`}>
          {value}
        </span>
        {change && (
          <span className={`text-sm font-medium mb-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
