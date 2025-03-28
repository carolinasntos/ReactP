import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx'; // ✅ Importar la página de registro
import Inicio from './pages/inicio.jsx'; // ✅ Cambiar de AdminPage a Inicio

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") === "true");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    if (auth !== isAuthenticated) {
      setAuth(isAuthenticated);
    }
  }, [auth]);

  useEffect(() => {
    if (auth === null) 
      return <div>Cargando...</div>;

    if (auth && location.pathname === '/') {
      navigate('/inicio', { replace: true }); // 🔄 Redirigir a inicio después del login
    }
  }, [auth, location.pathname, navigate]);

  if (auth === null) {
    return null; // 🔄 Evitar renderizar la UI hasta verificar autenticación
  }

  const hideNavAndFooter = location.pathname === "/";
  console.log("Renderizando App.jsx - auth:", auth, "location:", location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideNavAndFooter && <Header setAuth={setAuth} />} 
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Routes>
          <Route path="/" element={auth ? <Navigate to="/inicio" /> : <Login setAuth={setAuth} />} />
          {/* Pasa setAuth como prop a Register */}
          <Route path="/registro" element={<Register /*setAuth={setAuth} *//>} /> 
          <Route path="/inicio" element={auth ? <Inicio /> : <Navigate to="/" />} />
        </Routes>
      </Box>
      {!hideNavAndFooter && <Footer />}
    </Box>
  );
}

export default App;