import { Award, AlertTriangle, ExternalLink } from 'lucide-react';
import { ComplianceBadge, ComplianceStatus } from '../../compliance/components/ComplianceBadge';
import { Link } from 'react-router';

interface License {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  owner: string;
  expiryDate: string;
  status: ComplianceStatus;
  issue: string;
}

interface ExpiredLicensesTableProps {
  licenses: License[];
  count: number;
  show: boolean;
}

export const ExpiredLicensesTable = ({ licenses, count, show }: ExpiredLicensesTableProps) => {
  if (!show) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Expired / Expiring Licenses</h3>
              <p className="text-sm text-gray-600">{count} items require action</p>
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
          <tbody className="divide-y text-xs divide-gray-200">
            {licenses.map((license) => (
              <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 text-sm">{license.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">{license.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{license.jurisdiction}</span>
                </td>
                <td className="px-6 py-4 font-medium">
                  <Link to={`/contractors/${license.id}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                    {license.owner}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">
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
                    <span className="text-red-700">{license.issue}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/licenses/${license.id}`}>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent gap-2 flex items-center text-xs text-gray-700 hover:bg-gray-200">
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
  );
};
