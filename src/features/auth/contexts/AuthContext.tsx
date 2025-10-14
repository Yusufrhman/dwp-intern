import React, { createContext, useContext, useState } from "react";
import type { User } from "../types/type";
import { getUser } from "../services/authService";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LS_KEY = "auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState<string | null>(null);

  const login = async (phone: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const fetchedUser = await getUser({ phone });

      if (!fetchedUser) {
        throw new Error("Nomor tidak terdaftar.");
      }

      if (fetchedUser.password !== password) {
        throw new Error("Password salah.");
      }

      setUser(fetchedUser);
      localStorage.setItem(LS_KEY, JSON.stringify(fetchedUser));
    } catch (err: any) {
      setError(err.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
