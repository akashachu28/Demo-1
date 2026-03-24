import { FileText, ArrowLeft, Loader2, FileCheck, Calendar, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { extractDocument } from "../utils/api";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

interface ProcessorState {
  file: File;
  fileName: string;
}

interface KeyValuePair {
  key: string;
  value: string;
  confidence: number;
}

interface DocumentData {
  filename: string;
  content_type: string;
  markdown: string;
  analysis: {
    document_type: string;
    key_value_pairs: KeyValuePair[];
    ocr_total_confidence: number;
  };
}

function DocumentVisualization({ data }: { data: DocumentData }) {
  const { filename, analysis } = data;
  const { document_type, key_value_pairs, ocr_total_confidence } = analysis;

  return (
    <div className="bg-white rounded-lg border -auto max-h-full">
      {/* Header Section */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <FileCheck className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{filename}</h3>
            <p className="text-sm text-gray-600">{document_type}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">OCR Confidence:</span>
            <span className={`font-medium ${ocr_total_confidence >= 0.9 ? 'text-green-600' : ocr_total_confidence >= 0.7 ? 'text-yellow-600' : 'text-red-600'}`}>
              {(ocr_total_confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Fields Extracted:</span>
            <span className="font-medium text-[#0E4665]">{key_value_pairs.length}</span>
          </div>
        </div>
      </div>

      {/* Key-Value Pairs Table */}
      <div className="p-4">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Extracted Information</h4>
        <div className="-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700 bg-gray-50">Field</th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700 bg-gray-50">Value</th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700 bg-gray-50">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {key_value_pairs.map((pair, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {getFieldIcon(pair.key)}
                      {pair.key}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-700">
                    <span className="break-words">{pair.value}</span>
                  </td>
                  <td className="py-3 px-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getConfidenceColor(pair.confidence)}`}></div>
                      <span className={`font-medium ${getConfidenceTextColor(pair.confidence)}`}>
                        {(pair.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getFieldIcon(fieldName: string) {
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
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 0.9) return 'bg-green-500';
  if (confidence >= 0.7) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getConfidenceTextColor(confidence: number) {
  if (confidence >= 0.9) return 'text-green-600';
  if (confidence >= 0.7) return 'text-yellow-600';
  return 'text-red-600';
}

function DocumentPreview({ file, fileName, fileUrl }: { file: File; fileName: string; fileUrl: string }) {
  const [viewerError, setViewerError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fileType = file.type || getFileTypeFromName(fileName);
  const isPDF = fileType === 'application/pdf';
  const isImage = fileType.startsWith('image/');

  // For PDFs, use native browser viewer by default
  if (isPDF) {
    return (
      <div className="h-full w-full relative">
        <iframe
          src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=150`}
          className="w-full h-full border-0"
          title={`PDF Preview: ${fileName}`}
          onError={() => {
            console.error('PDF iframe failed to load');
            setViewerError(true);
          }}
          style={{
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }}
        />
        {viewerError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                PDF preview not available
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Your browser may not support PDF viewing
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const url = URL.createObjectURL(file);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="block w-full px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => window.open(fileUrl, '_blank')}
                  className="block w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // For images, use native img element
  if (isImage) {
    return (
      <div className="h-fit w-full relative bg-gray-50 flex  justify-center">
        {!imageError ? (
          <img
            src={fileUrl}
            alt={fileName}
            className="max-w-full max-h-full object-contain"
            onError={() => {
              console.error('Image failed to load');
              setImageError(true);
            }}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <div className="text-center max-w-md">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">
              Image preview not available
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Failed to load image file
            </p>
            <button
              onClick={() => {
                const url = URL.createObjectURL(file);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="block w-full px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    );
  }

  // For non-PDF, non-image files, use DocViewer
  const docs = [
    {
      uri: fileUrl,
      fileName: fileName,
      fileType: fileType,
    }
  ];

  if (viewerError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Preview not available for this file type
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
          </p>
          <button
            onClick={() => {
              const url = URL.createObjectURL(file);
              const a = document.createElement('a');
              a.href = url;
              a.download = fileName;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="block w-full px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Download File
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full ">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: true,
          },
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
        onError={(error) => {
          console.error('DocViewer error:', error);
          setViewerError(true);
        }}
      />
    </div>
  );
}

// Helper function to determine file type from filename
function getFileTypeFromName(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'jpg':
      return 'image/jpeg';
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'txt':
      return 'text/plain';
    default:
      return 'application/octet-stream';
  }
}

export function DocumentProcessor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(true);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  const state = location.state as ProcessorState;

  useEffect(() => {
    if (!state?.file) {
      // Redirect back to documents if no file is provided
      navigate('/documents');
      return;
    }

    // Create object URL for file preview - only create once
    if (!fileUrl) {
      const url = URL.createObjectURL(state.file);
      setFileUrl(url);
    }
  }, [state, navigate, fileUrl]);

  useEffect(() => {
    if (!state?.file || !fileUrl) return;

    const processFile = async () => {
      try {
        setIsProcessing(true);
        const result = await extractDocument(state.file);
        console.log('Extract API response:', result);
        setResponse(result);
      } catch (err) {
        console.error('Processing failed:', err);
        setError(err instanceof Error ? err.message : 'Processing failed');
      } finally {
        setIsProcessing(false);
      }
    };

    processFile();
  }, [state?.file, fileUrl]);

  // Cleanup only on unmount
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  if (!state?.file) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-[#0E4665] px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/documents')}
            className="p-2 hover:bg-[#012542] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-white">Document Processing</h1>
            <p className="text-sm text-blue-100 mt-1">Processing and extracting document information</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-100vh">
          {/* Left Side - File Preview */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Preview</h2>
            
            <div className="h-full flex flex-col">
              {/* File Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#0E4665]" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{state.fileName}</h3>
                    <div className="text-xs text-gray-600 mt-1 space-x-4">
                      <span>Size: {(state.file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <span>Type: {state.file.type || 'Unknown'}</span>
                      <span>Modified: {new Date(state.file.lastModified).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Viewer */}
              <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
                {fileUrl ? (
                  <div className="h-full w-full">
                    <DocumentPreview 
                      file={state.file} 
                      fileName={state.fileName} 
                      fileUrl={fileUrl} 
                    />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">
                        Document preview loading...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Processing/Results */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isProcessing ? 'Processing Document...' : error ? 'Processing Error' : 'Extraction Results'}
            </h2>
            
            <div className="h-full flex flex-col">
              {isProcessing && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-[#0E4665] animate-spin" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-lg font-medium text-gray-700 mt-6 mb-2">Analyzing Document</p>
                  <p className="text-sm text-gray-500 text-center max-w-md">
                    Our AI is extracting and processing information from your document. This may take a few moments.
                  </p>
                  
                  {/* Processing steps animation */}
                  <div className="mt-8 space-y-3 w-full max-w-md">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#0E4665] rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Reading document structure...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                      <span className="text-sm text-gray-600">Extracting text content...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-700"></div>
                      <span className="text-sm text-gray-600">Analyzing data fields...</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-lg font-medium text-red-700 mb-2">Processing Failed</p>
                  <p className="text-sm text-gray-600 text-center max-w-md mb-4">{error}</p>
                  <button
                    onClick={() => navigate('/documents')}
                    className="px-4 py-2 bg-[#0E4665] text-white rounded-lg hover:bg-[#012542] transition-colors"
                  >
                    Back to Documents
                  </button>
                </div>
              )}

              {response && !isProcessing && !error && (
                <div className="flex-1 -auto">
                  <div className="bg-gray-50 rounded-lg p-4 h-full">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        Processing Complete
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowRawJson(!showRawJson)}
                          className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          {showRawJson ? 'Show Structured' : 'Show Raw JSON'}
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(response, null, 2));
                            alert('Response copied to clipboard!');
                          }}
                          className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          Copy Response
                        </button>
                      </div>
                    </div>
                    
                    {showRawJson ? (
                      <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono bg-white p-4 rounded border -auto max-h-full">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    ) : (
                      <DocumentVisualization data={response} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}