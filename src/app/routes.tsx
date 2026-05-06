import { createBrowserRouter } from "react-router";
import { Layout } from "./features/layout/components/Layout";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { AccessControl } from "./features/auth/components/AccessControl";
import { Login } from "./features/auth/pages/Login";
import { Dashboard } from "./features/dashboard/pages/Dashboard";
import { Tasks } from "./features/tasks/pages/Tasks";
import { Licenses } from "./features/licenses/pages/Licenses";
import { LicenseDetail } from "./features/licenses/pages/LicenseDetails";
import { Contractors } from "./features/contractors/pages/Contractors";
import { ContractorProfile } from "./features/contractors/pages/ContractorProfile";
import { ContractorRegistration } from "./features/contractors/pages/ContractorRegistration";
import { ContractorRegistration as DummyRegistration } from "./features/contractors/pages/DummyRegistration";
import { Onboarding } from "./features/onboarding/pages/Onboarding";
import { Eligibility } from "./features/eligibility/pages/Eligibility";
import { RetainerLedger } from "./features/retainer/pages/RetainerLedger";
import { Renewals } from "./features/renewals/pages/Renewals";
import { Jurisdictions } from "./features/jurisdictions/pages/Jurisdictions";
import { Credentials } from "./features/credentials/pages/Credentials";
import { Documents } from "./features/documents/pages/Documents";
import { DocumentProcessor } from "./features/documents/pages/DocumentProcessor";
import { AuditTrail } from "./features/audit/pages/AuditTrail";
import { Greenfield } from "./features/greenfield/pages/Greenfield";
import { SystemRules } from "./features/system-rules/pages/SystemRules";
import { NotFound } from "./features/common/pages/NotFound";
import { ACCESS_LEVELS } from "./constants/accessLevels";

// Protected Layout Component
function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  );
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { 
        index: true, 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.DASHBOARD}>
            <Dashboard />
          </AccessControl>
        )
      },
      { 
        path: "tasks", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.DASHBOARD}>
            <Tasks />
          </AccessControl>
        )
      },
      { 
        path: "reports", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.EXECUTIVE_REPORTS}>
            <Licenses />
          </AccessControl>
        )
      },
      { 
        path: "licenses/:id", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.EXECUTIVE_REPORTS}>
            <LicenseDetail />
          </AccessControl>
        )
      },
      { 
        path: "contractors", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.CONTRACTORS}>
            <Contractors />
          </AccessControl>
        )
      },
      { 
        path: "contractors/:id", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.CONTRACTORS_VIEW}>
            <ContractorProfile />
          </AccessControl>
        )
      },
      { 
        path: "contractors/register", 
        element: (
          <AccessControl requiredAccess={[ACCESS_LEVELS.CONTRACTORS_REGISTER, ACCESS_LEVELS.CONTRACTORS]}>
            <ContractorRegistration />
          </AccessControl>
        )
      },
      { 
        path: "contractors/dummy-registration", 
        element: (
          <AccessControl requiredAccess={[ACCESS_LEVELS.CONTRACTORS_REGISTER, ACCESS_LEVELS.CONTRACTORS]}>
            <DummyRegistration />
          </AccessControl>
        )
      },
      { 
        path: "onboarding", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.ONBOARDING}>
            <Onboarding />
          </AccessControl>
        )
      },
      { 
        path: "eligibility", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.ELIGIBILITY}>
            <Eligibility />
          </AccessControl>
        )
      },
      { 
        path: "retainer", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.RETAINER_LEDGER}>
            <RetainerLedger />
          </AccessControl>
        )
      },
      { 
        path: "renewals", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.RENEWALS}>
            <Renewals />
          </AccessControl>
        )
      },
      { 
        path: "jurisdictions", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.JURISDICTIONS}>
            <Jurisdictions />
          </AccessControl>
        )
      },
      { 
        path: "credentials", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.CREDENTIALS}>
            <Credentials />
          </AccessControl>
        )
      },
      { 
        path: "documents", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.DOCUMENTS}>
            <Documents />
          </AccessControl>
        )
      },
      { 
        path: "documents/processor", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.DOCUMENT_PROCESSOR}>
            <DocumentProcessor />
          </AccessControl>
        )
      },
      { 
        path: "audit", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.AUDIT_TRAIL}>
            <AuditTrail />
          </AccessControl>
        )
      },
      { 
        path: "greenfield", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.GREENFIELD}>
            <Greenfield />
          </AccessControl>
        )
      },
      { 
        path: "system-rules", 
        element: (
          <AccessControl requiredAccess={ACCESS_LEVELS.SYSTEM_RULES}>
            <SystemRules />
          </AccessControl>
        )
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
