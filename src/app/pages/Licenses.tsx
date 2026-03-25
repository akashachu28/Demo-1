import { useState } from 'react';

import { Link } from 'react-router';

import { PageHeader } from '../components/PageHeader';

import { ComplianceBadge, ComplianceStatus } from '../components/ComplianceBadge';

import { Award, AlertTriangle, CheckCircle, XCircle, Search, Filter, Download, ExternalLink } from 'lucide-react';

import { Input } from '../components/ui/input';

import { Button } from '../components/ui/button';
 
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

    return matchesSearch && matchesState && matchesType && matchesStatus;

  });
 
  const states = Array.from(new Set(mockLicenses.map(l => l.jurisdiction)));

  const types = Array.from(new Set(mockLicenses.map(l => l.type)));
 
  return (
<div className="min-h-screen bg-gray-50">
<PageHeader

        title="License Management"

        subtitle="Track and manage licenses across all jurisdictions"

      />
 
      <div className="max-w-[1600px] mx-auto p-8 space-y-6">

        {/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
<Award className="w-6 h-6 text-blue-600" />
</div>
</div>
<div className="text-3xl font-bold text-gray-900 mb-1">{totalLicenses}</div>
<div className="text-sm text-gray-600">Total Licenses</div>
</div>
 
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
<CheckCircle className="w-6 h-6 text-green-600" />
</div>
</div>
<div className="text-3xl font-bold text-gray-900 mb-1">{compliantLicenses}</div>
<div className="text-sm text-gray-600">Compliant</div>
</div>
 
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
<AlertTriangle className="w-6 h-6 text-yellow-600" />
</div>
</div>
<div className="text-3xl font-bold text-gray-900 mb-1">{expiringLicenses}</div>
<div className="text-sm text-gray-600">Expiring Soon</div>
</div>
 
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
<XCircle className="w-6 h-6 text-red-600" />
</div>
</div>
<div className="text-3xl font-bold text-gray-900 mb-1">{nonCompliantLicenses}</div>
<div className="text-sm text-gray-600">Non-Compliant</div>
</div>
</div>
 
        {/* Filters and Search */}
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex flex-col lg:flex-row gap-4">
<div className="flex-1 relative">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
<Input

                placeholder="Search licenses, owners, or jurisdictions..."

                value={searchTerm}

                onChange={(e) => setSearchTerm(e.target.value)}

                className="pl-10"

              />
</div>
 
            <div className="flex flex-wrap gap-3">
<select

                value={stateFilter}

                onChange={(e) => setStateFilter(e.target.value)}

                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
<option value="all">All States</option>

                {states.map(state => (
<option key={state} value={state}>{state}</option>

                ))}
</select>
 
              <select

                value={typeFilter}

                onChange={(e) => setTypeFilter(e.target.value)}

                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
<option value="all">All Types</option>

                {types.map(type => (
<option key={type} value={type}>{type}</option>

                ))}
</select>
 
              <select

                value={statusFilter}

                onChange={(e) => setStatusFilter(e.target.value)}

                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
<option value="all">All Status</option>
<option value="compliant">Compliant</option>
<option value="expiring">Expiring</option>
<option value="non-compliant">Non-Compliant</option>
</select>
 
              <Button variant="outline" className="gap-2">
<Download className="w-4 h-4" />

                Export
</Button>
</div>
</div>
</div>
 
        {/* Licenses Table */}
<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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

                    Issues
</th>
<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">

                    Actions
</th>
</tr>
</thead>
<tbody className="divide-y divide-gray-200">

                {filteredLicenses.map((license) => (
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
<span className="text-sm text-gray-900">{license.owner}</span>
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

                      {license.issues.length > 0 ? (
<div className="space-y-1">

                          {license.issues.map((issue, idx) => (
<div key={idx} className="flex items-start gap-2">
<AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
<span className="text-sm text-red-700">{issue}</span>
</div>

                          ))}
</div>

                      ) : (
<span className="text-sm text-gray-400">No issues</span>

                      )}
</td>
<td className="px-6 py-4">
<Link

                        to={`/licenses/${license.id}`}

                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
>

                        View Details
<ExternalLink className="w-4 h-4" />
</Link>
</td>
</tr>

                ))}
</tbody>
</table>
</div>
 
          {filteredLicenses.length === 0 && (
<div className="text-center py-12">
<Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
<p className="text-gray-500">No licenses found matching your filters</p>
</div>

          )}
</div>
</div>
</div>

  );

}

 