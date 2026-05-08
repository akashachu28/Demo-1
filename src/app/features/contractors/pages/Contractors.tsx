import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Search, Download, UserPlus, CheckCircle, AlertTriangle, Clock, MapPin, ChevronDown } from "lucide-react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";
import { AllContractorsTable } from "../components/AllContractorsTable";

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
  const [stateFilter, setStateFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expiring' | 'pending' | 'suspended'>('all');
  const navigate = useNavigate();

  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.license.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = stateFilter === "all" || contractor.state === stateFilter;
    const matchesTab = activeTab === 'all' || contractor.status === activeTab;
    return matchesSearch && matchesState && matchesTab;
  });

  const totalCount = contractors.length;
  const activeCount = contractors.filter(c => c.status === 'active').length;
  const expiringCount = contractors.filter(c => c.status === 'expiring').length;
  const pendingCount = contractors.filter(c => c.status === 'pending').length;
  const suspendedCount = contractors.filter(c => c.status === 'suspended').length;

  const states = Array.from(new Set(contractors.map(c => c.state)));

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Contractor Master Registry"
          subtitle="System of Record - 24,853 Total Contractors"
          action={
            <button 
              onClick={() => navigate('/contractors/register')}
              className="flex items-center text-sm gap-2 px-4 py-2 bg-[#012542] text-white rounded-lg hover:bg-[#063253] transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Contractor</span>
            </button>
          }
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('all'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'all' ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-none ring-1 ring-gray-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{totalCount}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </Card>
              </Link>

              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('active'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'active' ? 'bg-gradient-to-b from-green-50/50 to-green-100/80 border-none ring-1 ring-green-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{activeCount}</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                </Card>
              </Link>

              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('expiring'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'expiring' ? 'bg-gradient-to-b from-orange-50/50 to-orange-100/80 border-none ring-1 ring-orange-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{expiringCount}</div>
                    <div className="text-sm text-gray-600">Expiring</div>
                  </div>
                </Card>
              </Link>

              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('pending'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'pending' ? 'bg-gradient-to-b from-blue-50/50 to-blue-100/80 border-none ring-1 ring-blue-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{pendingCount}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </Card>
              </Link>

              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('suspended'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'suspended' ? 'bg-gradient-to-b from-red-50/50 to-red-100/80 border-none ring-1 ring-red-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{suspendedCount}</div>
                    <div className="text-sm text-gray-600">Suspended</div>
                  </div>
                </Card>
              </Link>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search contractors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {/* State Filter */}
                  <div className="relative group">
                    <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-gray-200">
                      <MapPin className="w-4 h-4" />
                      <span className="hidden sm:inline">{stateFilter === 'all' ? 'State' : stateFilter}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <button
                        onClick={() => setStateFilter('all')}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${stateFilter === 'all' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                      >
                        All States
                      </button>
                      {states.map(state => (
                        <button
                          key={state}
                          onClick={() => setStateFilter(state)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${stateFilter === state ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Export Button */}
                  <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-gray-200">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <AllContractorsTable contractors={filteredContractors} />
          </div>
        </div>
      </div>
    </div>
  );
}
