import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  User, 
  Briefcase, 
  Star, 
  FileText, 
  Shield,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Upload,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  Loader2,
  FileCheck,
  Calendar,
  Building,
  Edit2,
  Save,
  ThumbsUp
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { extractDocument } from "../utils/api";
import dummyDocImage from "../assets/dummyData.jpg";

type TabType = "general" | "professional" | "experience" | "documents" | "disclosure" | "approve";

interface DocumentUpload {
  file: File | null;
  isProcessing: boolean;
  isExpanded: boolean;
  extractedData: any | null;
  error: string | null;
  isEditing: boolean;
  editedValues: Record<string, string>;
}

interface KeyValuePair {
  key: string;
  value: string;
  confidence: number;
}

export function ContractorRegistration() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [completedTabs, setCompletedTabs] = useState<TabType[]>([]);
  const [approvalComment, setApprovalComment] = useState("");

  // Form state with dummy data
  const [formData, setFormData] = useState({
    // General Info
    firstName: "John",
    lastName: "Anderson",
    email: "john.anderson@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    ssn: "***-**-****",
    dateOfBirth: "1985-03-15",
    
    // Professional Info
    contractorType: "Electrician",
    primarySkill: "Electrical Work",
    secondarySkills: ["Commercial Construction", "Residential Construction"],
    yearsOfExperience: "12",
    licenseNumber: "CA-EL-45678",
    licenseState: "CA",
    licenseExpiry: "2026-12-31",
    
    // Experience
    pastProjects: [
      {
        company: "BuildRight Construction",
        role: "Lead Electrician",
        duration: "18 months",
        description: "Managed electrical installations for a 50-unit residential complex. Coordinated with team of 5 electricians and ensured all work met code requirements."
      },
      {
        company: "Metro Commercial Services",
        role: "Senior Electrician",
        duration: "2 years",
        description: "Handled commercial electrical systems for office buildings and retail spaces. Specialized in energy-efficient lighting solutions."
      }
    ] as Array<{company: string; role: string; duration: string; description: string}>,
    references: [
      {
        name: "Michael Roberts",
        company: "BuildRight Construction",
        phone: "(555) 123-4567",
        email: "m.roberts@buildright.com"
      },
      {
        name: "Sarah Chen",
        company: "Metro Commercial Services",
        phone: "(555) 987-6543",
        email: "sarah.chen@metrocommercial.com"
      }
    ] as Array<{name: string; company: string; phone: string; email: string}>,
    
    // Documents
    uploadedDocs: [] as Array<{name: string; type: string; size: string}>,
    
    // Disclosure
    backgroundCheckConsent: true,
    drugTestConsent: true,
    accuracyAffirmation: true,
    termsAccepted: true,
    hasConvictions: false,
    hasWorkersComp: true,
  });

  const tabs = [
    { id: "general" as TabType, label: "General Info", icon: User },
    { id: "professional" as TabType, label: "Professional Info", icon: Briefcase },
    { id: "experience" as TabType, label: "Experience", icon: Star },
    { id: "documents" as TabType, label: "Documents", icon: FileText },
    { id: "disclosure" as TabType, label: "Disclosure", icon: Shield },
    { id: "approve" as TabType, label: "Approve", icon: ThumbsUp },
  ];

  const contractorTypes = [
    "General Contractor",
    "Electrician",
    "Plumber",
    "HVAC Technician",
    "Carpenter",
    "Painter",
    "Roofer",
    "Mason",
    "Other",
  ];

  const skillSets = [
    "Residential Construction",
    "Commercial Construction",
    "Electrical Work",
    "Plumbing",
    "HVAC Installation",
    "Carpentry",
    "Roofing",
    "Painting",
    "Flooring",
    "Drywall",
    "Masonry",
    "Landscaping",
  ];

  const documentTypes = [
    { type: "coi", label: "Certificate of Insurance (COI)", required: true },
    { type: "safety", label: "Safety Insurance Certificate", required: true },
    { type: "license", label: "Professional License", required: true },
    { type: "w9", label: "W-9 Form", required: true },
    { type: "bond", label: "Surety Bond", required: false },
    { type: "other", label: "Other Documents", required: false },
  ];

  // Document upload state with dummy data
  const [documentUploads, setDocumentUploads] = useState<Record<string, DocumentUpload>>({
    coi: {
      file: new File(["dummy"], "certificate_of_insurance.pdf", { type: "application/pdf" }),
      isProcessing: false,
      isExpanded: false,
      extractedData: {
        analysis: {
          document_type: "Certificate of Insurance",
          ocr_total_confidence: 0.94,
          key_value_pairs: [
            { key: "Policy Number", value: "COI-2024-789456", confidence: 0.96 },
            { key: "Insurance Company", value: "SafeGuard Insurance Co.", confidence: 0.98 },
            { key: "Effective Date", value: "01/15/2024", confidence: 0.95 },
            { key: "Expiration Date", value: "01/15/2025", confidence: 0.94 },
            { key: "Coverage Amount", value: "$2,000,000", confidence: 0.92 },
            { key: "Certificate Holder", value: "John Anderson", confidence: 0.97 }
          ]
        }
      },
      error: null,
      isEditing: false,
      editedValues: {},
    },
    safety: {
      file: new File(["dummy"], "safety_insurance.pdf", { type: "application/pdf" }),
      isProcessing: false,
      isExpanded: false,
      extractedData: {
        analysis: {
          document_type: "Safety Insurance Certificate",
          ocr_total_confidence: 0.91,
          key_value_pairs: [
            { key: "Certificate Number", value: "SI-2024-456123", confidence: 0.93 },
            { key: "Issuing Authority", value: "National Safety Council", confidence: 0.95 },
            { key: "Issue Date", value: "02/10/2024", confidence: 0.92 },
            { key: "Expiration Date", value: "02/10/2025", confidence: 0.91 },
            { key: "Coverage Type", value: "Workers Compensation", confidence: 0.89 }
          ]
        }
      },
      error: null,
      isEditing: false,
      editedValues: {},
    },
    license: {
      file: new File(["dummy"], "professional_license.pdf", { type: "application/pdf" }),
      isProcessing: false,
      isExpanded: false,
      extractedData: {
        analysis: {
          document_type: "Professional License",
          ocr_total_confidence: 0.96,
          key_value_pairs: [
            { key: "License Number", value: "CA-EL-45678", confidence: 0.98 },
            { key: "License Type", value: "Electrical Contractor", confidence: 0.97 },
            { key: "Licensee Name", value: "John Anderson", confidence: 0.99 },
            { key: "Issue Date", value: "03/20/2019", confidence: 0.95 },
            { key: "Expiration Date", value: "12/31/2026", confidence: 0.96 },
            { key: "Issuing State", value: "California", confidence: 0.98 },
            { key: "License Status", value: "Active", confidence: 0.94 }
          ]
        }
      },
      error: null,
      isEditing: false,
      editedValues: {},
    },
    w9: {
      file: new File(["dummy"], "w9_form.pdf", { type: "application/pdf" }),
      isProcessing: false,
      isExpanded: false,
      extractedData: {
        analysis: {
          document_type: "W-9 Form",
          ocr_total_confidence: 0.88,
          key_value_pairs: [
            { key: "Name", value: "John Anderson", confidence: 0.92 },
            { key: "Business Name", value: "Anderson Electrical Services", confidence: 0.89 },
            { key: "Tax Classification", value: "Individual/Sole Proprietor", confidence: 0.85 },
            { key: "Address", value: "456 Oak Avenue, San Francisco, CA 94102", confidence: 0.87 },
            { key: "TIN Type", value: "SSN", confidence: 0.90 },
            { key: "Date Signed", value: "01/05/2024", confidence: 0.88 }
          ]
        }
      },
      error: null,
      isEditing: false,
      editedValues: {},
    },
    bond: {
      file: null,
      isProcessing: false,
      isExpanded: false,
      extractedData: null,
      error: null,
      isEditing: false,
      editedValues: {},
    },
    other: {
      file: null,
      isProcessing: false,
      isExpanded: false,
      extractedData: null,
      error: null,
      isEditing: false,
      editedValues: {},
    }
  });

  const handleNext = () => {
    if (!completedTabs.includes(activeTab)) {
      setCompletedTabs([...completedTabs, activeTab]);
    }
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const addProject = () => {
    setFormData({
      ...formData,
      pastProjects: [...formData.pastProjects, { company: "", role: "", duration: "", description: "" }]
    });
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      pastProjects: formData.pastProjects.filter((_, i) => i !== index)
    });
  };

  const addReference = () => {
    setFormData({
      ...formData,
      references: [...formData.references, { name: "", company: "", phone: "", email: "" }]
    });
  };

  const removeReference = (index: number) => {
    setFormData({
      ...formData,
      references: formData.references.filter((_, i) => i !== index)
    });
  };

  const handleFileUpload = async (docType: string, file: File) => {
    setDocumentUploads(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        file,
        isProcessing: true,
        error: null,
      }
    }));

    try {
      const result = await extractDocument(file);
      
      // Initialize edited values with extracted values
      const initialEditedValues: Record<string, string> = {};
      if (result.analysis?.key_value_pairs) {
        result.analysis.key_value_pairs.forEach((pair: KeyValuePair) => {
          initialEditedValues[pair.key] = pair.value;
        });
      }
      
      setDocumentUploads(prev => ({
        ...prev,
        [docType]: {
          ...prev[docType],
          isProcessing: false,
          extractedData: result,
          editedValues: initialEditedValues,
        }
      }));
    } catch (err) {
      setDocumentUploads(prev => ({
        ...prev,
        [docType]: {
          ...prev[docType],
          isProcessing: false,
          error: err instanceof Error ? err.message : 'Processing failed',
        }
      }));
    }
  };

  const toggleEditing = (docType: string) => {
    setDocumentUploads(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        isEditing: !prev[docType].isEditing,
      }
    }));
  };

  const updateEditedValue = (docType: string, key: string, value: string) => {
    setDocumentUploads(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        editedValues: {
          ...prev[docType].editedValues,
          [key]: value,
        }
      }
    }));
  };

  const toggleExpanded = (docType: string) => {
    setDocumentUploads(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        isExpanded: !prev[docType].isExpanded,
      }
    }));
  };

  const removeDocument = (docType: string) => {
    setDocumentUploads(prev => ({
      ...prev,
      [docType]: {
        file: null,
        isProcessing: false,
        isExpanded: false,
        extractedData: null,
        error: null,
        isEditing: false,
        editedValues: {},
      }
    }));
  };

  const getFieldIcon = (fieldName: string) => {
    const field = fieldName.toLowerCase();
    if (field.includes('date') || field.includes('expire') || field.includes('issue')) {
      return <Calendar className="w-4 h-4 text-blue-500" />;
    }
    if (field.includes('company') || field.includes('name') || field.includes('authority')) {
      return <Building className="w-4 h-4 text-purple-500" />;
    }
    if (field.includes('license') || field.includes('certificate') || field.includes('number')) {
      return <FileCheck className="w-4 h-4 text-green-500" />;
    }
    return <FileText className="w-4 h-4 text-gray-400" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceTextColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <PageHeader 
        title="Contractor Registration"
        subtitle="Complete all required information to register as a contractor"
      />

      {/* Breadcrumb */}
      {/* <div className="bg-white border-b border-gray-200 px-8 py-3 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate('/contractors')} className="hover:text-gray-900 transition-colors">
            Contractors
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">New Registration</span>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto p-8">
        {/* Progress Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isCompleted = completedTabs.includes(tab.id);
              
              return (
                <div key={tab.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? "bg-[#36b0c9] text-gray-200 shadow-sm" 
                        : isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? "bg-[#0E4665]" : isCompleted ? "bg-green-600" : "bg-gray-200"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs opacity-75">Step {index + 1}</p>
                      <p className="text-sm font-medium">{tab.label}</p>
                    </div>
                  </button>
                  {index < tabs.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gray-600 mx-2 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          {/* General Info Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">General Information</h2>
                <p className="text-sm text-gray-600">Please provide your basic personal information</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                  >
                    <option value="">Select state</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                    <option value="IL">Illinois</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="12345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Security Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ssn}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="XXX-XX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Professional Info Tab */}
          {activeTab === "professional" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Information</h2>
                <p className="text-sm text-gray-600">Tell us about your professional qualifications</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contractor Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.contractorType}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                  >
                    <option value="">Select type</option>
                    {contractorTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Skill <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.primarySkill}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                  >
                    <option value="">Select skill</option>
                    {skillSets.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Skills
                  </label>
                  <select
                    multiple
                    value={formData.secondarySkills}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed h-32"
                  >
                    {skillSets.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Selected: {formData.secondarySkills.join(', ')}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                    placeholder="CA-12345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.licenseState}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                  >
                    <option value="">Select state</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                    <option value="IL">Illinois</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.licenseExpiry}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Work Experience</h2>
                <p className="text-sm text-gray-600">Provide details about your past work and references</p>
              </div>

              {/* Past Projects */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700">Past Projects</label>
                </div>

                <div className="space-y-4">
                  {formData.pastProjects.map((project, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-900">Project {index + 1}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Company/Client</label>
                          <input
                            type="text"
                            value={project.company}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            placeholder="Company name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Role</label>
                          <input
                            type="text"
                            value={project.role}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            placeholder="Your role"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Duration</label>
                          <input
                            type="text"
                            value={project.duration}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            placeholder="e.g., 6 months"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-600 mb-1">Description</label>
                          <textarea
                            value={project.description}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            rows={3}
                            placeholder="Describe your work on this project"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {formData.pastProjects.length === 0 && (
                    <div className="text-center py-8 bg-white border border-gray-300 rounded-lg">
                      <p className="text-gray-500 text-sm">No projects added yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* References */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700">Professional References</label>
                </div>

                <div className="space-y-4">
                  {formData.references.map((reference, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-900">Reference {index + 1}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Name</label>
                          <input
                            type="text"
                            value={reference.name}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            placeholder="Reference name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Company</label>
                          <input
                            type="text"
                            value={reference.company}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            placeholder="Company name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={reference.phone}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Email</label>
                          <input
                            type="email"
                            value={reference.email}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm cursor-not-allowed"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {formData.references.length === 0 && (
                    <div className="text-center py-8 bg-white border border-gray-300 rounded-lg">
                      <p className="text-gray-500 text-sm">No references added yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Required Documents</h2>
                <p className="text-sm text-gray-600">Upload all required documentation</p>
              </div>

              <div className="space-y-4">
                {documentTypes.map((doc) => {
                  const upload = documentUploads[doc.type];
                  const hasFile = upload.file !== null;
                  
                  return (
                    <div key={doc.type} className="bg-white border border-gray-300 rounded-lg">
                      {/* Header Section */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900">{doc.label}</h4>
                              {doc.required && !hasFile && <span className="text-red-500 text-xs">*Required</span>}
                            </div>
                            <p className="text-xs text-gray-500">
                              Accepted formats: PDF, JPG, PNG (Max 10MB)
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Status Badge */}
                            {hasFile && (
                              <>
                                {upload.isProcessing && (
                                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Processing
                                  </span>
                                )}
                                {!upload.isProcessing && upload.extractedData && (
                                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Confidence
                                    {upload.extractedData.analysis?.ocr_total_confidence && (
                                      <span className="ml-1 font-medium">
                                        ({(upload.extractedData.analysis.ocr_total_confidence * 100).toFixed(0)}%)
                                      </span>
                                    )}
                                  </span>
                                )}
                                {!upload.isProcessing && upload.error && (
                                  <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700">
                                    Error
                                  </span>
                                )}
                              </>
                            )}
                            {!hasFile && (
                              <span className={`px-2 py-1 rounded text-xs ${
                                doc.required ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                              }`}>
                                {doc.required ? "Required" : "Optional"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Upload Area or File Info */}
                        {!hasFile ? (
                          <label className="relative block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                              Click to upload or drag and drop
                            </p>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(doc.type, file);
                                }
                                e.target.value = ''; // Reset input
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </label>
                        ) : (
                          <div className="space-y-3">
                            {/* File Info Header with Collapse Button */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3 flex-1">
                                <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-900 font-medium truncate">{upload.file?.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {upload.file && `${(upload.file.size / (1024 * 1024)).toFixed(2)} MB • ${upload.file.type || 'Unknown type'}`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleExpanded(doc.type)}
                                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                                  title={upload.isExpanded ? "Collapse" : "Expand"}
                                >
                                  {upload.isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-gray-600" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                  )}
                                </button>
                                <button
                                  onClick={() => removeDocument(doc.type)}
                                  className="p-2 hover:bg-red-100 rounded text-red-500 transition-colors"
                                  title="Remove"
                                  disabled={upload.isProcessing}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Processing Indicator */}
                            {upload.isProcessing && (
                              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-blue-900">Processing document...</p>
                                  <p className="text-xs text-blue-700">Extracting information from your document</p>
                                </div>
                              </div>
                            )}

                            {/* Error Display */}
                            {upload.error && !upload.isProcessing && (
                              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                <p className="text-sm font-medium text-red-900 mb-1">Processing Failed</p>
                                <p className="text-xs text-red-700">{upload.error}</p>
                              </div>
                            )}

                            {/* Collapsible Content - Document Preview and Extracted Data Side by Side */}
                            {upload.isExpanded && upload.file && (
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Left Side - Document Preview */}
                                <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                  <div className="p-2 bg-gray-100 border-b border-gray-300">
                                    <p className="text-xs font-medium text-gray-700">Document Preview</p>
                                  </div>
                                  <div className="p-4 max-h-96 overflow-auto">
                                    <img
                                      src={dummyDocImage}
                                      alt={`Preview: ${upload.file.name}`}
                                      className="max-w-full h-auto mx-auto"
                                    />
                                  </div>
                                </div>

                                {/* Right Side - Extracted Data */}
                                <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                  <div className="p-2 bg-gray-100 border-b border-gray-300 flex items-center justify-between">
                                    <p className="text-xs font-medium text-gray-700">Extracted Information</p>
                                    {upload.extractedData && !upload.isProcessing && (
                                      <button
                                        onClick={() => toggleEditing(doc.type)}
                                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                        title={upload.isEditing ? "Save changes" : "Edit values"}
                                      >
                                        {upload.isEditing ? (
                                          <>
                                            <Save className="w-3 h-3" />
                                            Save
                                          </>
                                        ) : (
                                          <>
                                            <Edit2 className="w-3 h-3" />
                                            Edit
                                          </>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                  <div className="p-4 max-h-96 overflow-auto">
                                    {upload.extractedData && !upload.isProcessing ? (
                                      <div className="space-y-3">
                                        {/* Document Info */}
                                        <div className="flex items-center gap-4 text-xs text-gray-600 pb-3 border-b border-gray-300">
                                          <span>
                                            Type: <span className="font-medium text-gray-900">{upload.extractedData.analysis?.document_type || 'Unknown'}</span>
                                          </span>
                                          <span>
                                            Confidence: <span className={`font-medium ${
                                              (upload.extractedData.analysis?.ocr_total_confidence || 0) >= 0.9 ? 'text-green-600' :
                                              (upload.extractedData.analysis?.ocr_total_confidence || 0) >= 0.7 ? 'text-yellow-600' :
                                              'text-red-600'
                                            }`}>
                                              {((upload.extractedData.analysis?.ocr_total_confidence || 0) * 100).toFixed(1)}%
                                            </span>
                                          </span>
                                        </div>

                                        {/* Key-Value Pairs */}
                                        {upload.extractedData.analysis?.key_value_pairs && upload.extractedData.analysis.key_value_pairs.length > 0 ? (
                                          <div className="space-y-2">
                                            {upload.extractedData.analysis.key_value_pairs.map((pair: KeyValuePair, index: number) => (
                                              <div key={index} className="bg-white rounded p-2 border border-gray-200">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                  <div className="flex items-center gap-2 flex-1">
                                                    {getFieldIcon(pair.key)}
                                                    <span className="text-xs font-medium text-gray-900">{pair.key}</span>
                                                  </div>
                                                  <div className="flex items-center gap-1">
                                                    <div className={`w-2 h-2 rounded-full ${getConfidenceColor(pair.confidence)}`}></div>
                                                    <span className={`text-xs font-medium ${getConfidenceTextColor(pair.confidence)}`}>
                                                      {(pair.confidence * 100).toFixed(0)}%
                                                    </span>
                                                  </div>
                                                </div>
                                                {upload.isEditing ? (
                                                  <input
                                                    type="text"
                                                    value={upload.editedValues[pair.key] || pair.value}
                                                    onChange={(e) => updateEditedValue(doc.type, pair.key, e.target.value)}
                                                    className="w-full text-xs text-gray-900 border border-gray-300 rounded px-2 py-1 pl-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                  />
                                                ) : (
                                                  <p className="text-xs text-gray-700 break-words pl-6">
                                                    {upload.editedValues[pair.key] || pair.value}
                                                  </p>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-xs text-gray-500 text-center py-8">No data extracted</p>
                                        )}
                                      </div>
                                    ) : upload.isProcessing ? (
                                      <div className="flex flex-col items-center justify-center py-8">
                                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                                        <p className="text-xs text-gray-600">Processing...</p>
                                      </div>
                                    ) : (
                                      <div className="text-center py-8">
                                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-xs text-gray-500">No extraction data available</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Disclosure Tab */}
          {activeTab === "disclosure" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Disclosure & Affidavit</h2>
                <p className="text-sm text-gray-600">Please review and accept the following disclosures</p>
              </div>

              <div className="space-y-4">
                {/* Background Check */}
                <div className="bg-white border border-gray-300 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Background Check Authorization</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    I authorize the company to conduct a comprehensive background check, which may include criminal history, employment verification, and reference checks. I understand that any false information may result in immediate disqualification.
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.backgroundCheckConsent}
                      disabled
                      className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to a background check <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                {/* Drug Testing */}
                <div className="bg-white border border-gray-300 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Drug Testing Policy</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    I understand that I may be subject to drug testing as a condition of employment and agree to comply with the company's drug-free workplace policy.
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.drugTestConsent}
                      disabled
                      className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to drug testing <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                {/* Criminal History */}
                <div className="bg-white border border-gray-300 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Criminal History Disclosure</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Have you ever been convicted of a felony or misdemeanor (excluding minor traffic violations)?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="convictions"
                        checked={formData.hasConvictions === false}
                        disabled
                        className="w-4 h-4 border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="convictions"
                        checked={formData.hasConvictions === true}
                        disabled
                        className="w-4 h-4 border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                      />
                      <span className="text-sm text-gray-700">Yes (Please provide details below)</span>
                    </label>
                  </div>
                  {formData.hasConvictions && (
                    <textarea
                      className="w-full mt-3 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Please provide details about the conviction(s)"
                    />
                  )}
                </div>

                {/* Workers Compensation */}
                <div className="bg-white border border-gray-300 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Workers' Compensation Insurance</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Do you currently have your own workers' compensation insurance?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="workersComp"
                        checked={formData.hasWorkersComp === true}
                        disabled
                        className="w-4 h-4 border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="workersComp"
                        checked={formData.hasWorkersComp === false}
                        disabled
                        className="w-4 h-4 border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {/* Affirmation */}
                <div className="bg-white border border-gray-300 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Affirmation of Accuracy</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    I hereby affirm that all information provided in this application is true, complete, and accurate to the best of my knowledge. I understand that any misrepresentation or omission of facts may result in rejection of this application or immediate termination of engagement.
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.accuracyAffirmation}
                      disabled
                      className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                    />
                    <span className="text-sm text-gray-700">
                      I affirm that all information is accurate and complete <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-white border border-gray-300 rounded-lg p-5">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Terms and Conditions</h4>
                  <div className="bg-gray-50 border border-gray-300 rounded p-4 max-h-48 overflow-y-auto mb-4">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      By submitting this registration, you agree to be bound by the following terms and conditions:
                      <br /><br />
                      1. Independent Contractor Status: You acknowledge that you are registering as an independent contractor (1099) and not as an employee.
                      <br /><br />
                      2. Tax Responsibilities: You understand that you are responsible for all applicable taxes, including self-employment tax.
                      <br /><br />
                      3. Insurance Requirements: You agree to maintain all required insurance coverage and provide proof of such coverage.
                      <br /><br />
                      4. Compliance: You agree to comply with all applicable federal, state, and local laws and regulations.
                      <br /><br />
                      5. Right to Audit: The company reserves the right to audit your credentials and documentation at any time.
                    </p>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      disabled
                      className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 text-blue-600 cursor-not-allowed"
                    />
                    <span className="text-sm text-gray-700">
                      I have read and agree to the terms and conditions <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Approve Tab */}
          {activeTab === "approve" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Approval Decision</h2>
                <p className="text-sm text-gray-600">Review the contractor registration and provide your decision</p>
              </div>

              <div className="space-y-4">
                {/* Comment Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments / Notes
                  </label>
                  <textarea
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={6}
                    placeholder="Add any comments or notes about this contractor registration..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      console.log('Approve clicked');
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  
                  <button
                    onClick={() => {
                      console.log('Marannoyi clicked');
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Request more info
                  </button>
                  
                  <button
                    onClick={() => {
                      console.log('Reject clicked');
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={`flex items-center ${activeTab === "general" ? "justify-end" : "justify-between"} pt-6 border-t border-gray-300 mt-8`}>
            {activeTab !== "general" && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}

            {activeTab === "approve" ? (
              <button
                onClick={() => {
                  console.log('Finish clicked');
                  navigate('/contractors');
                }}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Finish
              </button>
            ) : activeTab === "disclosure" ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
