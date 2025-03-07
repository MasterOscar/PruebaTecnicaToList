import { useState, useContext } from "react";
import { createTask } from "../services/api";
import { AuthContext } from "../context/AuthContext";

interface TaskFormProps {
  refreshTasks: () => void;
}

const TaskForm = ({ refreshTasks }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const authContext = useContext(AuthContext);

  if (!authContext) return null;
  const { token, userEmail } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (!userEmail) {
      alert("Error: No hay un usuario autenticado.");
      return;
    }

    if (token) {
      await createTask(token, { user_email: userEmail, title });
    } else {
      alert("Error: No se pudo obtener el token de autenticación.");
    }
    setTitle("");
    refreshTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default TaskForm;