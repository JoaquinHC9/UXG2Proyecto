import React from 'react';
import { Link } from 'react-router-dom';
import logoE from '../images/estudiante.png';
import logoP from '../images/profesor.png';
import logo from '../images/logo.png';
import '../styles/Portal.css';

export default function Login() {
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
                <button>Estudiante</button>
            </div>
            </div>
            <div className='section-container bg-profesor'>
            <div className="logo-container bg-azul">
                <img src={logoP} />
                <button>Profesor</button>
            </div>
            </div>
        </main>
    </body>
  );
}
