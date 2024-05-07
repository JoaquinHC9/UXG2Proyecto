import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfesorLogin.css';

export default function LoginProfesor() {
  return (
    <body>
      <nav></nav>
      <main>
        <div className='section-container bg-profesor'>
        </div>
        <div className='section-login'>
          <form className="login-form">
            <h1>Bievenido Profesor</h1>
            <h2>Iniciar sesión</h2>
            <p>Correo Electronico</p>
            <input type="text" placeholder="Ingresa tu usuario" />
            <p>Contraseña</p>
            <input type="password" placeholder="Digita tu contraseña" />
              <Link to="/MainProfesor" >
                  <button className="button-login">Iniciar Sesión</button>
              </Link>
              <p>¿Todavia no tienes una cuenta? Registrate Aqui</p>              
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
