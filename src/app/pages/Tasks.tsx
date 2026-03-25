import { useState } from 'react';
import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { ComplianceBadge, ComplianceStatus } from '../components/ComplianceBadge';
import {
  AlertTriangle,
  Clock,
  UserCheck,
  AlertCircle,
  Search,
  Filter,
  Download,
  ExternalLink,
  Award,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

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
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full text-sm font-medium">
        <AlertCircle className="w-4 h-4" />
        Critical
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 border border-orange-200 rounded-full text-sm font-medium">
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
      <span className={`inline-flex items-center px-3 py-1 ${config[impact]} border rounded-full text-sm font-medium capitalize`}>
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
      <span className={`inline-flex items-center px-3 py-1 ${className} border rounded-full text-sm font-medium`}>
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Action Center"
        subtitle="All items requiring immediate attention"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="bg-[#36b0c9] hover:bg-[#2a8fa3] text-white gap-2">
              <CheckCircle className="w-4 h-4" />
              Mark All Reviewed
            </Button>
          </div>
        }
      />

      <div className="max-w-[1600px] mx-auto p-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('all'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'all' ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalTasks}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('licenses'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'licenses' ? 'ring-2 ring-red-500' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{expiredCount}</div>
              <div className="text-sm text-gray-600">Expired/Expiring</div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('approvals'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'approvals' ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{approvalsCount}</div>
              <div className="text-sm text-gray-600">Pending Approvals</div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('risk'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'risk' ? 'ring-2 ring-orange-500' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{highRiskCount}</div>
              <div className="text-sm text-gray-600">High-Risk</div>
            </Card>
          </Link>

          <Link
            to="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('gaps'); }}
            className="block"
          >
            <Card className={`p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${activeTab === 'gaps' ? 'ring-2 ring-purple-500' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{gapsCount}</div>
              <div className="text-sm text-gray-600">Compliance Gaps</div>
            </Card>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="Search tasks, contractors, licenses, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="critical">Critical</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
              </select>

              <button className="px-4 py-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Expired/Expiring Licenses */}
        {(activeTab === 'all' || activeTab === 'licenses') && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Expired / Expiring Licenses</h3>
                    <p className="text-sm text-gray-600">{expiredCount} items require action</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      License Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Jurisdiction
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockExpiredLicenses.map((license) => (
                    <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{license.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{license.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{license.jurisdiction}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/contractors/${license.id}`} className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                          {license.owner}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {new Date(license.expiryDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ComplianceBadge status={license.status} size="sm" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-red-700">{license.issue}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/licenses/${license.id}`}>
                          <button  className="px-4 py-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent gap-2 flex items-center text-sm text-gray-700 hover:bg-gray-200">
                            Review
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pending Approvals */}
        {(activeTab === 'all' || activeTab === 'approvals') && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Contractor Pending Approvals</h3>
                    <p className="text-sm text-gray-600">{approvalsCount} contractors awaiting review</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contractor Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Missing Items
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Reviewer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockPendingApprovals.map((approval) => (
                    <tr key={approval.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{approval.contractorName}</div>
                          <div className="text-sm text-gray-500">{approval.company}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(approval.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {approval.missingItems.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <XCircle className="w-3 h-3 text-red-500" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                          {approval.missingItems.length > 2 && (
                            <span className="text-xs text-gray-500">+{approval.missingItems.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {new Date(approval.submittedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{approval.reviewer}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/contractors/${approval.id}`}>
                          <button  className="px-4 py-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent gap-2 flex items-center text-sm text-gray-700 hover:bg-gray-200">
                            Review
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* High-Risk Contractors */}
        {(activeTab === 'all' || activeTab === 'risk') && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-orange-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">High-Risk Contractors</h3>
                    <p className="text-sm text-gray-600">{highRiskCount} contractors flagged for review</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contractor Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockHighRiskContractors.map((contractor) => (
                    <tr key={contractor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{contractor.name}</div>
                          <div className="text-sm text-gray-500">{contractor.company}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getRiskBadge(contractor.riskLevel)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{contractor.issue}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          {contractor.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{contractor.lastActivity}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/contractors/${contractor.id}`}>
                          <button  className="px-4 py-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent gap-2 flex items-center text-sm text-gray-700 hover:bg-gray-200">
                            Review
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Compliance Gap Analysis */}
        {(activeTab === 'all' || activeTab === 'gaps') && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Compliance Gap Analysis</h3>
                    <p className="text-sm text-gray-600">{gapsCount} market readiness gaps identified</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Work Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Gap Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Impact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Recommended Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockComplianceGaps.map((gap) => (
                    <tr key={gap.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{gap.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{gap.workType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                          {gap.gapCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{gap.issue}</span>
                      </td>
                      <td className="px-6 py-4">
                        {getImpactBadge(gap.impact)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-blue-600 font-medium">{gap.recommendedAction}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
