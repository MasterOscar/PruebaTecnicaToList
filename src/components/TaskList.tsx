import TaskItem from "./TaskItem";
import { Task } from "../types/Task";
import { deleteTask, updateTask } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

interface TaskListProps {
  tasks: Task[];
  refreshTasks: () => void;
}

const TaskList = ({ tasks, refreshTasks }: TaskListProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { token } = authContext;

  const handleDelete = async (id: number) => {
    if (token) {
      await deleteTask(token, id);
      refreshTasks(); // Recarga la lista después de eliminar
    }
  };

  const handleToggle = async (id: number) => {
    if (token) {
      await updateTask(token, id);
      refreshTasks(); // Recarga la lista después de actualizar
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
