import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/MainEstudiante.css';
import { API_URL } from "../config/config";
import axios from 'axios';

export default function MainEstudiante({ isSidebarExpanded }) {   
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const correo = localStorage.getItem('correo');
            const response = await axios.get(`${API_URL}/estudiantes/${correo}`);
            setUserData(response.data);
            const dni = userData.dni;
            const responseCursos = await axios.get(`${API_URL}/estudiantes/${dni}/cursos`);
            setCursos(responseCursos.data);
          } catch (error) {
            setError('Error al obtener datos del estudiante');
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
    useEffect(() => {
        console.log(cursos);
    }, [cursos]);

    return (    
        <body>
            <div className={isSidebarExpanded ? 'header-container expanded' : 'header-container collapsed'}>
                <h1>SmartClass</h1>
                <div className="search-bar">
                    <SearchIcon />
                    <input type="text" placeholder="Buscar..." />
                </div>
            </div>
            <nav></nav>
            <main>
            {userData && (
            <div>        
                <h2>Datos del Estudiante:</h2>                        
                <p >Nombre: {userData.nombre}</p>
                <p >Apellido Paterno: {userData.apellido_pat}</p>
                <p >Apellido Materno: {userData.apellido_mat}</p>
                <p >Telefono: {userData.telefono}</p>
                </div>
            )}
            </main>
            <footer></footer>
        </body>
    );
}
