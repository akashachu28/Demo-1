import { Shield, CheckCircle, Clock, AlertTriangle, FileCheck } from "lucide-react";

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
        return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-900/30", label: "Verified" };
      case "expiring":
        return { icon: Clock, color: "text-orange-500", bg: "bg-orange-900/30", label: "Expiring Soon" };
      case "pending":
        return { icon: AlertTriangle, color: "text-blue-500", bg: "bg-blue-900/30", label: "Pending" };
      case "expired":
        return { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-900/30", label: "Expired" };
      default:
        return { icon: Shield, color: "text-gray-500", bg: "bg-gray-900/30", label: "Unknown" };
    }
  };

  const stats = [
    { label: "Total Credentials", value: "1,247", icon: FileCheck, color: "blue" },
    { label: "Verified", value: "1,189", icon: CheckCircle, color: "green" },
    { label: "Pending Review", value: "43", icon: Clock, color: "orange" },
    { label: "Expiring (30D)", value: "15", icon: AlertTriangle, color: "red" },
  ];

  const credentialTypes = [
    { type: "Professional Licenses", count: 412, verified: 398 },
    { type: "Insurance Certificates", count: 347, verified: 342 },
    { type: "Background Checks", count: 289, verified: 276 },
    { type: "Safety Certifications", count: 142, verified: 138 },
    { type: "Bond Certificates", count: 57, verified: 35 },
  ];

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="border-b border-gray-800 bg-[#0E4665] px-8 py-6">
        <h1 className="text-2xl font-semibold text-white">Credentials</h1>
        <p className="text-sm text-gray-400 mt-1">Manage and verify contractor credentials</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-blue-500" />
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Credential Types */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Credentials by Type</h3>
          <div className="space-y-4">
            {credentialTypes.map((cred) => {
              const percentage = (cred.verified / cred.count) * 100;
              return (
                <div key={cred.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{cred.type}</span>
                    <span className="text-sm text-white font-medium">{cred.verified}/{cred.count} verified</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
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

        {/* Credentials Table */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Credential Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Contractor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Issuer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Issued</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Expires</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Verified</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {credentials.map((credential) => {
                  const statusConfig = getStatusConfig(credential.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={credential.id} className="hover:bg-gray-800/30">
                      <td className="px-4 py-4 text-sm text-white font-medium">{credential.contractor}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{credential.type}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{credential.issuer}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{credential.issued}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{credential.expires}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{credential.verifiedDate}</td>
                      <td className="px-4 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
