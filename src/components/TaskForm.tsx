import { useState, useContext } from "react";
import { createTask } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { isValidToken } from "../utils";

interface TaskFormProps {
  refreshTasks: () => void;
}

const TaskForm = ({ refreshTasks }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const authContext = useContext(AuthContext);

  if (!authContext) return null;
  const { token } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (!isValidToken(token)) {
      alert("Error: Token inválido. Inicia sesión nuevamente.");
      return;
    }

    if (token) {
      await createTask(token, { user_email: "test@gmail.com", title }); // Usa un email genérico o el que requiera la API
    } else {
      alert("Error: Token inválido. Inicia sesión nuevamente.");
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
