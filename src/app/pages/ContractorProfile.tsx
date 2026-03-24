import { useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Download,
  Edit,
  Ban,
  Sparkles,
  FileText,
  Bell,
  UserPlus,
  RefreshCw,
  Phone,
  ChevronRight
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function ContractorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const contractor = {
    id: id || "1",
    name: "John Smith",
    status: "Active • AI-Verified",
    company: "Elite Electrical Services LLC",
    type: "Licensed Contractor",
    license: "License #RC-1309847",
    licenseId: "CA-12345",
    state: "Texas",
    registrationId: "Reg. #registration-id",
    phone: "$3M / $4M",
    phoneLabel: "Reg. Aggregate Limit",
    expires: "Dec 15, 2026",
    expiresLabel: "Next Renewal",
    trustScore: 98,
    aiRiskScore: 22,
    lastAnalysis: "2 hours ago",
    profileCreated: "Jan 15, 2024",
    lastUpdate: "Today, 9:33 AM"
  };

  const complianceSummary = [
    {
      icon: CheckCircle,
      color: "text-green-600",
      title: "Fully compliant in Texas",
      subtitle: "All requirements met • 100% confidence"
    },
    {
      icon: AlertTriangle,
      color: "text-orange-600",
      title: "COI expiring in 12 days",
      subtitle: "Action required • Certificate #COI-2024-456"
    },
    {
      icon: XCircle,
      color: "text-red-600",
      title: "Missing Workers' Comp in California",
      subtitle: "Blocking assignment • Required since Jan 2024"
    }
  ];

  const complianceStats = [
    { value: "5", label: "Active Licenses", color: "text-green-600" },
    { value: "1", label: "Expiring Soon", color: "text-orange-600" },
    { value: "2", label: "Blocked Areas", color: "text-red-600" },
    { value: "98%", label: "AI Accuracy", color: "text-blue-600" }
  ];

  const jurisdictions = [
    { state: "Texas", status: "Compliant", coverage: "37% Coverage", statusColor: "text-green-600", detail: "All 4 licenses active" },
    { state: "California", status: "At-Risk", coverage: "", statusColor: "text-orange-600", detail: "Missing workers' comp insurance" },
    { state: "Florida", status: "Blocked", coverage: "", statusColor: "text-red-600", detail: "License C-10 required" },
    { state: "New York", status: "Compliant", coverage: "", statusColor: "text-green-600", detail: "Approved since Mar 2024" }
  ];

  const quickActions = [
    { icon: Bell, label: "Send Reminder", subtitle: "COI expires in 12 days", color: "text-blue-600" },
    { icon: FileText, label: "Request Documents", subtitle: "Workers' comp for CA", color: "text-blue-600" },
    { icon: UserPlus, label: "Assign to Project", subtitle: "Available in 3 states", color: "text-blue-600" },
    { icon: RefreshCw, label: "Re-check Eligibility", subtitle: "Last checked 2 hours ago", color: "text-blue-600" },
    { icon: Phone, label: "Contact Contractor", subtitle: "", color: "text-blue-600" }
  ];

  const activities = [
    {
      icon: Sparkles,
      title: "AI Compliance Check Completed",
      subtitle: "COI expiry detected • California WC missing",
      detail: "by AI Engine v1.1 • 2 hours ago",
      badge: "AI Risk",
      badgeColor: "bg-orange-100 text-orange-600",
      action: "View Analysis"
    },
    {
      icon: FileText,
      title: "Certificate of Insurance Uploaded",
      subtitle: "COI-2024-456 • General Liability • $2M limit",
      detail: "Uploaded by John Smith • 5 days ago",
      badge: "",
      badgeColor: "",
      action: "View Document"
    },
    {
      icon: CheckCircle,
      title: "License EC-1309847 Auto-Renewed",
      subtitle: "Texas Electrical Contractor License • Valid until Dec 15, 2026",
      detail: "System Auto-Renewal • 3 days ago",
      badge: "",
      badgeColor: "",
      action: "View License"
    },
    {
      icon: XCircle,
      title: "Workers' Comp Rejection",
      subtitle: "California requires WC-01 form • Current: N/A",
      detail: "by System • 2 weeks ago",
      badge: "Action Required",
      badgeColor: "bg-red-100 text-red-600",
      action: "Fix Issue"
    }
  ];

  const stats = [
    { label: "Member Since", value: "January 2024" },
    { label: "Total Projects", value: "24 Completed" },
    { label: "Payment Status", value: "Good Standing", color: "text-green-600" },
    { label: "Response Time", value: "2.3 hours avg" },
    { label: "Next Review", value: "Dec 1, 2026" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
              title="Contractors"
              subtitle="Manage all contractor profiles and licenses"
              
            />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-8 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate('/contractors')} className="hover:text-gray-900">
            Contractors
          </button>
          <ChevronRight className="w-4 h-4" />
          <span>Profile</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{contractor.name}</span>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                {contractor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{contractor.name}</h1>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    {contractor.status}
                  </span>
                </div>
                <p className="text-gray-600">{contractor.company}</p>
                <p className="text-sm text-gray-500">{contractor.type} • {contractor.license}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Sparkles className="w-4 h-4" />
                <span>Run AI Compliance Check</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Ban className="w-4 h-4" />
                <span>Block Contractor</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{contractor.licenseId}</p>
                <p className="text-sm font-medium text-gray-900">Licensed Contractor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{contractor.state}</p>
                <p className="text-sm font-medium text-gray-900">Primary Jurisdiction</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{contractor.phone}</p>
                <p className="text-sm font-medium text-gray-900">{contractor.phoneLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{contractor.expires}</p>
                <p className="text-sm font-medium text-gray-900">{contractor.expiresLabel}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-600">Trust Score</p>
                <p className="text-2xl font-bold text-green-600">{contractor.trustScore} / 100</p>
                <p className="text-xs text-gray-500">Excellent Standing</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">AI Risk Score</p>
                <p className="text-2xl font-bold text-orange-600">{contractor.aiRiskScore} / 100</p>
                <p className="text-xs text-gray-500">Medium Risk</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Last AI Analysis: {contractor.lastAnalysis} • Profile Created: {contractor.profileCreated} • Last Updated: {contractor.lastUpdate}
            </p>
          </div>
        </div>

        {/* AI Compliance Summary */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI Compliance Summary</h2>
              <span className="text-sm text-gray-500">Generated 2 hours ago</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {complianceSummary.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${item.color} mt-0.5`} />
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-orange-200">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Overall Risk Assessment</p>
              <p className="text-sm text-gray-600">
                This contractor is eligible for work in 3 jurisdictions.
                <br />1 blocking issue prevents California assignments.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Request COI Renewal
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Review CA Requirements
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Explain AI Reasoning
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Powered by Compliance AI Engine v1.1</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-6">
              {['Overview', 'Licenses (5)', 'Documents (12)', 'Compliance', 'Insurance', 'Retainer', 'Activity', 'Settings'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    tab === 'Overview' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Compliance Snapshot */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Compliance Snapshot</h3>
                <div className="space-y-2">
                  {complianceStats.map((stat, index) => (
                    <div key={index} className="p-2 bg-white border border-gray-200 shadow-xs rounded-lg">
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Overall Status</p>
                  <p className="text-xs text-gray-600">Was Compliant • Changed 7 days ago</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    At Risk
                  </span>
                </div>
              </div>

              {/* Jurisdiction Coverage */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Jurisdiction Coverage</h3>
                <p className="text-xs text-gray-500 mb-3">Active in 37% Coverage</p>
                <div className="space-y-3">
                  {jurisdictions.map((jurisdiction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{jurisdiction.state}</p>
                        <p className="text-xs text-gray-500">{jurisdiction.detail}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-medium ${jurisdiction.statusColor}`}>
                          {jurisdiction.status}
                        </span>
                        {jurisdiction.coverage && (
                          <p className="text-xs text-gray-500">{jurisdiction.coverage}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <span>View All Jurisdictions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        className="w-full flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <Icon className={`w-5 h-5 ${action.color} mt-0.5`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{action.label}</p>
                          {action.subtitle && (
                            <p className="text-xs text-gray-500">{action.subtitle}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
              <p className="text-sm text-gray-500">Recent events and compliance history</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View Full Timeline</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          {activity.badge && (
                            <span className={`px-2 py-0.5 ${activity.badgeColor} text-xs font-medium rounded`}>
                              {activity.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.subtitle}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.detail}</p>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        {activity.action}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-lg font-semibold ${stat.color || 'text-gray-900'}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
