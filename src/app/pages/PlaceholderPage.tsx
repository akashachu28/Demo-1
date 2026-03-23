import { useLocation } from "react-router";

export function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);
  
  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="border-b border-gray-800 bg-[#1059A9] px-8 py-6">
        <h1 className="text-2xl font-semibold text-white">{pageName}</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your {pageName.toLowerCase()} data</p>
      </div>
      <div className="p-8">
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-8 text-center">
          <p className="text-gray-400">{pageName} content coming soon</p>
        </div>
      </div>
    </div>
  );
}
