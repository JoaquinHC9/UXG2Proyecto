import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config.js';
import bgProfesor from '../images/bg-profesor.jpg';
import '../styles/Login.css';

export default function LoginProfesor() {
  const [contrasena, setContrasena] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/profesores/login`, {
        email: email,
        contra: contrasena,        
      });  
      console.log('Server Response:', response);  
      if (response.data.success) {
        localStorage.setItem('correo', email);
        localStorage.setItem('userType', 'profesor');
        navigate('/MainProfesor', { replace: true });
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error en el inicio de sesión');
      console.error(error);
    }
  };
  return (
    <body>
      <nav></nav>
      <main>
      <div className='section-container' style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(${bgProfesor})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', flex: 1 }}>
        </div>
        <div className='section-login'>
        <form className="login-form" onSubmit={(e) => handleLogin(e)}>
            <h1>Bievenido Profesor</h1>
            <h2>Iniciar sesión</h2>
            <p>Correo Electrónico</p>
            <input
                  type="email"
                  className="campo-correo"
                  id="estudiante-correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digita tu correo"
              />
            <p>Contraseña</p>
            <input
                  type="password"
                  className="campo-contrasena"
                  id="estudiante-contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Digita tu contraseña"
                />         
              <button className="button-login">Iniciar Sesión</button>              
              <p>¿Todavía no tienes una cuenta? Regístrate aquí</p>                            
              <button className="button-register">Registro</button>              
              {error && <p className="text-danger">{error}</p>}
          </form>
        </div>
      </main>
      <footer>        
      </footer>
    </body>
  );
}
