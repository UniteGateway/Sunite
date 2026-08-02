'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from './types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('Super Admin');
  const [user, setUser] = useState<UserProfile | null>({
    id: 'usr-1001',
    name: 'Vikramaditya Sharma',
    email: 'v.sharma@sunite.com',
    role: 'Super Admin',
    department: 'Executive Leadership',
    branch: 'Global Headquarters (Ahmedabad)',
    permissions: ['ALL_PERMISSIONS'],
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const login = (email: string, selectedRole: UserRole) => {
    const newUser: UserProfile = {
      id: 'usr-1002',
      name: email.split('@')[0].toUpperCase(),
      email,
      role: selectedRole,
      department: 'Enterprise Operations',
      branch: 'Regional Hub',
      permissions: ['READ', 'WRITE'],
    };
    setUser(newUser);
    setRole(selectedRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sunite_jwt_token', 'sample_jwt_token_2026');
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sunite_jwt_token');
      localStorage.removeItem('sunite_refresh_token');
    }
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        theme,
        toggleTheme,
      }}
    >
      <div className={theme === 'dark' ? 'dark bg-slate-900 text-white min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
