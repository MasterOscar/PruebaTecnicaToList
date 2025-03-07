import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./styles/index.css";

const AppContent = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) return null; // Verifica que el contexto está disponible

  const { token } = authContext;

  return (
    <div className="container">
      {token ? <Home /> : <Login />} {/* Muestra Login si no hay token */}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
