import { Shield, CheckCircle, Clock, AlertTriangle, FileCheck } from "lucide-react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

const credentials = [
  { id: "1", contractor: "John Smith", type: "Professional License", issuer: "CA State Board", status: "verified", issued: "Jan 15, 2024", expires: "Jan 15, 2027", verifiedDate: "Jan 20, 2024" },
  { id: "2", contractor: "Sarah Johnson", type: "Insurance Certificate", issuer: "Liberty Mutual", status: "verified", issued: "Feb 1, 2024", expires: "Feb 1, 2027", verifiedDate: "Feb 5, 2024" },
  { id: "3", contractor: "Mike Davis", type: "Background Check", issuer: "Verified First", status: "expiring", issued: "Mar 10, 2023", expires: "Mar 10, 2026", verifiedDate: "Mar 15, 2023" },
  { id: "4", contractor: "Emily Brown", type: "Safety Certification", issuer: "OSHA", status: "verified", issued: "Dec 5, 2023", expires: "Dec 5, 2026", verifiedDate: "Dec 10, 2023" },
  { id: "5", contractor: "David Wilson", type: "Bond Certificate", issuer: "Surety One", status: "pending", issued: "Mar 1, 2024", expires: "Mar 1, 2027", verifiedDate: "-" },
  { id: "6", contractor: "Lisa Anderson", type: "Professional License", issuer: "WA Dept of Labor", status: "verified", issued: "Nov 20, 2023", expires: "Nov 20, 2026", verifiedDate: "Nov 25, 2023" },
];

export function Credentials() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Verified" };
      case "expiring":
        return { icon: Clock, color: "text-orange-600", bg: "bg-orange-100", label: "Expiring Soon" };
      case "pending":
        return { icon: AlertTriangle, color: "text-blue-600", bg: "bg-blue-100", label: "Pending" };
      case "expired":
        return { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100", label: "Expired" };
      default:
        return { icon: Shield, color: "text-gray-600", bg: "bg-gray-100", label: "Unknown" };
    }
  };

  const stats = [
    { 
      title: "Total Credentials", 
      value: "1,247", 
      change: "All credential types",
      icon: FileCheck, 
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100"
    },
    { 
      title: "Verified", 
      value: "1,189", 
      change: "Successfully verified",
      icon: CheckCircle, 
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100"
    },
    { 
      title: "Pending Review", 
      value: "43", 
      change: "Awaiting verification",
      icon: Clock, 
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 via-yellow-50 to-yellow-100"
    },
    { 
      title: "Expiring (30D)", 
      value: "15", 
      change: "Requires renewal",
      icon: AlertTriangle, 
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 via-red-50 to-red-100"
    },
  ];

  const credentialTypes = [
    { type: "Professional Licenses", count: 412, verified: 398 },
    { type: "Insurance Certificates", count: 347, verified: 342 },
    { type: "Background Checks", count: 289, verified: 276 },
    { type: "Safety Certifications", count: 142, verified: 138 },
    { type: "Bond Certificates", count: 57, verified: 35 },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Credentials"
          subtitle="Manage and verify contractor credentials"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2 rounded-lg">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] text-gray-700 mb-1">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-700">
                          {stat.value}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Credential Types */}
            <Card className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Credentials by Type</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {credentialTypes.map((cred) => {
                    const percentage = (cred.verified / cred.count) * 100;
                    return (
                      <div key={cred.type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{cred.type}</span>
                          <span className="text-sm text-gray-900 font-medium">{cred.verified}/{cred.count} verified</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              percentage >= 95 ? 'bg-green-500' : percentage >= 85 ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Credentials Table */}
            <Card className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Credential Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contractor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Issuer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Issued</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Expires</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Verified</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {credentials.map((credential) => {
                      const statusConfig = getStatusConfig(credential.status);
                      const StatusIcon = statusConfig.icon;
                      return (
                        <tr key={credential.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4 text-sm text-gray-900 font-medium">{credential.contractor}</td>
                          <td className="px-4 py-4 text-sm text-gray-700">{credential.type}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{credential.issuer}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{credential.issued}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{credential.expires}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{credential.verifiedDate}</td>
                          <td className="px-4 py-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${statusConfig.bg}`}>
                              <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                              <span className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
