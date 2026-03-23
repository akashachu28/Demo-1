import { FileText, Upload, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";

const documents = [
  { id: "1", name: "License_CA_JohnSmith.pdf", contractor: "John Smith", type: "License", size: "2.4 MB", uploaded: "Mar 20, 2026", status: "approved" },
  { id: "2", name: "Insurance_TX_SarahJohnson.pdf", contractor: "Sarah Johnson", type: "Insurance", size: "1.8 MB", uploaded: "Mar 19, 2026", status: "approved" },
  { id: "3", name: "Background_FL_MikeDavis.pdf", contractor: "Mike Davis", type: "Background Check", size: "3.2 MB", uploaded: "Mar 18, 2026", status: "review" },
  { id: "4", name: "Bond_NY_EmilyBrown.pdf", contractor: "Emily Brown", type: "Bond", size: "1.5 MB", uploaded: "Mar 17, 2026", status: "approved" },
  { id: "5", name: "License_IL_DavidWilson.pdf", contractor: "David Wilson", type: "License", size: "2.1 MB", uploaded: "Mar 16, 2026", status: "review" },
  { id: "6", name: "Insurance_WA_LisaAnderson.pdf", contractor: "Lisa Anderson", type: "Insurance", size: "1.9 MB", uploaded: "Mar 15, 2026", status: "pending" },
];

const documentsByType = [
  { type: "Professional Licenses", count: 142, pending: 8 },
  { type: "Insurance Certificates", count: 127, pending: 12 },
  { type: "Background Checks", count: 98, pending: 5 },
  { type: "Bond Documents", count: 76, pending: 3 },
  { type: "Safety Certifications", count: 54, pending: 3 },
];

export function Documents() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-900/30", label: "Approved" };
      case "review":
        return { icon: Clock, color: "text-orange-500", bg: "bg-orange-900/30", label: "In Review" };
      case "pending":
        return { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-900/30", label: "Pending" };
      default:
        return { icon: FileText, color: "text-gray-500", bg: "bg-gray-900/30", label: "Unknown" };
    }
  };

  const stats = [
    { label: "Total Documents", value: "1,847", icon: FileText },
    { label: "Pending Review", value: "31", icon: Clock },
    { label: "Approved", value: "1,789", icon: CheckCircle },
    { label: "Uploaded Today", value: "23", icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="border-b border-gray-800 bg-[#1059A9] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Documents</h1>
            <p className="text-sm text-gray-400 mt-1">Manage contractor documentation</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
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

        {/* Documents by Type */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Documents by Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentsByType.map((doc) => (
              <div key={doc.type} className="bg-[#0f1425] rounded-lg p-4 border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <p className="text-sm font-medium text-white">{doc.type}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-white">{doc.count}</p>
                    <p className="text-xs text-gray-500">Total documents</p>
                  </div>
                  {doc.pending > 0 && (
                    <div className="px-3 py-1 bg-orange-900/30 text-orange-500 text-xs rounded-full">
                      {doc.pending} pending
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Documents</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Document</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Contractor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Uploaded</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {documents.map((doc) => {
                  const statusConfig = getStatusConfig(doc.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={doc.id} className="hover:bg-gray-800/30">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-white font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">{doc.contractor}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{doc.type}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{doc.size}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{doc.uploaded}</td>
                      <td className="px-4 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
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
