import { UserCheck, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

interface HighRiskContractor {
  id: string;
  name: string;
  company: string;
  riskLevel: string;
  issue: string;
  location: string;
  lastActivity: string;
}

interface HighRiskContractorsTableProps {
  contractors: HighRiskContractor[];
  count: number;
  show: boolean;
  getRiskBadge: (riskLevel: string) => JSX.Element;
}

export const HighRiskContractorsTable = ({ contractors, count, show, getRiskBadge }: HighRiskContractorsTableProps) => {
  if (!show) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">High-Risk Contractors</h3>
              <p className="text-sm text-gray-600">{count} contractors flagged for review</p>
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
          <tbody className="divide-y text-xs divide-gray-200">
            {contractors.map((contractor) => (
              <tr key={contractor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{contractor.name}</div>
                    <div className="text-xs text-gray-500">{contractor.company}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getRiskBadge(contractor.riskLevel)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-900">{contractor.issue}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-gray-900">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {contractor.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-600">{contractor.lastActivity}</span>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/contractors/${contractor.id}`}>
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
