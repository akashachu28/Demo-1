import { FileText, Upload, Download, Eye, CheckCircle, Clock, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

const documents = [
  { id: "1", name: "License_CA_JohnSmith.pdf", contractor: "John Smith", type: "License", size: "2.4 MB", uploaded: "Mar 20, 2026", status: "approved" },
  { id: "2", name: "Insurance_TX_SarahJohnson.pdf", contractor: "Sarah Johnson", type: "Insurance", size: "1.8 MB", uploaded: "Mar 19, 2026", status: "approved" },
  { id: "3", name: "Background_FL_MikeDavis.pdf", contractor: "Mike Davis", type: "Background Check", size: "3.2 MB", uploaded: "Mar 18, 2026", status: "review" },
  { id: "4", name: "Bond_NY_EmilyBrown.pdf", contractor: "Emily Brown", type: "Bond", size: "1.5 MB", uploaded: "Mar 17, 2026", status: "approved" },
  { id: "5", name: "License_IL_DavidWilson.pdf", contractor: "David Wilson", type: "License", size: "2.1 MB", uploaded: "Mar 16, 2026", status: "review" },
  { id: "6", name: "Insurance_WA_LisaAnderson.pdf", contractor: "Lisa Anderson", type: "Insurance", size: "1.9 MB", uploaded: "Mar 15, 2026", status: "pending" },
];

const documentsByType = [
  { type: "Professional Licenses", count: 142, pending: 8 },
  { type: "Insurance Certificates", count: 127, pending: 12 },
  { type: "Background Checks", count: 98, pending: 5 },
  { type: "Bond Documents", count: 76, pending: 3 },
  { type: "Safety Certifications", count: 54, pending: 3 },
];

export function Documents() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showUploadModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showUploadModal]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Close modal and navigate to processor page
      setShowUploadModal(false);
      navigate('/documents/processor', {
        state: {
          file: file,
          fileName: file.name
        }
      });
      
      // Reset selected file
      setSelectedFile(null);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Approved" };
      case "review":
        return { icon: Clock, color: "text-orange-600", bg: "bg-orange-100", label: "In Review" };
      case "pending":
        return { icon: AlertCircle, color: "text-[#36B0C9]", bg: "bg-blue-100", label: "Pending" };
      default:
        return { icon: FileText, color: "text-gray-600", bg: "bg-gray-100", label: "Unknown" };
    }
  };

  const kpiData = [
    {
      title: "Total Documents",
      value: "1,847",
      change: "All files",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100",
    },
    {
      title: "Pending Review",
      value: "31",
      change: "Awaiting approval",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100",
    },
    {
      title: "Approved",
      value: "1,789",
      change: "Verified documents",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100",
    },
    {
      title: "Uploaded Today",
      value: "23",
      change: "New submissions",
      icon: Upload,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Documents"
          subtitle="Manage contractor documentation"
          action={
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center text-sm gap-2 px-4 py-2 bg-[#012542] text-white rounded-lg hover:bg-[#063253] transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          }
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {kpiData.map((kpi) => (
                <Card
                  key={kpi.title}
                  className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] text-gray-700 mb-1">
                        {kpi.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-700">
                          {kpi.value}
                        </p>
                        <p className="text-xs text-gray-500">{kpi.change}</p>
                      </div>
                    </div>
                    <div
                      className={`w-12 h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Documents by Type */}
            <Card className="p-6 bg-white border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents by Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentsByType.map((doc) => (
                  <div key={doc.type} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-5 h-5 text-[#36B0C9]" />
                      <p className="text-sm font-medium text-gray-900">{doc.type}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{doc.count}</p>
                        <p className="text-xs text-gray-500">Total documents</p>
                      </div>
                      {doc.pending > 0 && (
                        <div className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                          {doc.pending} pending
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Documents */}
            <Card className="p-6 bg-white border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Document</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contractor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Size</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Uploaded</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {documents.map((doc) => {
                      const statusConfig = getStatusConfig(doc.status);
                      const StatusIcon = statusConfig.icon;
                      return (
                        <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#36B0C9]" />
                              <span className="text-sm text-gray-900 font-medium">{doc.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{doc.contractor}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{doc.type}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{doc.size}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{doc.uploaded}</td>
                          <td className="px-4 py-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                              <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                              <span className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <Eye className="w-4 h-4 text-gray-500" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <Download className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          onClick={() => setShowUploadModal(false)}
        >
          <div 
            className="bg-white rounded-lg p-8 w-full max-w-sm mx-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* X Close Button */}
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>

            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Select Document</h2>
              
              {/* File Selection */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#0E4665] transition-colors">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-sm text-gray-600 font-medium mb-2">
                    Click to select a file
                  </span>
                  <span className="text-xs text-gray-500">
                    PDF, DOC, DOCX, JPG, PNG (max 10MB)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
