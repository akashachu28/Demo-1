import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AccessLevel, ACCESS_LEVELS } from '../constants/accessLevels';

interface AccessControlProps {
  children: ReactNode;
  requiredAccess: AccessLevel | AccessLevel[];
  redirectTo?: string;
}

export function AccessControl({ children, requiredAccess, redirectTo }: AccessControlProps) {
  const { hasAccess, isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Support both single access level and array of access levels (OR logic)
  const hasRequiredAccess = Array.isArray(requiredAccess)
    ? requiredAccess.some(level => hasAccess(level))
    : hasAccess(requiredAccess);

  if (!hasRequiredAccess) {
    // If user doesn't have access, redirect to their first available page
    // For contractors, this will be /contractors/register
    const defaultRedirect = redirectTo || (user?.role === 'contractor' ? '/contractors/register' : '/');
    return <Navigate to={defaultRedirect} replace />;
  }

  return <>{children}</>;
}
