import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) return null;
  const { loginUser } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginSuccess = await loginUser(email);
    if (loginSuccess) {
      navigate("/"); // Redirige a Home si el login fue exitoso
    } else {
      setError("No se pudo iniciar sesión. La API no devolvió un token válido.");
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
            setError(null);
          }}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;