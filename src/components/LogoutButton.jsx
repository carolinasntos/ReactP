import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user'); // Si estás almacenando info del usuario
    localStorage.removeItem('token'); // Si la API proporciona un token
    setAuth(false);
    navigate('/'); // Redirigir a Login
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
}