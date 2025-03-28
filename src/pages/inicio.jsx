import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Header from '../components/Header.jsx';
import AdminTable from '../components/table.jsx';

export default function Inicio() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //AGREGADO
  // Estado para el diálogo de registro de usuario
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  //

  //Carga de usuarios (useEffect)
  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedUsers = data.map(user => ({
          id: user.ID,
          name: user.USERNAME,
          email: user.EMAIL
        }));
        setUsers(formattedUsers);
      })
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }, []);

  //Función para iniciar la edición de un usuario
  const handleEditClick = (user) => {
    setEditUser(user);
    setNewName(user.name);
    setOldPassword("");
    setNewPassword("");
  };

  const handleSaveEdit = () => {
    const body = {};
    if (newName && newName !== editUser.name) body.username = newName;
    if (newPassword) {
      if (!oldPassword) {
        alert("Debes ingresar la contraseña actual para cambiar la nueva.");
        return;
      }
      body.password = newPassword;
      body.oldPassword = oldPassword;
    }
  
    fetch(`http://localhost:3000/users/${editUser.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json().then(data => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        if (status === 401) {
          alert("La contraseña actual no es correcta. Solo se actualizará el dato de nombre.");
          setUsers(users.map((u) => (u.id === editUser.id ? { ...u, name: newName || u.name } : u)));
          return;
        }
        if (status === 200) {
          setUsers(users.map((u) => (u.id === editUser.id ? { ...u, name: newName || u.name } : u)));
          setEditUser(null);
          alert(body.message);
        }
      })
      .catch((error) => console.error("Error al actualizar usuario:", error));
  };

  const handleDelete = (userId) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
  
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar usuario");
        }
        return res.json();
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
        alert("Usuario eliminado exitosamente.");
      })
      .catch((error) => {
        console.error("Error al eliminar usuario:", error);
        alert("No se pudo eliminar el usuario.");
      });
  };

  // Función para registrar un nuevo usuario
  const handleCreateUser = () => {
    if (!newUserName || !newUserEmail || !newUserPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const newUser = {
      username: newUserName,
      email: newUserEmail,
      password: newUserPassword
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Usuario registrado exitosamente.");
        setUsers([...users, { id: data.id, name: newUserName, email: newUserEmail }]);
        setAddUserDialog(false);
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
      })
      .catch((error) => console.error("Error al registrar usuario:", error));
  };


  return (
    <Container>
      <Header setAuth={() => {}} />
      <Typography variant="h4" sx={{ my: 4, textAlign: 'center' }}>
        Administrar usuarios
      </Typography>

      {/* Botón para abrir el diálogo de registro */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setAddUserDialog(true)}
        sx={{ mb: 2 }}
      >
        Registrar Nuevo Usuario
      </Button>

      <AdminTable users={users} onEdit={handleEditClick} onDelete={handleDelete}/>

      {/* Dialogo de edición */}
      <Dialog open={Boolean(editUser)} onClose={() => setEditUser(null)}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nuevo Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Contraseña Actual (Si deseas cambiarla)"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Nueva Contraseña"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialogo de registro de usuario */}
      <Dialog open={addUserDialog} onClose={() => setAddUserDialog(false)}>
        <DialogTitle>Registrar Nuevo Usuario</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Nombre" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} margin="dense"/>
          <TextField fullWidth label="Correo" type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} margin="dense"/>
          <TextField fullWidth label="Contraseña" type="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} margin="dense"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserDialog(false)}>Cancelar</Button>
          <Button onClick={handleCreateUser} color="primary">Registrar</Button>
        </DialogActions>
        </Dialog>
    </Container>
  );
}
