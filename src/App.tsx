import { JSX, useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./styles/index.css";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) return null;

  return authContext.token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;