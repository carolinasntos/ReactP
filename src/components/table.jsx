import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminTable({ users, onEdit, onDelete }) {
  console.log("Usuarios recibidos:", users); // Verificar los datos de usuarios
  console.log("onEdit:", onEdit); // Verificar si la función onEdit está definida
  console.log("onDelete:", onDelete); // Verificar si la función onDelete está definida
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="admin table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => {
                    console.log(`Editar usuario: ${user.id}`);
                    onEdit(user);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    console.log(`Eliminar usuario: ${user.id}`);
                    onDelete(user.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}