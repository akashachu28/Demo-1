import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
 
export type ComplianceStatus = 'compliant' | 'expiring' | 'non-compliant' | 'pending';
 
interface ComplianceBadgeProps {

  status: ComplianceStatus;

  size?: 'sm' | 'md' | 'lg';

  showIcon?: boolean;

}
 
export function ComplianceBadge({ status, size = 'md', showIcon = true }: ComplianceBadgeProps) {

  const config = {

    compliant: {

      label: 'Compliant',

      bgColor: 'bg-green-50',

      textColor: 'text-green-700',

      borderColor: 'border-green-200',

      icon: CheckCircle,

    },

    expiring: {

      label: 'Expiring Soon',

      bgColor: 'bg-yellow-50',

      textColor: 'text-yellow-700',

      borderColor: 'border-yellow-200',

      icon: AlertTriangle,

    },

    'non-compliant': {

      label: 'Non-Compliant',

      bgColor: 'bg-red-50',

      textColor: 'text-red-700',

      borderColor: 'border-red-200',

      icon: XCircle,

    },

    pending: {

      label: 'Pending',

      bgColor: 'bg-gray-50',

      textColor: 'text-gray-700',

      borderColor: 'border-gray-200',

      icon: Clock,

    },

  };
 
  const { label, bgColor, textColor, borderColor, icon: Icon } = config[status];
 
  const sizeClasses = {

    sm: 'px-2 py-0.5 text-xs gap-1',

    md: 'px-3 py-1 text-sm gap-1.5',

    lg: 'px-4 py-2 text-base gap-2',

  };
 
  const iconSizes = {

    sm: 'w-3 h-3',

    md: 'w-4 h-4',

    lg: 'w-5 h-5',

  };
 
  return (
<span

      className={`inline-flex items-center ${sizeClasses[size]} ${bgColor} ${textColor} border ${borderColor} rounded-full font-medium`}
>

      {showIcon && <Icon className={iconSizes[size]} />}

      {label}
</span>

  );

}

 