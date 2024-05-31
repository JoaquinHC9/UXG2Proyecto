import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
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
                const response = await axios.get(`${API_URL}/profesores/${correo}`);
                setUserData(response.data);                
                const dni = response.data.profesor_dni; 
                const responseCursos = await axios.get(`${API_URL}/profesores/cursos/${dni}`);
                setCursos(responseCursos.data);
            } catch (error) {
                setError('Error al obtener datos del profesor');
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
                        <h2>Datos del Profesor:</h2>
                        <p >Nombre: {userData.nombre}</p>
                        <p >Apellido Paterno: {userData.apellido_pat}</p>
                        <p >Apellido Materno: {userData.apellido_mat}</p>
                        <p >Telefono: {userData.telefono}</p>
                    </div>
                )}
                <div className="curso-container">
                    {cursos.map(curso => (
                        <div key={curso.id_curso} className="curso-card">
                            <h3>{curso.nombre}</h3>
                            <p>{curso.descripcion}</p>
                            <p>Sección: {curso.seccion}</p>
                            <p>Horario: {curso.horario}</p>
                            <Link to={`/Curso/${curso.id_curso}`}>Ir al curso</Link>
                        </div>
                    ))}
                </div>
            </main>
            <footer></footer>
        </body>
    );
}
