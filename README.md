# 📝 To-Do List App

🚀 Aplicación To-Do List creada con **React, TypeScript, Vite y una API REST**.  
💡 Permite **agregar, completar y eliminar tareas**, además de **autenticación con login**.

---

## 📂 **Índice**
- [🛠️ Tecnologías](#-tecnologías)
- [📥 Instalación](#-instalación)
- [🚀 Cómo ejecutar](#-cómo-ejecutar)
- [🛠️ Configuración](#-configuración)
- [📜 Endpoints de la API](#-endpoints-de-la-api)
- [📄 Licencia](#-licencia)

---

## 🛠️ **Tecnologías**
Este proyecto utiliza las siguientes tecnologías:
- ⚡ **Vite** (React + TypeScript)
- 🎨 **CSS** para estilos
- 🌍 **React Router** para navegación
- 🔑 **Autenticación con JWT**
- 🔗 **API REST** para gestionar tareas

---

## 📥 **Instalación**
Para clonar y ejecutar la aplicación, sigue estos pasos:

```sh
# 1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/todo-list-app.git

# 2️⃣ Entrar al directorio del proyecto
cd todo-list-app

# 3️⃣ Instalar las dependencias
npm install

🚀 Cómo ejecutar
Ejecuta el siguiente comando para iniciar la aplicación en modo desarrollo:

sh
Copiar
npm run dev
Luego, abre el navegador y ve a http://localhost:5173/ para usar la app.

🛠️ Configuración
La aplicación se conecta a una API REST. No es necesario configurar variables de entorno, ya que los endpoints están definidos en src/services/api.ts.

📜 Endpoints de la API
Método	Endpoint	Descripción
POST	/to-do/login	Iniciar sesión (obtener token)
GET	/to-do/tasks	Obtener todas las tareas
POST	/to-do/tasks/create	Crear una nueva tarea
PATCH	/to-do/tasks/update/{id}	Marcar tarea como completada o incompleta
DELETE	/to-do/tasks/delete/{id}	Eliminar una tarea
