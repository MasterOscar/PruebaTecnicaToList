import { createContext, useState, useEffect, ReactNode } from "react";
import { login } from "../services/api";
import { isValidToken } from "../utils";

interface AuthContextType {
  token: string | null;
  loginUser: (email: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    if (isValidToken(token)) {
      localStorage.setItem("token", token!);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const loginUser = async (email: string): Promise<boolean> => {
    try {
      const data = await login(email);
      if (data.data && isValidToken(data.data.token)) {
        setToken(data.data.token);
        return true; // Solo se guarda el token si es válido
      } else {
        return false; // Si la API no devuelve un token válido, el login falla
      }
    } catch (error) {
      return false; // Si hay un error en la API, el login falla
    }
  };

  const logout = () => {
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, loginUser, logout }}>{children}</AuthContext.Provider>;
};
