import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import '../styles/LoginEstudiante.css';

export default function LoginEstudiante() {
  return (
    <body>
      <nav></nav>
      <main>
        <div className='section-container bg-estudiante'>            
        </div>
        <div className='section-login'>
          <form className="login-form">
            <h1>Bievenido Estudiante</h1>
            <h2>Iniciar sesión</h2>
            <p>Usuario</p>
            <input type="text" placeholder="Ingresa tu usuario" />
            <p>Contraseña</p>
            <input type="password" placeholder="Digita tu contraseña" />
                <Link to="/MainEstudiante" className="Link">
                    <button>Iniciar Sesión</button>
                </Link>   
          </form>
        </div>
      </main>
      <footer>        
      </footer>
    </body>
  );
}
