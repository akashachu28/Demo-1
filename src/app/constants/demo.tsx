Which cabin???
 
We need to do the remaining tasks, right???
 
We will do in sometime 
 
https://demo-1-dusky.vercel.app/
Compliance and License Monitoring Site
 
ai-compliance-ui.zip
 
 
 
ai-compliance-pro.zip
 
 
ai-compliance-enterprise.zip
 
ai-compliance-v3.zip
 
ChatGPT Image Mar 24, 2026, 05_08_38 PM.png
 
 
 
 
 
 
localhost_5173_greenfield.png
 
 
I've pushed the new code. So you can view it 
 
Akash Mamenholy
https://demo-1-dusky.vercel.app/
Use this link
 
When login, use
admin
admin@123
 
Can you send me the image that you used for image processing
 
Compliance and License Monitoring Site (1).zip
 
# Design System
 
## Colors
 
### Primary
- Primary Dark: `#0E4665`
- Primary Darker: `#003057`
- Background: `#F9FAFB` (gray-50)
 
### Status Colors
- Blue: `#3B82F6` (blue-500/600)
- Green: `#22C55E` (green-500)
- Yellow: `#EAB308` (yellow-500)
- Orange: `#F97316` (orange-500)
- Red: `#DC2626` (red-500/600), `#B91C1C` (red-700)
 
### Neutrals
- White: `#FFFFFF`
- Gray 50: `#F9FAFB`
- Gray 100: `#F3F4F6`
- Gray 200: `#E5E7EB`
- Gray 400: `#9CA3AF`
- Gray 500: `#6B7280`
- Gray 600: `#4B5563`
- Gray 700: `#374151`
- Gray 800: `#1F2937`
- Gray 900: `#111827`
 
## Typography
 
### Sizes
- xs: `0.75rem` (12px)
- sm: `0.875rem` (14px)
- base: `1rem` (16px)
- lg: `1.125rem` (18px)
 
### Weights
- Medium: `500`
- Semibold: `600`
 
## Spacing
 
### Padding
- Small: `0.75rem` (py-3, px-3)
- Medium: `1rem` (p-4)
- Large: `1.5rem` (p-6, py-6)
- XLarge: `2rem` (p-8)
 
### Gaps
- Small: `0.5rem` (gap-2)
- Medium: `0.75rem` (gap-3)
- Large: `1rem` (gap-4)
- XLarge: `1.5rem` (gap-6)
 
## Components
 
### Cards
- Background: White
- Border: `1px solid #E5E7EB` (gray-200)
- Border Radius: `0.75rem` (rounded-xl)
- Shadow: `shadow-sm`
- Padding: `1.5rem` (p-6)
 
### Sidebar
- Width Expanded: `16rem` (w-64)
- Width Collapsed: `4rem` (w-16)
- Background: `#0E4665`
- Border: `1px solid #1F2937` (gray-800)
- Active Item: `#003057` background
- Hover: `#003057` background
- Text: Gray-400 (inactive), White (active)
- Icon Size: `1rem` (w-4 h-4)
 
### Tables
- Header Background: `#F9FAFB` (gray-50)
- Border: `1px solid #E5E7EB` (gray-200)
- Row Hover: `#F9FAFB` (gray-50)
- Cell Padding: `1rem 1.5rem` (px-6 py-4)
 
### Buttons
- Padding: `0.5rem 0.75rem` (px-3 py-2)
- Border Radius: `0.75rem` (rounded-xl)
- Border: `1px solid #D1D5DB` (gray-300)
- Hover: `#F9FAFB` (gray-50)
 
### Insights/Alerts
- Dot Size: `0.5rem` (w-2 h-2)
- Border Bottom: `1px solid #E5E7EB`
- Padding: `0.5rem` (py-2)
 
## Layout
 
### Grid
- Stats: 4 columns (lg:grid-cols-4)
- Main Content: 3 columns (lg:grid-cols-3)
- Gap: `1rem` (gap-4) or `1.5rem` (gap-6)
 
