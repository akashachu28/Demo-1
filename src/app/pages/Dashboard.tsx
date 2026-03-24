import { 
  CheckCircle,
  Users,
  FileText,
  Clock,
  UserPlus,
  UserX,
  Shield,
  AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { MetricBar } from "../components/MetricBar";
import { DashboardCard } from "../components/DashboardCard";
import { CategoryCard } from "../components/CategoryCard";
import { RecentActivityDark } from "../components/RecentActivityDark";
import { ComplianceByBrand } from "../components/ComplianceByBrand";
import { checkHealth } from "../utils/api";

export function Dashboard() {
  const [healthStatus, setHealthStatus] = useState<string>("checking");

  // Check API health on component mount
  useEffect(() => {
    const performHealthCheck = async () => {
      try {
        const response = await checkHealth();
        console.log('Health check response:', response);
        setHealthStatus("healthy");
      } catch (error) {
        console.error('Health check failed:', error);
        setHealthStatus("unhealthy");
      }
    };

    performHealthCheck();
  }, []);

  const metrics = [
    { label: "STATES COMPLIANT", value: "33/36", color: "blue" as const },
    { label: "INSURANCE POLICIES", value: "7", color: "purple" as const },
    { label: "ACTIVE CONTRACTORS", value: "347", color: "blue" as const },
    { label: "INSURANCE COVERAGE", value: "98.4%", color: "green" as const },
    { label: "RENEWALS (30D)", value: "27", color: "orange" as const },
    { label: "GAPS", value: "1", color: "red" as const },
    { label: "DOCS IN REVIEW", value: "31", color: "purple" as const },
    { label: "AVG PROCESS TIME", value: "4.2 hrs", color: "blue" as const },
  ];

  const summaryCards = [
    { 
      title: "TOTAL CONTRACTORS", 
      value: "412", 
      subtitle: "All registered contractors",
      color: "purple" as const 
    },
    { 
      title: "ACTIVE", 
      value: "347", 
      subtitle: "84% of total",
      color: "green" as const 
    },
    { 
      title: "PENDING ONBOARDING", 
      value: "34", 
      subtitle: "Awaiting review",
      color: "blue" as const 
    },
    { 
      title: "SUSPENDED", 
      value: "12", 
      subtitle: "Requires attention",
      color: "red" as const 
    },
    { 
      title: "TOTAL LICENSES", 
      value: "583", 
      subtitle: "Across all contractors",
      color: "purple" as const 
    },
    { 
      title: "EXPIRING SOON", 
      value: "27", 
      subtitle: "Within 30 days",
      color: "orange" as const 
    },
    { 
      title: "DOCUMENTS IN REVIEW", 
      value: "31", 
      subtitle: "Pending processing",
      color: "purple" as const 
    },
  ];

  const categories = [
    {
      title: "Operations",
      icon: "🔵",
      color: "blue" as const,
      stats: [
        { label: "Contractors total count", value: "412" },
        { label: "Avg processing time (hrs)", value: "4.2 hrs" },
        { label: "Pending renewals", value: "27" },
      ],
      tags: ["Contractors", "Eligibility", "Renewals"],
    },
    {
      title: "Legal & Compliance",
      icon: "🟠",
      color: "orange" as const,
      stats: [
        { label: "Active compliance issues", value: "33036" },
        { label: "Renewals (30D)", value: "6" },
        { label: "Audit actions today", value: "12" },
      ],
      tags: ["Renewals", "Jurisdictions", "Audit"],
    },
    {
      title: "Commercial",
      icon: "🟢",
      color: "teal" as const,
      stats: [
        { label: "Markets active", value: "8" },
        { label: "Vendors (partial)", value: "5" },
        { label: "Extension activity", value: "12" },
      ],
      tags: ["Expansion", "Revenue"],
    },
    {
      title: "Technology",
      icon: "🔵",
      color: "purple" as const,
      stats: [
        { label: "AI automations", value: "47" },
        { label: "Docs processed today", value: "31" },
        { label: "Avg compliance", value: "98%" },
      ],
      tags: ["Automation", "Machine"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-[#0E4665] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">National Compliance Dashboard</h1>
            <p className="text-sm text-blue-100 mt-1">Every leader's home screen — all brands, all states, complete visibility</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              healthStatus === "healthy" ? "bg-green-400" : 
              healthStatus === "unhealthy" ? "bg-red-400" : "bg-yellow-400"
            }`}></div>
            <span className="text-sm text-blue-100">
              API {healthStatus === "healthy" ? "Connected" : healthStatus === "unhealthy" ? "Disconnected" : "Checking..."}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Metrics Bar */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <MetricBar metrics={metrics} />
        </div>
       

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <DashboardCard key={card.title} {...card} />
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivityDark />
          <ComplianceByBrand />
        </div>
      </div>
    </div>
  );
}
