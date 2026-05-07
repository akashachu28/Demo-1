import { Link } from 'react-router';
import { AlertTriangle, ExternalLink, Filter } from 'lucide-react';
import { ComplianceBadge, ComplianceStatus } from '../../compliance/components/ComplianceBadge';

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

interface AllLicensesTableProps {
  licenses: License[];
  show: boolean;
}

export const AllLicensesTable = ({ licenses, show }: AllLicensesTableProps) => {
  if (!show) return null;

  return (
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
            {licenses.map((license) => (
              <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-sm text-gray-900">{license.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-600">{license.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-900">{license.jurisdiction}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-900">{license.owner}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-900">
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
                          <span className="text-xs text-red-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No issues</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/licenses/${license.id}`}>
                    <button className="px-4 py-2 border text-nowrap border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent gap-2 flex items-center text-xs text-gray-700 hover:bg-gray-200">
                      View Details
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {licenses.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No licenses found matching your filters</p>
        </div>
      )}
    </div>
  );
};
