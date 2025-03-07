import { Task } from "../types/Task";

const API_URL = "https://gsi-interviews.camiapp.net/to-do";

// 🔹 Iniciar sesión y obtener el token
export const login = async (email: string): Promise<{ data: { token: string } }> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Error en el login");
  }

  return response.json();
};

// 🔹 Obtener todas las tareas del usuario
export const fetchTasks = async (token: string): Promise<{ data: Task[] }> => {
  const response = await fetch(`${API_URL}/tasks?limit=5&order=-created_at&page=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }

  return response.json();
};

// 🔹 Crear una nueva tarea
export const createTask = async (token: string, task: { user_email: string; title: string }) => {
  const response = await fetch(`${API_URL}/tasks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }

  return response.json();
};

// 🔹 Marcar tarea como completada o desmarcarla
export const updateTask = async (token: string, taskId: number) => {
  const response = await fetch(`${API_URL}/tasks/update/${taskId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la tarea");
  }

  return response.json();
};

// 🔹 Eliminar una tarea
export const deleteTask = async (token: string, taskId: number) => {
  const response = await fetch(`${API_URL}/tasks/delete/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea");
  }

  return response.json();
};