### Transitions
- Duration: `200ms` or `300ms`
- Easing: `ease-in-out`
- Transform: `translate-x-1` (hover)
- Scale: `scale-95` (active)
 
 
import { PageHeader } from '../components/PageHeader';

import { Card } from '../components/ui/card';

import { Badge } from '../components/ui/badge';

import { AlertCircle, CheckCircle, Clock, TrendingUp, FileText, Users, AlertTriangle } from 'lucide-react';
 
export function Dashboard() {

  const kpiData = [

    {

      title: 'Total Licenses',

      value: '487',

      change: '+12 this month',

      icon: FileText,

      color: 'text-blue-600',

      bgColor: 'bg-blue-50',

    },

    {

      title: 'Expiring Soon',

      value: '23',

      change: 'Within 30 days',

      icon: Clock,

      color: 'text-yellow-600',

      bgColor: 'bg-yellow-50',

    },

    {

      title: 'Non-Compliant',

      value: '8',

      change: 'Requires action',

      icon: AlertCircle,

      color: 'text-red-600',

      bgColor: 'bg-red-50',

    },

    {

      title: 'Active Contractors',

      value: '1,247',

      change: '+34 this week',

      icon: Users,

      color: 'text-green-600',

      bgColor: 'bg-green-50',

    },

  ];
 
  const alerts = [

    {

      type: 'warning',

      message: '5 licenses expiring in the next 30 days',

      time: '2 hours ago',

    },

    {

      type: 'error',

      message: '3 contractors missing required insurance documentation',

      time: '5 hours ago',

    },

    {

      type: 'info',

      message: 'New compliance requirements for California effective April 1st',

      time: '1 day ago',

    },

    {

      type: 'warning',

      message: '12 continuing education credits due for renewal',

      time: '2 days ago',

    },

  ];
 
  const recentActivity = [

    {

      action: 'License Renewed',

      detail: 'General Contractor License - Texas (#TX-GC-45891)',

      user: 'Sarah Johnson',

      time: '15 minutes ago',

    },

    {

      action: 'Contractor Approved',

      detail: 'John Martinez - Full compliance verified',

      user: 'Mike Chen',

      time: '1 hour ago',

    },

    {

      action: 'Document Uploaded',

      detail: 'Certificate of Insurance - Colorado project',

      user: 'Emily Davis',

      time: '2 hours ago',

    },

    {

      action: 'Gap Analysis Completed',

      detail: 'Florida expansion - 3 action items identified',

      user: 'System',

      time: '3 hours ago',

    },

    {

      action: 'License Submitted',

      detail: 'Electrical License - New York (#NY-EL-78923)',

      user: 'David Park',

      time: '5 hours ago',

    },

  ];
 
  const stateCompliance = [

    { state: 'CA', status: 'compliant', licenses: 45 },

    { state: 'TX', status: 'compliant', licenses: 38 },

    { state: 'FL', status: 'warning', licenses: 32 },

    { state: 'NY', status: 'compliant', licenses: 28 },

    { state: 'IL', status: 'warning', licenses: 22 },

    { state: 'PA', status: 'compliant', licenses: 19 },

    { state: 'OH', status: 'error', licenses: 15 },

    { state: 'GA', status: 'compliant', licenses: 14 },

  ];
 
  return (
<div className="min-h-screen bg-gray-50">
<PageHeader

        title="Dashboard"

        subtitle="Real-time overview of your license and contractor compliance status"

      />
 
      <div className="max-w-[1600px] mx-auto p-8 space-y-8">

        {/* KPI Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {kpiData.map((kpi) => (
<Card key={kpi.title} className="p-6 hover:shadow-lg transition-shadow">
<div className="flex items-start justify-between">
<div>
<p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
<p className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</p>
<p className="text-xs text-gray-500">{kpi.change}</p>
</div>
<div className={`w-12 h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center`}>
<kpi.icon className={`w-6 h-6 ${kpi.color}`} />
</div>
</div>
</Card>

          ))}
</div>
 
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* State Compliance Map */}
<Card className="xl:col-span-2 p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-lg font-semibold text-gray-900">Compliance by State</h2>
<div className="flex items-center gap-4 text-xs">
<div className="flex items-center gap-1">
<div className="w-3 h-3 bg-green-500 rounded-full"></div>
<span className="text-gray-600">Compliant</span>
</div>
<div className="flex items-center gap-1">
<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
<span className="text-gray-600">At Risk</span>
</div>
<div className="flex items-center gap-1">
<div className="w-3 h-3 bg-red-500 rounded-full"></div>
<span className="text-gray-600">Non-Compliant</span>
</div>
</div>
</div>
 
            {/* Simplified US Map Representation */}
<div className="bg-gray-100 rounded-xl p-8 mb-6">
<div className="grid grid-cols-6 gap-2">

                {stateCompliance.map((item) => (
<div

                    key={item.state}

                    className={`p-4 rounded-lg text-center cursor-pointer transition-all hover:scale-105 ${

                      item.status === 'compliant'

                        ? 'bg-green-500 hover:bg-green-600'

                        : item.status === 'warning'

                        ? 'bg-yellow-500 hover:bg-yellow-600'

                        : 'bg-red-500 hover:bg-red-600'

                    }`}
>
<div className="text-white font-bold text-sm mb-1">{item.state}</div>
<div className="text-white text-xs">{item.licenses}</div>
</div>

                ))}
</div>
</div>
 
            {/* State Details Table */}
<div className="space-y-2">

              {stateCompliance.slice(0, 5).map((item) => (
<div key={item.state} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
<div className="flex items-center gap-3">
<div

                      className={`w-2 h-2 rounded-full ${

                        item.status === 'compliant'

                          ? 'bg-green-500'

                          : item.status === 'warning'

                          ? 'bg-yellow-500'

                          : 'bg-red-500'

                      }`}
></div>
<span className="font-medium text-gray-900">{item.state}</span>
</div>
<div className="flex items-center gap-4">
<span className="text-sm text-gray-600">{item.licenses} licenses</span>
<Badge

                      variant={

                        item.status === 'compliant'

                          ? 'default'

                          : item.status === 'warning'

                          ? 'secondary'

                          : 'destructive'

                      }
>

                      {item.status === 'compliant' ? 'Compliant' : item.status === 'warning' ? 'At Risk' : 'Action Required'}
</Badge>
</div>
</div>

              ))}
</div>
</Card>
 
          {/* Alerts Panel */}
<Card className="p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
<Badge variant="destructive">{alerts.filter(a => a.type === 'error').length}</Badge>
</div>
 
            <div className="space-y-4">

              {alerts.map((alert, index) => (
<div

                  key={index}

                  className={`p-4 rounded-lg border-l-4 ${

                    alert.type === 'error'

                      ? 'bg-red-50 border-red-500'

                      : alert.type === 'warning'

                      ? 'bg-yellow-50 border-yellow-500'

                      : 'bg-blue-50 border-blue-500'

                  }`}
>
<div className="flex items-start gap-3">

                    {alert.type === 'error' ? (
<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />

                    ) : alert.type === 'warning' ? (
<AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />

                    ) : (
<CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />

                    )}
<div className="flex-1">
<p className="text-sm font-medium text-gray-900">{alert.message}</p>
<p className="text-xs text-gray-500 mt-1">{alert.time}</p>
</div>
</div>
</div>

              ))}
</div>
</Card>
</div>
 
        {/* Recent Activity */}
<Card className="p-6">
<h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
<div className="space-y-4">

            {recentActivity.map((activity, index) => (
<div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
<div className="w-10 h-10 bg-[#36b0c9] rounded-full flex items-center justify-center flex-shrink-0">
<TrendingUp className="w-5 h-5 text-white" />
</div>
<div className="flex-1">
<div className="flex items-start justify-between">
<div>
<p className="font-medium text-gray-900">{activity.action}</p>
<p className="text-sm text-gray-600 mt-1">{activity.detail}</p>
</div>
<span className="text-xs text-gray-500 whitespace-nowrap ml-4">{activity.time}</span>
</div>
<p className="text-xs text-gray-500 mt-2">by {activity.user}</p>
</div>
</div>

            ))}
</div>
</Card>
</div>
</div>

  );

}
 