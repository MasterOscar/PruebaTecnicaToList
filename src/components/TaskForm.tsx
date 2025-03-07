import { useState, useContext } from "react";
import { createTask } from "../services/api";
import { AuthContext } from "../context/AuthContext";

interface TaskFormProps {
  refreshTasks: () => void;
}

const TaskForm = ({ refreshTasks }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const authContext = useContext(AuthContext);

  if (!authContext) return null; // Verifica que el contexto está disponible
  const { token } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // Evita agregar tareas vacías

    await createTask(token, { user_email: "test@gmail.com", title });
    setTitle(""); // Limpia el input después de agregar la tarea
    refreshTasks(); // Recarga la lista de tareas
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
