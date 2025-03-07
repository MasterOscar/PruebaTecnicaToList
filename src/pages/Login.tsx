import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  if (!authContext) return null; // Verifica que el contexto está disponible
  const { loginUser } = authContext;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("El correo no puede estar vacío.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Ingrese un correo válido.");
      return;
    }

    try {
      await loginUser(email);
    } catch (error) {
      setError("Error al iniciar sesión. Verifique el correo.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null); // Elimina el mensaje de error al escribir
          }}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
