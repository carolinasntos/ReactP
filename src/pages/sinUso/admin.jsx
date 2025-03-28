import React, { useState, useEffect } from "react";
import AdminTable from "./table.jsx";

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  // 🔄 Obtener la lista de usuarios al cargar la página
  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔐 Enviar token JWT
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }, []);

  // 📝 Función para editar usuario (PUT)
  const handleEdit = (user) => {
    const newName = prompt("Nuevo nombre:", user.name);
    if (!newName) return;

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔐 Enviar token JWT
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
      })
      .catch((error) => console.error("Error al actualizar usuario:", error));
  };

  // ❌ Función para eliminar usuario (DELETE)
  const handleDelete = (userId) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔐 Enviar token JWT
      },
    })
      .then((res) => {
        if (res.ok) {
          setUsers(users.filter((user) => user.id !== userId));
        } else {
          throw new Error("Error al eliminar usuario");
        }
      })
      .catch((error) => console.error("Error al eliminar usuario:", error));
  };

  return <AdminTable users={users} onEdit={handleEdit} onDelete={handleDelete} />;
}