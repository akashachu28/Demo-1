import { useState } from 'react';
import { PageHeader } from "../../layout/components/PageHeader";
import { ComplianceStatus } from '../../compliance/components/ComplianceBadge';
import {
  AlertTriangle,
  AlertCircle,
  Search,
  Filter,
  MapPin,
  ChevronDown,
  Clock,
  UserCheck
} from 'lucide-react';
import { ExpiredLicensesTable } from '../components/ExpiredLicensesTable';
import { PendingApprovalsTable } from '../components/PendingApprovalsTable';
import { HighRiskContractorsTable } from '../components/HighRiskContractorsTable';
import { ComplianceGapTable } from '../components/ComplianceGapTable';
import { Card } from '../../../components/ui/card';
import { Link } from 'react-router';

interface ExpiredLicense {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  owner: string;
  expiryDate: string;
  status: ComplianceStatus;
  issue: string;
}

interface PendingApproval {
  id: string;
  contractorName: string;
  company: string;
  status: string;
  missingItems: string[];
  submittedDate: string;
  reviewer: string;
}

interface HighRiskContractor {
  id: string;
  name: string;
  company: string;
  riskLevel: 'high' | 'critical';
  issue: string;
  location: string;
  lastActivity: string;
}

interface ComplianceGap {
  id: string;
  location: string;
  workType: string;
  gapCategory: string;
  issue: string;
  impact: 'high' | 'medium' | 'low';
  recommendedAction: string;
}

const mockExpiredLicenses: ExpiredLicense[] = [
  {
    id: '1',
    name: 'Plumbing License',
    type: 'Trade-Specific',
    jurisdiction: 'Nevada',
    owner: 'Mike Davis',
    expiryDate: '2026-02-10',
    status: 'non-compliant',
    issue: 'License expired 44 days ago',
  },
  {
    id: '2',
    name: 'Commercial Building',
    type: 'Contractor',
    jurisdiction: 'Florida',
    owner: 'Lisa Anderson',
    expiryDate: '2025-11-30',
    status: 'non-compliant',
    issue: 'License expired 115 days ago',
  },
  {
    id: '3',
    name: 'Electrical Contractor',
    type: 'Trade-Specific',
    jurisdiction: 'Texas',
    owner: 'Sarah Johnson',
    expiryDate: '2026-04-20',
    status: 'expiring',
    issue: 'Expires in 26 days',
  },
  {
    id: '4',
    name: 'Roofing Contractor',
    type: 'Specialty',
    jurisdiction: 'California',
    owner: 'David Wilson',
    expiryDate: '2026-03-25',
    status: 'expiring',
    issue: 'Renewal application pending',
  },
];

const mockPendingApprovals: PendingApproval[] = [
  {
    id: 'C-006',
    contractorName: 'Robert Martinez',
    company: 'Martinez HVAC Services',
    status: 'pending_review',
    missingItems: ['Background check', 'Bond certificate'],
    submittedDate: '2026-03-20',
    reviewer: 'Sarah Admin',
  },
  {
    id: 'C-007',
    contractorName: 'Jessica Lee',
    company: 'Lee Construction Group',
    status: 'pending_documents',
    missingItems: ['Insurance certificate', 'W9 form', 'References'],
    submittedDate: '2026-03-18',
    reviewer: 'Mike Reviewer',
  },
  {
    id: 'C-008',
    contractorName: 'Thomas Brown',
    company: 'Brown Electrical Co',
    status: 'pending_review',
    missingItems: ['License verification'],
    submittedDate: '2026-03-22',
    reviewer: 'Sarah Admin',
  },
];

const mockHighRiskContractors: HighRiskContractor[] = [
  {
    id: 'C-003',
    name: 'Mike Davis',
    company: 'Davis Plumbing Co',
    riskLevel: 'critical',
    issue: 'Multiple expired licenses, Missing insurance',
    location: 'Las Vegas, NV',
    lastActivity: '3 hours ago',
  },
  {
    id: 'C-009',
    name: 'Amanda Foster',
    company: 'Foster General Contracting',
    riskLevel: 'high',
    issue: 'Bond expiring in 7 days, Incomplete CE credits',
    location: 'Austin, TX',
    lastActivity: '1 day ago',
  },
  {
    id: 'C-010',
    name: 'Kevin Wright',
    company: 'Wright Roofing LLC',
    riskLevel: 'high',
    issue: 'Failed background check renewal',
    location: 'Miami, FL',
    lastActivity: '2 days ago',
  },
];

const mockComplianceGaps: ComplianceGap[] = [
  {
    id: 'GAP-001',
    location: 'Oregon',
    workType: 'Commercial Construction',
    gapCategory: 'License',
    issue: 'No active general contractor license',
    impact: 'high',
    recommendedAction: 'Apply for OR General Contractor License',
  },
  {
    id: 'GAP-002',
    location: 'Washington',
    workType: 'Electrical Work',
    gapCategory: 'Insurance',
    issue: 'Insurance coverage below state minimum',
    impact: 'high',
    recommendedAction: 'Increase liability coverage to $2M',
  },
  {
    id: 'GAP-003',
    location: 'Colorado',
    workType: 'HVAC Installation',
    gapCategory: 'Certification',
    issue: 'Missing EPA 608 certification',
    impact: 'medium',
    recommendedAction: 'Obtain EPA 608 Universal certification',
  },
  {
    id: 'GAP-004',
    location: 'Utah',
    workType: 'Plumbing',
    gapCategory: 'License',
    issue: 'Qualifier not registered in state',
    impact: 'high',
    recommendedAction: 'Register qualifying individual in Utah',
  },
];

