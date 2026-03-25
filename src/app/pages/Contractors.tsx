import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Download, UserPlus, MoreVertical, CheckCircle, AlertTriangle, Clock, Eye, Sparkles, Zap, Bell, RefreshCw, FileText, Ban, ChevronRight, Check, X, SearchCheck } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const contractors = [
  { id: "1", name: "John Smith", license: "CA-12345", state: "California", status: "active", compliance: 98, expires: "Dec 15, 2026", phone: "(555) 123-4567" },
  { id: "2", name: "Sarah Johnson", license: "TX-67890", state: "Texas", status: "active", compliance: 100, expires: "Jan 20, 2027", phone: "(555) 234-5678" },
  { id: "3", name: "Mike Davis", license: "FL-45678", state: "Florida", status: "expiring", compliance: 95, expires: "Apr 10, 2026", phone: "(555) 345-6789" },
  { id: "4", name: "Emily Brown", license: "NY-23456", state: "New York", status: "active", compliance: 97, expires: "Oct 5, 2026", phone: "(555) 456-7890" },
  { id: "5", name: "David Wilson", license: "IL-78901", state: "Illinois", status: "pending", compliance: 85, expires: "May 15, 2026", phone: "(555) 567-8901" },
  { id: "6", name: "Lisa Anderson", license: "WA-34567", state: "Washington", status: "active", compliance: 99, expires: "Nov 30, 2026", phone: "(555) 678-9012" },
  { id: "7", name: "James Taylor", license: "AZ-89012", state: "Arizona", status: "suspended", compliance: 65, expires: "Mar 25, 2026", phone: "(555) 789-0123" },
  { id: "8", name: "Jennifer Martinez", license: "CO-56789", state: "Colorado", status: "active", compliance: 96, expires: "Aug 18, 2026", phone: "(555) 890-1234" },
];

export function Contractors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.license.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || contractor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const stats = [
    { label: "Total", value: "412", color: "blue" },
    { label: "Active", value: "347", color: "green" },
    { label: "Pending", value: "34", color: "orange" },
    { label: "Suspended", value: "12", color: "red" },
  ];

  return (
    <div className="h-full bg-gray-50">
      <PageHeader 
        title="Contractor Master Registry"
        subtitle="System of Record - 24,853 Total Contractors"
        action={
          <button 
            onClick={() => navigate('/contractors/register')}
            className="flex items-center gap-2 px-4 py-2 bg-[#012542] text-white rounded-lg hover:bg-[#063253] transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Contractor</span>
          </button>
        }
      />

      <div className="p-8 space-y-6">
        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label} Contractors</p>
            </div>
          ))}
        </div> */}

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contractors by name, company or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expiring">Expiring</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contractor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Primary Jurisdiction</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">State</th> */}
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trust Score</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Expires</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContractors.map((contractor) => {
                  const statusConfig = getStatusConfig(contractor.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={contractor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{contractor.name}</p>
                          <p className="text-xs text-gray-500">{contractor.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contractor.license}</td>
                      {/* <td className="px-6 py-4 text-sm text-gray-700">{contractor.state}</td> */}
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                            <div
                              className={`h-2 rounded-full ${
                                contractor.compliance >= 95 ? 'bg-green-500' : contractor.compliance >= 85 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${contractor.compliance}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900 font-medium">{contractor.compliance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contractor.expires}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {contractor.status === "pending" ? (
                            <>
                              <button 
                                onClick={() => {
                                  navigate('/contractors/dummy-registration');
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                              >
                                <SearchCheck className="w-4 h-4" />
                                <span>Review</span>
                              </button>
                              
                            </>
                          ) : (
                            <div className="relative">
                              <button 
                                onClick={() => setOpenDropdown(openDropdown === contractor.id ? null : contractor.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View</span>
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              
                              {openDropdown === contractor.id && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setOpenDropdown(null)}
                                  />
                                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-20 overflow-hidden">
                                    <button 
                                      onClick={() => navigate(`/contractors/${contractor.id}`)}
                                      className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors text-left"
                                    >
                                      <Eye className="w-5 h-5" />
                                      <span className="text-sm font-medium">View Profile</span>
                                    </button>
                                    
                                    <div className="border-t border-gray-700" />
                                    
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors text-left">
                                      <Zap className="w-5 h-5" />
                                      <span className="text-sm font-medium">Run AI Compliance Check</span>
                                    </button>
                                    
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-gray-700 transition-colors text-left">
                                      <Sparkles className="w-5 h-5" />
                                      <span className="text-sm font-medium">Explain Status (AI)</span>
                                    </button>
                                    
                                    <div className="border-t border-gray-700" />
                                    
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors text-left">
                                      <Bell className="w-5 h-5" />
                                      <span className="text-sm font-medium">Send Reminder</span>
                                    </button>
                                    
                                    <button className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-gray-700 transition-colors text-left">
                                      <div className="flex items-center gap-3">
                                        <RefreshCw className="w-5 h-5" />
                                        <span className="text-sm font-medium">Recheck Eligibility</span>
                                      </div>
                                      <ChevronRight className="w-4 h-4" />
                                    </button>
                                    
                                    <div className="border-t border-gray-700" />
                                    
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors text-left">
                                      <FileText className="w-5 h-5" />
                                      <span className="text-sm font-medium">View Audit Logs</span>
                                    </button>
                                    
                                    <div className="border-t border-gray-700" />
                                    
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-700 transition-colors text-left">
                                      <Ban className="w-5 h-5" />
                                      <span className="text-sm font-medium">Block Contractor</span>
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
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
