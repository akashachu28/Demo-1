# Access Control Documentation

## Overview
This application implements role-based access control (RBAC) to manage user permissions and restrict access to specific pages based on user roles.

## Login Credentials

### Admin User
- **Username:** `admin`
- **Password:** `admin@123`
- **Access:** Full access to all pages and features

### Contractor User
- **Username:** `contractor`
- **Password:** `admin@123`
- **Access:** Limited to contractor-related pages only

## Access Levels

All access levels are defined in `src/app/constants/accessLevels.ts`:

### Dashboard & Reports
- `DASHBOARD` - Main compliance map dashboard
- `EXECUTIVE_REPORTS` - Executive reports page

### Operations
- `CONTRACTORS` - Contractors listing page
- `CONTRACTORS_VIEW` - View contractor profiles
- `CONTRACTORS_EDIT` - Edit contractor information
- `CONTRACTORS_REGISTER` - Register new contractors
- `ONBOARDING` - Onboarding management
- `ELIGIBILITY` - Eligibility tracking
- `RETAINER_LEDGER` - Retainer ledger management

### Compliance
- `DOCUMENTS` - Document management
- `DOCUMENT_PROCESSOR` - Document processing tools
- `RENEWALS` - License renewals
- `JURISDICTIONS` - Jurisdiction management
- `CREDENTIALS` - Credentials management
- `AUDIT_TRAIL` - Audit trail viewing

### Reporting
- `GREENFIELD` - Greenfield analytics

### System Config
- `SYSTEM_RULES` - System rules configuration

## Role Permissions

### Admin Role
Has access to ALL pages and features:
- Dashboard & Reports (all)
- Operations (all)
- Compliance (all)
- Reporting (all)
- System Config (all)

### Contractor Role
Has LIMITED access to:
- Contractors page
- Contractor profile viewing
- Contractor profile editing
- Contractor registration

## Implementation Details

### Key Files

1. **`src/app/constants/accessLevels.ts`**
   - Defines all access level constants
   - Maps roles to their access levels
   - Provides helper functions for access checking

2. **`src/app/contexts/AuthContext.tsx`**
   - Manages authentication state
   - Handles login with role assignment
   - Provides `hasAccess()` function for permission checking

3. **`src/app/components/AccessControl.tsx`**
   - Wrapper component for route protection
   - Redirects unauthorized users to appropriate pages

4. **`src/app/components/Layout.tsx`**
   - Filters sidebar navigation based on user access
   - Only shows menu items the user has permission to access

5. **`src/app/routes.tsx`**
   - Wraps each route with `AccessControl` component
   - Enforces access control at the routing level

## Adding New Roles

To add a new role:

1. Add the role to `ROLE_ACCESS` in `src/app/constants/accessLevels.ts`
2. Define which access levels the role should have
3. Add login credentials in `src/app/contexts/AuthContext.tsx`
4. The sidebar and routes will automatically update based on the access levels

## Adding New Pages

To add a new page with access control:

1. Add a new access level constant in `ACCESS_LEVELS`
2. Add the access level to appropriate roles in `ROLE_ACCESS`
3. Add the page to sidebar in `Layout.tsx` with the `accessLevel` property
4. Wrap the route in `routes.tsx` with `AccessControl` component

## Example Usage

```typescript
// Check if user has access in a component
const { hasAccess } = useAuth();

if (hasAccess(ACCESS_LEVELS.CONTRACTORS)) {
  // Show contractor-specific content
}
```

## Security Notes

- Access control is enforced at both the UI level (sidebar) and routing level
- Users without proper access are automatically redirected
- Contractors are redirected to `/contractors` when accessing unauthorized pages
- Admins are redirected to `/` (dashboard) when accessing unauthorized pages
