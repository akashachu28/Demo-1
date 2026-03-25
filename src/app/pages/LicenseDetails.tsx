import { useState } from 'react';

import { useParams, Link } from 'react-router';

import { PageHeader } from '../components/PageHeader';


import { 

  ArrowLeft, 

  Award, 

  Building2, 

  User, 

  Calendar,

  FileText,

  CheckCircle,

  XCircle,

  AlertTriangle,

  Download,

  Eye

} from 'lucide-react';

import { Button } from '../components/ui/button';
import { ComplianceBadge } from '../components/ComplianceBadge';
 
export function LicenseDetail() {

  const { id } = useParams();
 
  // Mock data

  const license = {

    id: id || '1',

    name: 'General Contractor License',

    number: 'CA-GC-123456',

    type: 'Contractor',

    jurisdiction: 'California',

    issueDate: '2024-01-15',

    expiryDate: '2026-12-15',

    status: 'compliant' as const,

    contractor: {

      name: 'John Smith',

      company: 'Smith Construction LLC',

      id: 'C-001'

    },

    qualifier: {

      name: 'John Smith',

      certificationNumber: 'Q-12345'

    }

  };
 
  const requirements = [

    { name: 'License Application', required: true, status: 'complete', dueDate: '2024-01-10', completedDate: '2024-01-08' },

    { name: 'General Liability Insurance', required: true, status: 'complete', dueDate: '2024-01-15', completedDate: '2024-01-12' },

    { name: 'Workers Compensation', required: true, status: 'complete', dueDate: '2024-01-15', completedDate: '2024-01-12' },

    { name: 'Surety Bond ($15,000)', required: true, status: 'complete', dueDate: '2024-01-15', completedDate: '2024-01-14' },

    { name: 'Background Check', required: true, status: 'complete', dueDate: '2024-01-10', completedDate: '2024-01-09' },

    { name: 'Continuing Education (16 hours)', required: true, status: 'complete', dueDate: '2024-01-01', completedDate: '2023-12-28' },

  ];
 
  const documents = [

    { name: 'License Certificate', type: 'PDF', uploadDate: '2024-01-15', size: '245 KB' },

    { name: 'Insurance Certificate', type: 'PDF', uploadDate: '2024-01-12', size: '312 KB' },

    { name: 'Bond Document', type: 'PDF', uploadDate: '2024-01-14', size: '189 KB' },

    { name: 'CE Certificate', type: 'PDF', uploadDate: '2023-12-28', size: '156 KB' },

  ];
 
  const auditTimeline = [

    { date: '2024-01-15', action: 'License Issued', user: 'System', type: 'success' },

    { date: '2024-01-14', action: 'Bond verification completed', user: 'Sarah Admin', type: 'success' },

    { date: '2024-01-12', action: 'Insurance documents verified', user: 'Mike Reviewer', type: 'success' },

    { date: '2024-01-10', action: 'Background check cleared', user: 'System', type: 'success' },

    { date: '2024-01-08', action: 'Application submitted', user: 'John Smith', type: 'info' },

  ];
 
  const completedRequirements = requirements.filter(r => r.status === 'complete').length;

  const compliancePercentage = Math.round((completedRequirements / requirements.length) * 100);
 
  return (
<div className="min-h-screen bg-gray-50">
<PageHeader

        title={license.name}

        subtitle={`License #${license.number}`}


      />
 
      <div className="max-w-[1600px] mx-auto p-8 space-y-6">

        {/* Overview Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center gap-3 mb-3">
<Award className="w-5 h-5 text-gray-500" />
<span className="text-sm text-gray-600">Status</span>
</div>
<ComplianceBadge status={license.status} size="md" />
</div>
 
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center gap-3 mb-3">
<Building2 className="w-5 h-5 text-gray-500" />
<span className="text-sm text-gray-600">Jurisdiction</span>
</div>
<div className="text-lg font-semibold text-gray-900">{license.jurisdiction}</div>
</div>
 
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center gap-3 mb-3">
<Calendar className="w-5 h-5 text-gray-500" />
<span className="text-sm text-gray-600">Expiry Date</span>
</div>
<div className="text-lg font-semibold text-gray-900">

              {new Date(license.expiryDate).toLocaleDateString('en-US', {

                year: 'numeric',

                month: 'short',

                day: 'numeric'

              })}
</div>
</div>
 
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex items-center gap-3 mb-3">
<CheckCircle className="w-5 h-5 text-gray-500" />
<span className="text-sm text-gray-600">Compliance</span>
</div>
<div className="text-lg font-semibold text-gray-900">{compliancePercentage}%</div>
<div className="mt-2 w-full bg-gray-200 rounded-full h-2">
<div

                className="bg-green-500 h-2 rounded-full transition-all"

                style={{ width: `${compliancePercentage}%` }}

              />
</div>
</div>
</div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Main Info */}
<div className="lg:col-span-2 space-y-6">

            {/* Linked Entities */}
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<h3 className="text-lg font-semibold text-gray-900 mb-4">Linked Entities</h3>
<div className="space-y-4">
<div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-start gap-3">
<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
<User className="w-5 h-5 text-blue-600" />
</div>
<div>
<div className="font-medium text-gray-900">Contractor</div>
<div className="text-sm text-gray-600">{license.contractor.name}</div>
<div className="text-xs text-gray-500 mt-1">{license.contractor.company}</div>
</div>
</div>
<Link

                    to={`/contractors/${license.contractor.id}`}

                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
>

                    View Profile
</Link>
</div>
 
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-start gap-3">
<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
<Award className="w-5 h-5 text-green-600" />
</div>
<div>
<div className="font-medium text-gray-900">Qualifying Individual</div>
<div className="text-sm text-gray-600">{license.qualifier.name}</div>
<div className="text-xs text-gray-500 mt-1">Cert: {license.qualifier.certificationNumber}</div>
</div>
</div>
</div>
</div>
</div>
 
            {/* Compliance Breakdown */}
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Requirements</h3>
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="border-b border-gray-200">
<th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">

                        Requirement
</th>
<th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">

                        Status
</th>
<th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">

                        Due Date
</th>
<th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">

                        Completed
</th>
</tr>
</thead>
<tbody className="divide-y divide-gray-200">

                    {requirements.map((req, idx) => (
<tr key={idx} className="hover:bg-gray-50">
<td className="px-4 py-3">
<div className="flex items-center gap-2">

                            {req.required && <span className="text-red-500">*</span>}
<span className="text-sm text-gray-900">{req.name}</span>
</div>
</td>
<td className="px-4 py-3">

                          {req.status === 'complete' ? (
<span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
<CheckCircle className="w-3 h-3" />

                              Complete
</span>

                          ) : (
<span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
<XCircle className="w-3 h-3" />

                              Pending
</span>

                          )}
</td>
<td className="px-4 py-3">
<span className="text-sm text-gray-600">

                            {new Date(req.dueDate).toLocaleDateString()}
</span>
</td>
<td className="px-4 py-3">

                          {req.completedDate ? (
<span className="text-sm text-gray-900">

                              {new Date(req.completedDate).toLocaleDateString()}
</span>

                          ) : (
<span className="text-sm text-gray-400">-</span>

                          )}
</td>
</tr>

                    ))}
</tbody>
</table>
</div>
</div>
 
            {/* Documents */}
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
<div className="space-y-3">

                {documents.map((doc, idx) => (
<div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
<FileText className="w-5 h-5 text-red-600" />
</div>
<div>
<div className="font-medium text-gray-900">{doc.name}</div>
<div className="text-sm text-gray-500">

                          {doc.type} • {doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
</div>
</div>
</div>
<div className="flex items-center gap-2">
<Button variant="outline" size="sm" className="gap-2">
<Eye className="w-4 h-4" />

                        Preview
</Button>
<Button variant="outline" size="sm" className="gap-2">
<Download className="w-4 h-4" />

                        Download
</Button>
</div>
</div>

                ))}
</div>
</div>
</div>
 
          {/* Right Column - Timeline */}
<div className="space-y-6">
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Timeline</h3>
<div className="space-y-4">

                {auditTimeline.map((event, idx) => (
<div key={idx} className="flex gap-3">
<div className="flex flex-col items-center">
<div className={`w-8 h-8 rounded-full flex items-center justify-center ${

                        event.type === 'success' ? 'bg-green-100' : 'bg-blue-100'

                      }`}>

                        {event.type === 'success' ? (
<CheckCircle className="w-4 h-4 text-green-600" />

                        ) : (
<AlertTriangle className="w-4 h-4 text-blue-600" />

                        )}
</div>

                      {idx < auditTimeline.length - 1 && (
<div className="w-0.5 h-full bg-gray-200 my-1 flex-1" />

                      )}
</div>
<div className="flex-1 pb-4">
<div className="font-medium text-gray-900 text-sm">{event.action}</div>
<div className="text-xs text-gray-500 mt-1">

                        {new Date(event.date).toLocaleDateString()} • {event.user}
</div>
</div>
</div>

                ))}
</div>
</div>
</div>
</div>
</div>
</div>

  );

}

 