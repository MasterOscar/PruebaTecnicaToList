import { createContext, useState, useEffect, ReactNode } from "react";
import { login } from "../services/api";

interface AuthContextType {
  token: string;
  loginUser: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const loginUser = async (email: string) => {
    try {
      const data = await login(email);
      if (data.data.token) {
        setToken(data.data.token);
        localStorage.setItem("token", data.data.token);
      } else {
        throw new Error("Token inválido");
      }
    } catch (error) {
      throw new Error("Error en la autenticación");
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token"); // Borra el token del almacenamiento local
  };

  return <AuthContext.Provider value={{ token, loginUser, logout }}>{children}</AuthContext.Provider>;
};
