import React from 'react';
import { Link } from 'react-router-dom';
import logoE from '../images/estudiante.png';
import logoP from '../images/profesor.png';
import logo from '../images/logo.png';
import '../styles/Portal.css';

export default function Portal() {
  return (
    <body>
      <header>
      <img src={logo} />
      </header>
      <nav></nav>
        <main>
          <div className='section-container bg-estudiante'>
            <div className="logo-container bg-naranja">
                <img src={logoE} />
                <Link to="/LoginEstudiante" className="Link">
                <button className="boton-login-prof">Iniciar Sesión</button>
                </Link>
            </div>
            </div>
            <div className='section-container bg-profesor'>
            <div className="logo-container bg-azul">
                <img src={logoP} />
                <Link to="/LoginEstudiante" className="Link">
                    <button className="boton-login-est">Iniciar Sesión</button>
                </Link>
            </div>
            </div>
        </main>
    </body>
  );
}