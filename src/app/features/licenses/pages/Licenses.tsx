import { useState } from 'react';
import { Link } from 'react-router';
import { PageHeader } from "../../layout/components/PageHeader";
import { ComplianceStatus } from '../../compliance/components/ComplianceBadge';
import { Award, AlertTriangle, CheckCircle, XCircle, Search, Filter, MapPin, ChevronDown, Download } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { AllLicensesTable } from '../components/AllLicensesTable';

interface License {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  owner: string;
  expiryDate: string;
  status: ComplianceStatus;
  issues: string[];
}

const mockLicenses: License[] = [
  {
    id: '1',
    name: 'General Contractor License',
    type: 'Contractor',
    jurisdiction: 'California',
    owner: 'John Smith',
    expiryDate: '2026-12-15',
    status: 'compliant',
    issues: [],
  },
  {
    id: '2',
    name: 'Electrical Contractor',
    type: 'Trade-Specific',
    jurisdiction: 'Texas',
    owner: 'Sarah Johnson',
    expiryDate: '2026-04-20',
    status: 'expiring',
    issues: ['Expires in 30 days'],
  },
  {
    id: '3',
    name: 'Plumbing License',
    type: 'Trade-Specific',
    jurisdiction: 'Nevada',
    owner: 'Mike Davis',
    expiryDate: '2026-02-10',
    status: 'non-compliant',
    issues: ['Missing insurance certificate', 'Bond expired'],
  },
  {
    id: '4',
    name: 'HVAC Contractor',
    type: 'Trade-Specific',
    jurisdiction: 'Arizona',
    owner: 'Emily Brown',
    expiryDate: '2027-08-30',
    status: 'compliant',
    issues: [],
  },
  {
    id: '5',
    name: 'Roofing Contractor',
    type: 'Specialty',
    jurisdiction: 'California',
    owner: 'David Wilson',
    expiryDate: '2026-03-25',
    status: 'expiring',
    issues: ['Renewal application pending'],
  },
  {
    id: '6',
    name: 'Commercial Building',
    type: 'Contractor',
    jurisdiction: 'Florida',
    owner: 'Lisa Anderson',
    expiryDate: '2025-11-30',
    status: 'non-compliant',
    issues: ['License expired', 'Continuing education incomplete'],
  },
];

export function Licenses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'compliant' | 'expiring' | 'non-compliant'>('all');

  // Calculate summary stats
  const totalLicenses = mockLicenses.length;
  const expiringLicenses = mockLicenses.filter(l => l.status === 'expiring').length;
  const nonCompliantLicenses = mockLicenses.filter(l => l.status === 'non-compliant').length;
  const compliantLicenses = mockLicenses.filter(l => l.status === 'compliant').length;

  // Filter licenses
  const filteredLicenses = mockLicenses.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = stateFilter === 'all' || license.jurisdiction === stateFilter;
    const matchesType = typeFilter === 'all' || license.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || license.status === statusFilter;
    const matchesTab = activeTab === 'all' || license.status === activeTab;
    return matchesSearch && matchesState && matchesType && matchesStatus && matchesTab;
  });

  const states = Array.from(new Set(mockLicenses.map(l => l.jurisdiction)));
  const types = Array.from(new Set(mockLicenses.map(l => l.type)));

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader
          title="License Management"
          subtitle="Track and manage licenses across all jurisdictions"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('all'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'all' ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-none ring-1 ring-gray-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{totalLicenses}</div>
                    <div className="text-sm text-gray-600">Total Licenses</div>
                  </div>
                </Card>
              </Link>

              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('compliant'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'compliant' ? 'bg-gradient-to-b from-green-50/50 to-green-100/80 border-none ring-1 ring-green-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{compliantLicenses}</div>
                    <div className="text-sm text-gray-600">Compliant</div>
                  </div>
                </Card>
              </Link>

              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('expiring'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'expiring' ? 'bg-gradient-to-b from-yellow-50/50 to-yellow-100/80 border-none ring-1 ring-yellow-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{expiringLicenses}</div>
                    <div className="text-sm text-gray-600">Expiring Soon</div>
                  </div>
                </Card>
              </Link>

              <Link
                to="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('non-compliant'); }}
                className="block"
              >
                <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'non-compliant' ? 'bg-gradient-to-b from-red-50/50 to-red-100/80 border-none ring-1 ring-red-300' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div className='flex items-baseline gap-3'>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{nonCompliantLicenses}</div>
                    <div className="text-sm text-gray-600">Non-Compliant</div>
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
                    placeholder="Search licenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {/* State Filter */}
                  <div className="relative group">
                    <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-200 hover:border-gray-200">
                      <MapPin className="w-4 h-4" />
                      <span className="hidden sm:inline">{stateFilter === 'all' ? 'State' : stateFilter}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 px-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <button
                        onClick={() => setStateFilter('all')}
                        className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${stateFilter === 'all' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                      >
                        All States
                      </button>
                      {states.map(state => (
                        <button
                          key={state}
                          onClick={() => setStateFilter(state)}
                          className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${stateFilter === state ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="relative group">
                    <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-200 hover:border-gray-200">
                      <Filter className="w-4 h-4" />
                      <span className="hidden sm:inline">{typeFilter === 'all' ? 'Type' : typeFilter}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 px-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <button
                        onClick={() => setTypeFilter('all')}
                        className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${typeFilter === 'all' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                      >
                        All Types
                      </button>
                      {types.map(type => (
                        <button
                          key={type}
                          onClick={() => setTypeFilter(type)}
                          className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${typeFilter === type ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="relative group">
                    <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-200 hover:border-gray-200">
                      <Filter className="w-4 h-4" />
                      <span className="hidden sm:inline">{statusFilter === 'all' ? 'Status' : statusFilter}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 px-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <button
                        onClick={() => setStatusFilter('all')}
                        className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'all' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => setStatusFilter('compliant')}
                        className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'compliant' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                      >
                        Compliant
                      </button>
                      <button
                        onClick={() => setStatusFilter('expiring')}
                        className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'expiring' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                      >
                        Expiring
                      </button>
                      <button
                        onClick={() => setStatusFilter('non-compliant')}
                        className={`w-full text-left px-3 py-1.5 rounded-sm text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'non-compliant' ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'}`}
                      >
                        Non-Compliant
                      </button>
                    </div>
                  </div>

                  {/* Export Button */}
                  <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-200 hover:border-gray-200">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Licenses Table */}
            <AllLicensesTable
              licenses={filteredLicenses}
              show={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
