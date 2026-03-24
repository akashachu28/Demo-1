import { PageHeader } from "../components/PageHeader";

export function Compliance() {
  return (
    <div className="min-h-screen bg-[#fff]">
      <PageHeader 
        title="Renewals"
        subtitle="Manage license renewals and expirations"
      />
      <div className="p-8">
        <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-8 text-center">
          <p className="text-gray-400">Renewals content coming soon</p>
        </div>
      </div>
    </div>
  );
}
