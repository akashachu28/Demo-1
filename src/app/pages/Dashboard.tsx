import { 
  AlertCircle,
  ChevronRight,
  Clock,
  FileText,
  Minus,
  Sparkles,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import map from '../assets/mapDummy.png';
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";


export function Dashboard() {
  const statsCards = [
    { 
      title: "Active Licenses", 
      value: "24,853", 
      change: "+2.9%",
      positive: true,
      icons: true
    },
    { 
      title: "Pending AI Review", 
      value: "237", 
      change: null,
      positive: null,
      icons: false
    },
    { 
      title: "Expiring (30 days)", 
      value: "1,205", 
      change: "+20%",
      positive: true,
      icons: false,
      highlight: true
    },
    { 
      title: "Readiness Score", 
      value: "92.5%", 
      change: "+2.1%",
      positive: true,
      icons: false
    },
  ];

  const insights = [
    {
      color: "bg-blue-500",
      title: "Houston market is 85% ready",
      subtitle: "12 contractors need COI updates"
    },
    {
      color: "bg-yellow-500",
      title: "23 electricians need new COI updates",
      subtitle: "47 days stidified"
    },
    {
      color: "bg-orange-500",
      title: "California License Rule Change",
      subtitle: "Effective Jan 2025 - tixks\n↳ Flagged & auto-notified"
    },
    {
      color: "bg-green-500",
      title: "37 licenses expired in the last 74...",
      subtitle: "Flagged & auto-notified"
    },
  ];

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
      severity: "High",
      severityColor: "text-red-600",
      issue: "Expired License",
      jurisdiction: "TX-Law Lv License",
      status: "TX-Law-LV License expired 2 days ago",
      time: "2 min ago"
    },
    {
      severity: "Medium",
      severityColor: "text-yellow-600",
      issue: "COI Expiring",
      jurisdiction: "XT Plumbing - CA Batch",
      status: "XT Plumbing - CA Batch expires in 5 days",
      time: "1 hour ago"
    },
    {
      severity: "Low",
      severityColor: "text-blue-600",
      issue: "Document Reject",
      jurisdiction: "Quality Roofing - FL",
      status: "Quality Roofing - FL Resubmission invalid",
      time: "1 hour ago"
    },
  ];

  const alertsFromDemo = [
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

  return (
    <div className="h-full bg-gray-50">
      <PageHeader 
        title="Executive Command Center"
        subtitle="Central License Registry — Real-time Greenfield Readiness"
      />

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {kpiData.map((kpi) => (
<Card key={kpi.title} className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
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

        {/* Map and Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* US Market Readiness Map */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">U.S. Market Readiness Map</h2>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Minus className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Map Image */}
            <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
              <img 
                src={map} 
                alt="U.S. Market Readiness Map" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">At Risk (70-84)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-700 rounded-full"></div>
                <span className="text-gray-600">Blocked (≈70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">At ≈70%</span>
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
              <Badge variant="destructive">{alertsFromDemo.filter(a => a.type === 'error').length}</Badge>
            </div>

            <div className="space-y-4">
              {alertsFromDemo.map((alert, index) => (
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
        <Card className="p-6 bg-white border border-gray-200">
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

        {/* Recent Alerts */}
        
      </div>
    </div>
  );
}
