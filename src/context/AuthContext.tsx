import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('coffeeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    try {
      // In a real app, you would validate with a backend
      // For demo purposes, we'll simulate a successful login if the email contains the role
      if (!email.includes(role)) {
        throw new Error(`Invalid credentials for ${role} account`);
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('coffeeUser', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    try {
      // In a real app, you would submit to a backend
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('coffeeUser', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('coffeeUser');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};