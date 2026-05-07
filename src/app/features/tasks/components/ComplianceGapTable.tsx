import { MapPin } from 'lucide-react';

interface ComplianceGap {
  id: string;
  location: string;
  workType: string;
  gapCategory: string;
  issue: string;
  impact: string;
  recommendedAction: string;
}

interface ComplianceGapTableProps {
  gaps: ComplianceGap[];
  count: number;
  show: boolean;
  getImpactBadge: (impact: string) => JSX.Element;
}

export const ComplianceGapTable = ({ gaps, count, show, getImpactBadge }: ComplianceGapTableProps) => {
  if (!show) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Compliance Gap Analysis</h3>
              <p className="text-sm text-gray-600">{count} market readiness gaps identified</p>
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
          <tbody className="divide-y text-xs divide-gray-200">
            {gaps.map((gap) => (
              <tr key={gap.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{gap.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className=" text-gray-900">{gap.workType}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded ">
                    {gap.gapCategory}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className=" text-gray-900">{gap.issue}</span>
                </td>
                <td className="px-6 py-4 text-xs">
                  {getImpactBadge(gap.impact)}
                </td>
                <td className="px-6 py-4">
                  <span className=" text-blue-600 font-medium">{gap.recommendedAction}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
