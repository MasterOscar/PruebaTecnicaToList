import { createContext, useState, useEffect, ReactNode } from "react";
import { login } from "../services/api";

interface AuthContextType {
  token: string | null;
  userEmail: string | null;
  loginUser: (email: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem("userEmail"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    }
  }, [token, userEmail]);

  const loginUser = async (email: string): Promise<boolean> => {
    try {
      const data = await login(email);

      if (data.data && data.data.token) {
        setToken(data.data.token);
        setUserEmail(email); // Guarda el email del usuario autenticado
        return true;
      } else {
        return false; // Si la API no devuelve un token válido, el login falla
      }
    } catch (error) {
      return false; // Si hay un error en la API, el login falla
    }
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};