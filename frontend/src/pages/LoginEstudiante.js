import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom';
import { API_URL } from '../config/config.js';
import '../styles/Login.css';


export default function LoginEstudiante() {
  const [contrasena, setContrasena] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/estudiantes/login`, {
        email: email,
        contra: contrasena,        
      });  
      console.log('Server Response:', response);      
      if (response.data.success) {
        localStorage.setItem('correo', email);
        localStorage.setItem('userType', 'estudiante');
        navigate('/MainEstudiante', { replace: true });
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
      <div className='section-container'>
        </div>        
        <div className='section-login'>
          <form className="login-form" onSubmit={(e) => handleLogin(e)}>
            <h1>Bienvenido Estudiante</h1>
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
              {error && <p className="text-danger">{error}</p>}
              <Link to="/Registro" >
                  <button className="button-register">Registro</button>
              </Link>
          </form>
        </div>          
      </main>      
      <footer>        
      </footer>
    </body>
  );
}
