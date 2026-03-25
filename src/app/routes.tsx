import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AccessControl } from "./components/AccessControl";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Licenses } from "./pages/Licenses";
import { LicenseDetail } from "./pages/LicenseDetails";
import { Contractors } from "./pages/Contractors";
import { ContractorProfile } from "./pages/ContractorProfile";
import { ContractorRegistration } from "./pages/ContractorRegistration";
import { ContractorRegistration as DummyRegistration } from "./pages/DummyRegistration";
import { Onboarding } from "./pages/Onboarding";
import { Eligibility } from "./pages/Eligibility";
import { RetainerLedger } from "./pages/RetainerLedger";
import { Renewals } from "./pages/Renewals";
import { Jurisdictions } from "./pages/Jurisdictions";
import { Credentials } from "./pages/Credentials";
import { Documents } from "./pages/Documents";
import { DocumentProcessor } from "./pages/DocumentProcessor";
import { AuditTrail } from "./pages/AuditTrail";
import { Greenfield } from "./pages/Greenfield";
import { SystemRules } from "./pages/SystemRules";
import { NotFound } from "./pages/NotFound";
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
