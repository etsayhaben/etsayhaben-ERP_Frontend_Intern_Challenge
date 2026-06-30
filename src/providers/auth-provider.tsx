// src/providers/auth-Provider.tsx (update login and logout)

/*'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'hr' | null;

interface AuthContextType {
  user: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for cookies
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // ✅ Lazy initializer: read localStorage once during mount, no effect needed
  const [user, setUser] = useState<UserRole>(() => {
    if (typeof window === 'undefined') return null; // SSR safety
    const stored = localStorage.getItem('auth_user');
    if (stored === 'admin' || stored === 'hr') {
      // Sync cookie with localStorage (for middleware)
      setCookie('auth_user', stored);
      return stored;
    } else {
      deleteCookie('auth_user');
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Only for cross-tab sync (optional) – calls setState in a callback, allowed
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_user') {
        const newValue = e.newValue;
        if (newValue === 'admin' || newValue === 'hr') {
          setUser(newValue);
          setCookie('auth_user', newValue);
        } else {
          setUser(null);
          deleteCookie('auth_user');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    setLoading(false); // Initial load complete

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // ✅ No setState in the effect body, only in callback

  const login = (role: UserRole) => {
    setUser(role);
    localStorage.setItem('auth_user', role!);
    setCookie('auth_user', role!);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    deleteCookie('auth_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}*/
// src/providers/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'hr' | null;

interface AuthContextType {
  user: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // ✅ Lazy initializer: read localStorage once during render
  const [user, setUser] = useState<UserRole>(() => {
    if (typeof window === 'undefined') return null; // SSR safety
    const stored = localStorage.getItem('auth_user');
    if (stored === 'admin' || stored === 'hr') {
      setCookie('auth_user', stored);
      return stored;
    }
    deleteCookie('auth_user');
    return null;
  });

  // ✅ Effect only for cross-tab sync – no setState in the effect body
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_user') {
        const newValue = e.newValue;
        if (newValue === 'admin' || newValue === 'hr') {
          setUser(newValue);
          setCookie('auth_user', newValue);
        } else {
          setUser(null);
          deleteCookie('auth_user');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // ✅ No setState called directly here

  const login = (role: UserRole) => {
    setUser(role);
    localStorage.setItem('auth_user', role!);
    setCookie('auth_user', role!);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    deleteCookie('auth_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}