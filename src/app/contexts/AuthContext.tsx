import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, AccessLevel, getAccessLevels } from '../constants/accessLevels';

interface User {
  email: string;
  name: string;
  role: UserRole;
  accessLevels: AccessLevel[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasAccess: (accessLevel: AccessLevel) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        
        // Validate that the user has the required properties
        if (parsedUser && parsedUser.role && parsedUser.accessLevels) {
          setUser(parsedUser);
        } else {
          // Old user data format - clear it
          console.warn('Outdated user data format, clearing session');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Dummy authentication - replace with real API call
    let userData: User | null = null;

    if (email === 'admin' && password === 'admin@123') {
      userData = {
        email: 'admin@renuity.com',
        name: 'Administrator',
        role: 'admin',
        accessLevels: getAccessLevels('admin'),
      };
    } else if (email === 'contractor' && password === 'admin@123') {
      userData = {
        email: 'contractor@renuity.com',
        name: 'Contractor User',
        role: 'contractor',
        accessLevels: getAccessLevels('contractor'),
      };
    }

    if (userData) {
      // Generate a dummy token
      const token = btoa(`${email}:${Date.now()}`);
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const hasAccess = (accessLevel: AccessLevel): boolean => {
    if (!user || !user.accessLevels) return false;
    return user.accessLevels.includes(accessLevel);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    hasAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};