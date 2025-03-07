import { useState, useEffect, useContext } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { fetchTasks } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Task } from "../types/Task";

const Home = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null; // Asegura que el contexto está disponible

  const { token, logout } = authContext;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    refreshTasks();
  }, [token]);

  const refreshTasks = async () => {
    if (token) {
      const data = await fetchTasks(token);
      setTasks(data.data);
    }
  };

  const handleLogout = () => {
    logout(); // Cierra sesión
    navigator("/login"); // Redirige al usuario a la pantalla de login
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList tasks={tasks} refreshTasks={refreshTasks} />
    </div>
  );
};

export default Home;
