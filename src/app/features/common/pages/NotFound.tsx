import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#fff] flex flex-col items-center justify-center text-center px-4">
      <AlertCircle className="w-16 h-16 text-gray-500 mb-4" />
      <h2 className="text-3xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
