import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';
import { userStorage } from '@/lib/storage';
import { initializeSeedData } from '@/lib/seed-data';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, phone: string, role?: UserRole) => Promise<User>;
  isAdmin: boolean;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize seed data on first load
    initializeSeedData();
    
    // Check for existing session
    const currentUser = userStorage.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, role: UserRole): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let foundUser = userStorage.getByEmail(email);
    
    // For demo: create user if not exists
    if (!foundUser) {
      foundUser = userStorage.create({
        email,
        name: email.split('@')[0],
        role,
      });
    }
    
    if (foundUser.role !== role) {
      // Update role if different (for demo purposes)
      const users = userStorage.getAll();
      const index = users.findIndex(u => u.id === foundUser!.id);
      if (index !== -1) {
        users[index].role = role;
        localStorage.setItem('viha_users', JSON.stringify(users));
        foundUser = users[index];
      }
    }
    
    userStorage.setCurrentUser(foundUser);
    setUser(foundUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    userStorage.setCurrentUser(null);
    setUser(null);
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, role: UserRole = 'guest'): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingUser = userStorage.getByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser = userStorage.create({ name, email, phone, role });
    userStorage.setCurrentUser(newUser);
    setUser(newUser);
    return newUser;
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    register,
    isAdmin: user?.role === 'admin',
    isGuest: user?.role === 'guest',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