export function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'licenses' | 'approvals' | 'risk' | 'gaps'>('all');

  // Calculate summary stats
  const expiredCount = mockExpiredLicenses.length;
  const approvalsCount = mockPendingApprovals.length;
  const highRiskCount = mockHighRiskContractors.length;
  const gapsCount = mockComplianceGaps.length;
  const totalTasks = expiredCount + approvalsCount + highRiskCount + gapsCount;

  const locations = Array.from(new Set([
    ...mockExpiredLicenses.map(l => l.jurisdiction),
    ...mockHighRiskContractors.map(c => c.location.split(', ')[1]),
    ...mockComplianceGaps.map(g => g.location),
  ]));

  const getRiskBadge = (level: 'high' | 'critical') => {
    return level === 'critical' ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-medium">
        <AlertCircle className="w-4 h-4" />
        Critical
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 border border-orange-200 rounded-full text-xs font-medium">
        <AlertTriangle className="w-4 h-4" />
        High
      </span>
    );
  };

  const getImpactBadge = (impact: 'high' | 'medium' | 'low') => {
    const config = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 ${config[impact]} border rounded-full text-xs font-medium capitalize`}>
        {impact} Impact
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      pending_review: { label: 'Pending Review', className: 'bg-blue-100 text-blue-700 border-blue-200' },
      pending_documents: { label: 'Missing Docs', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    };
    const { label, className } = config[status] || { label: status, className: 'bg-gray-100 text-gray-700 border-gray-200' };
    return (
      <span className={`inline-flex items-center px-3 py-1 ${className} border rounded-full text-xs font-medium`}>
        {label}
      </span>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader
          title="Action Center"
          subtitle="All items requiring immediate attention"
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
                  <AlertCircle className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div className='flex items-baseline gap-3'>
                <div className="text-3xl font-bold text-gray-900 mb-1">{totalTasks}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('licenses'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'licenses' ? 'bg-gradient-to-b from-red-50/50 to-red-100/80 border-none ring-1 ring-red-300' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className='flex items-baseline gap-3'>
                <div className="text-3xl font-bold text-gray-900 mb-1">{expiredCount}</div>
                <div className="text-sm text-gray-600">Expired/Expiring</div>
              </div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('approvals'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'approvals' ? 'bg-gradient-to-b from-blue-50/50 to-blue-100/80 border-none ring-1 ring-blue-300' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className='flex items-baseline gap-3'>
                <div className="text-3xl font-bold text-gray-900 mb-1">{approvalsCount}</div>
                <div className="text-sm text-gray-600">Pending Approvals</div>
              </div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('risk'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'risk' ? 'bg-gradient-to-b from-orange-50/50 to-orange-100/80 border-none ring-1 ring-orange-300' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className='flex items-baseline gap-3'>
                <div className="text-3xl font-bold text-gray-900 mb-1">{highRiskCount}</div>
                <div className="text-sm text-gray-600">High-Risk</div>
              </div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('gaps'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'gaps' ? 'bg-gradient-to-b from-purple-50/50 to-purple-100/80 border-none ring-1 ring-purple-300' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className='flex items-baseline gap-3'>
                <div className="text-3xl font-bold text-gray-900 mb-1">{gapsCount}</div>
                <div className="text-sm text-gray-600">Compliance Gaps</div>
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
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Location Filter */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-gray-200">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">{locationFilter === 'all' ? 'Location' : locationFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => setLocationFilter('all')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${locationFilter === 'all' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    All Locations
                  </button>
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${locationFilter === loc ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-gray-200">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">{statusFilter === 'all' ? 'Status' : statusFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'all' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    All Statuses
                  </button>
                  <button
                    onClick={() => setStatusFilter('critical')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'critical' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    Critical
                  </button>
                  <button
                    onClick={() => setStatusFilter('high')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'high' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    High Priority
                  </button>
                  <button
                    onClick={() => setStatusFilter('medium')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === 'medium' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    Medium Priority
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expired/Expiring Licenses */}
        <ExpiredLicensesTable
          licenses={mockExpiredLicenses}
          count={expiredCount}
          show={activeTab === 'all' || activeTab === 'licenses'}
        />

        {/* Pending Approvals */}
        <PendingApprovalsTable
          approvals={mockPendingApprovals}
          count={approvalsCount}
          show={activeTab === 'all' || activeTab === 'approvals'}
          getStatusBadge={getStatusBadge}
        />

        {/* High-Risk Contractors */}
        <HighRiskContractorsTable
          contractors={mockHighRiskContractors}
          count={highRiskCount}
          show={activeTab === 'all' || activeTab === 'risk'}
          getRiskBadge={getRiskBadge}
        />

        {/* Compliance Gap Analysis */}
        <ComplianceGapTable
          gaps={mockComplianceGaps}
          count={gapsCount}
          show={activeTab === 'all' || activeTab === 'gaps'}
          getImpactBadge={getImpactBadge}
        />
          </div>
        </div>
      </div>
    </div>
  );
}
