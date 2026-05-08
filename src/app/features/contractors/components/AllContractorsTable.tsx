import { useNavigate } from "react-router";
import { CheckCircle, AlertTriangle, Clock, Eye, FileCheck, ExternalLink, FileCheckIcon } from "lucide-react";

interface Contractor {
  id: string;
  name: string;
  license: string;
  state: string;
  status: string;
  compliance: number;
  expires: string;
  phone: string;
}

interface AllContractorsTableProps {
  contractors: Contractor[];
}

export function AllContractorsTable({ contractors }: AllContractorsTableProps) {
  const navigate = useNavigate();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Active" };
      case "expiring":
        return { icon: Clock, color: "text-orange-600", bg: "bg-orange-100", label: "Expiring" };
      case "pending":
        return { icon: Clock, color: "text-blue-600", bg: "bg-blue-100", label: "Pending" };
      case "suspended":
        return { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100", label: "Suspended" };
      default:
        return { icon: CheckCircle, color: "text-gray-600", bg: "bg-gray-100", label: "Unknown" };
    }
  };

  if (contractors.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <p className="text-gray-500">No contractors found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contractor</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Primary Jurisdiction</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Compliance</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expires</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contractors.map((contractor) => {
              const statusConfig = getStatusConfig(contractor.status);
              const StatusIcon = statusConfig.icon;
              return (
                <tr key={contractor.id} className="hover:bg-gray-50 text-xs transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{contractor.name}</p>
                      <p className=" text-gray-500">{contractor.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4  text-gray-700">{contractor.license}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      <span className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className=" text-gray-900 font-medium">{contractor.compliance}%</span>
                  </td>
                  <td className="px-6 py-4  text-gray-700">{contractor.expires}</td>
                  <td className="px-6 py-4">
                    {contractor.id === "2" || contractor.id === "4" ? (
                      <button 
                        onClick={() => navigate(`/contractors/review/${contractor.id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent gap-2 flex items-center text-xs text-gray-700 hover:bg-gray-200"
                      >
                        <FileCheckIcon className="w-3 h-3"/>
                        Review 
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate(`/contractors/${contractor.id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent gap-2 flex items-center text-xs text-gray-700 hover:bg-gray-200"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
