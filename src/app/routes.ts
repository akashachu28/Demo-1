import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Licenses } from "./pages/Licenses";
import { Contractors } from "./pages/Contractors";
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
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "reports", Component: Licenses },
      { path: "contractors", Component: Contractors },
      { path: "onboarding", Component: Onboarding },
      { path: "eligibility", Component: Eligibility },
      { path: "retainer", Component: RetainerLedger },
      { path: "renewals", Component: Renewals },
      { path: "jurisdictions", Component: Jurisdictions },
      { path: "credentials", Component: Credentials },
      { path: "documents", Component: Documents },
      { path: "documents/processor", Component: DocumentProcessor },
      { path: "audit", Component: AuditTrail },
      { path: "greenfield", Component: Greenfield },
      { path: "*", Component: NotFound },
    ],
  },
]);
