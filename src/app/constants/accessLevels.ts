// Access Level IDs for role-based access control
export const ACCESS_LEVELS = {
  // Dashboard & Reports
  DASHBOARD: 'dashboard',
  EXECUTIVE_REPORTS: 'executive_reports',
  
  // Operations
  CONTRACTORS: 'contractors',
  CONTRACTORS_VIEW: 'contractors_view',
  CONTRACTORS_EDIT: 'contractors_edit',
  CONTRACTORS_REGISTER: 'contractors_register',
  ONBOARDING: 'onboarding',
  ELIGIBILITY: 'eligibility',
  RETAINER_LEDGER: 'retainer_ledger',
  
  // Compliance
  DOCUMENTS: 'documents',
  DOCUMENT_PROCESSOR: 'document_processor',
  RENEWALS: 'renewals',
  JURISDICTIONS: 'jurisdictions',
  CREDENTIALS: 'credentials',
  AUDIT_TRAIL: 'audit_trail',
  
  // Reporting
  GREENFIELD: 'greenfield',
  
  // System Config
  SYSTEM_RULES: 'system_rules',
} as const;

export type AccessLevel = typeof ACCESS_LEVELS[keyof typeof ACCESS_LEVELS];

// Role definitions with their access levels
export const ROLE_ACCESS: Record<string, AccessLevel[]> = {
  admin: [
    // Full access to everything except CONTRACTORS_REGISTER (hidden from sidebar but accessible via route)
    ACCESS_LEVELS.DASHBOARD,
    ACCESS_LEVELS.EXECUTIVE_REPORTS,
    ACCESS_LEVELS.CONTRACTORS,
    ACCESS_LEVELS.CONTRACTORS_VIEW,
    ACCESS_LEVELS.CONTRACTORS_EDIT,
    // ACCESS_LEVELS.ONBOARDING,
    ACCESS_LEVELS.ELIGIBILITY,
    // ACCESS_LEVELS.RETAINER_LEDGER,
    // ACCESS_LEVELS.DOCUMENTS,
    // ACCESS_LEVELS.DOCUMENT_PROCESSOR,
    // ACCESS_LEVELS.RENEWALS,
    ACCESS_LEVELS.JURISDICTIONS,
    // ACCESS_LEVELS.CREDENTIALS,
    ACCESS_LEVELS.AUDIT_TRAIL,
    // ACCESS_LEVELS.GREENFIELD,
    ACCESS_LEVELS.SYSTEM_RULES,
  ],
  contractor: [
    // Limited access - only contractor registration page
    ACCESS_LEVELS.CONTRACTORS_REGISTER,
  ],
};

export type UserRole = keyof typeof ROLE_ACCESS;

// Helper function to check if a role has access to a specific level
export function hasAccess(role: UserRole, accessLevel: AccessLevel): boolean {
  return ROLE_ACCESS[role].includes(accessLevel);
}

// Helper function to get all access levels for a role
export function getAccessLevels(role: UserRole): AccessLevel[] {
  return [...ROLE_ACCESS[role]];
}
