import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Stack, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Register from './Register'; // Importamos el componente Register

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function CredentialsSignInPage({ setAuth }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(null); 
  const [showRegister, setShowRegister] = useState(false);  // Controla la vista de registro y login

  const handleLogin = async (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", data.token);
        setAuth(true);
        navigate("/dashboard");
      } else {
        setMensaje("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);  // Mostrar error en consola para depuración
    
      // Si el error tiene un mensaje, mostrarlo; si no, mostrar un mensaje genérico
      setMensaje(error.message || 'Error al conectar con la API.');
    }
  };

  const handleRegister = async () => {
    console.log("🔍 Se ejecutó handleRegister");
  
    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios.");
      console.log("Campos vacíos. No se envía la solicitud.");
      return;
    }
  
    console.log("Enviando datos al backend (POST a /users):", { username, email, password });
  
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
  
      console.log("Respuesta recibida del backend (sin procesar aún):", response);
  
      const data = await response.json();
      console.log("Respuesta JSON del backend:", data);
  
      if (response.status === 409) {
        setError("El correo ya está registrado.");
        return;
      }
  
      if (!response.ok) {
        throw new Error(data.message || "No se pudo registrar el usuario.");
      }
  
      setMensaje("Usuario registrado exitosamente. Redirigiendo...");
      setError(null);
  
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setError("Error al registrar usuario. Revisa la consola.");
      console.error("Error al registrar usuario:", error);
    }
  };

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'transparent',
      }}
    >
      <AppProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Stack spacing={2}>
            {!showRegister ? (
              <>
                <SignInPage
                  signIn={handleLogin}
                  providers={providers}
                  slotProps={{ emailField: { autoFocus: false } }}
                />
                {mensaje && <Alert severity="error">{mensaje}</Alert>}

                {/*<Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => setShowRegister(true)}  // Muestra el formulario de registro
                >
                  Crear una cuenta
                </Button>*/}
              </>
            ) : (
              //<Register setMensaje={setMensaje} />
              <Register setMensaje={setMensaje} handleRegister={handleRegister} />
            )}
          </Stack>
        </Box>
      </AppProvider>
    </Box>
  );
}