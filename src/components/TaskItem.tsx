import { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  return (
    <li style={{ textDecoration: task.is_completed ? "line-through" : "none" }}>
      {task.title}
      <div className="task-buttons">
        <button onClick={() => onToggle(task.id)}>
          {task.is_completed ? "Desmarcar" : "Completar"}
        </button>
        <button className="delete" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
