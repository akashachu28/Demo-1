import { User, LogOut, Bell } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="bg-gray-50 flex-shrink-0">
      <div className="bg-white border-b border-gray-200 px-8 py-2">
        <div className="flex items-center justify-between gap-6">
          {/* Title and Subtitle */}
          <div className="flex-1">
            <h1 className="text-[20px] font-semibold text-[#0E4665]">{title}</h1>
            <p className="text-xs text-gray-700">{subtitle}</p>
          </div>
          {/* Optional Action */}
          {action && <div>{action}</div>}
        </div>
      </div>
    </div>
  );
}
