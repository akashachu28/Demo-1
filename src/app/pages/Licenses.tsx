import { PageHeader } from "../components/PageHeader";

export function Licenses() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Executive Reports"
        subtitle="Comprehensive licensing and compliance reports"
      />

      <div className="p-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600">Executive reporting features will be available soon.</p>
        </div>
      </div>
    </div>
  );
}