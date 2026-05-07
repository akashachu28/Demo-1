import { Clock, Calendar, ExternalLink, XCircle } from 'lucide-react';
import { Link } from 'react-router';

interface Approval {
  id: string;
  contractorName: string;
  company: string;
  status: string;
  missingItems: string[];
  submittedDate: string;
  reviewer: string;
}

interface PendingApprovalsTableProps {
  approvals: Approval[];
  count: number;
  show: boolean;
  getStatusBadge: (status: string) => JSX.Element;
}

export const PendingApprovalsTable = ({ approvals, count, show, getStatusBadge }: PendingApprovalsTableProps) => {
  if (!show) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Contractor Pending Approvals</h3>
              <p className="text-sm text-gray-600">{count} contractors awaiting review</p>
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
          <tbody className="divide-y text-xs divide-gray-200">
            {approvals.map((approval) => (
              <tr key={approval.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{approval.contractorName}</div>
                    <div className=" text-gray-500">{approval.company}</div>
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
                        <span className=" text-gray-700">{item}</span>
                      </div>
                    ))}
                    {approval.missingItems.length > 2 && (
                      <span className="text-xs text-gray-500">+{approval.missingItems.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2  text-gray-900">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {new Date(approval.submittedDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className=" text-gray-900">{approval.reviewer}</span>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/contractors/${approval.id}`}>
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
