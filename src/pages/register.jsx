import React, { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register({ setMensaje, setAuth }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      // Loguear la respuesta del servidor
      console.log("Respuesta del servidor:", data);
      console.log("Código de respuesta del servidor:", response.status);

      if (response.status === 409) {
        setError("El correo ya está registrado.");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "No se pudo registrar el usuario.");
      }

      setMensaje("✅ Usuario registrado exitosamente. Redirigiendo...");
      setError(null);

      // Actualizar el estado de autenticación y redirigir a login
      setAuth(true); // Establecer auth como true
      localStorage.setItem("auth", "true"); // Guardar en el localStorage para persistir la sesión

      setTimeout(() => navigate("/"), 2000); // Redirigir a la página de inicio de sesión
    } catch (error) {
      setError("Error al registrar usuario. Revisa la consola.");
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Crear Cuenta
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Nombre de Usuario"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Correo Electrónico"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleRegister}
      >
        Registrarse
      </Button>
    </>
  );
}