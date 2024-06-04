import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/MainProfesor.css';
import { API_URL } from "../config/config";
import { Button, Modal, TextField, Box } from '@mui/material';
import axios from 'axios';

export default function MainProfesor({ isSidebarExpanded }) {   
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCurso, setNewCurso] = useState({
        nombre: '',
        descripcion: '',
        seccion: '',
        horario: '',
        profesor_dni: ''
    });

    const fetchCursos = async (dni) => {
        try {
            const responseCursos = await axios.get(`${API_URL}/profesores/cursos/${dni}`);
            setCursos(responseCursos.data);
        } catch (error) {
            setError('Error al obtener los cursos');
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const correo = localStorage.getItem('correo');
                const response = await axios.get(`${API_URL}/profesores/${correo}`);
                setUserData(response.data);                
                const dni = response.data.profesor_dni; 
                await fetchCursos(dni);                
                setNewCurso(prevState => ({ ...prevState, profesor_dni: dni }));
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

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCurso(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/cursos/crear`, newCurso);
            await fetchCursos(newCurso.profesor_dni); 
            handleCloseModal();
        } catch (error) {
            setError('Error al crear el curso');
            console.error(error);
        }
    };

    return (
        <div>
            <div className={isSidebarExpanded ? 'header-container expanded' : 'header-container collapsed'}>
                <h1>SmartClass</h1>
                <div className="search-bar">
                    <SearchIcon />
                    <input type="text" placeholder="Buscar..." />
                </div>
            </div>
            <div>
            {userData && (                
                <h2>Bienvenido: {userData.nombre} {userData.apellido_pat} {userData.apellido_mat}</h2>
            )}                
            </div>            
            <div className='curso-config'>
                <Button variant="contained" onClick={handleOpenModal}>
                    Crear nuevo Curso
                </Button>
            </div>
            <main>
                <div>                    
                    <h3>Mis Cursos</h3>
                    <div className='curso-container'>
                    {cursos.map(curso => (
                        <div key={curso.id_curso} className="curso-card">
                            <h3>{curso.nombre}</h3>
                            <p>{curso.descripcion}</p>
                            <p>Sección: {curso.seccion}</p>
                            <p>Horario: {curso.horario}</p>
                            <Link to={`/CursoP/${curso.id_curso}`}>Ir al curso</Link>
                        </div>
                    ))}
                    </div>
                </div>
            </main>
            <footer></footer>

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className="modal-box">
                    <h2 id="modal-title">Crear nuevo Curso</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="nombre"
                            label="Nombre"
                            value={newCurso.nombre}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="descripcion"
                            label="Descripción"
                            value={newCurso.descripcion}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="seccion"
                            label="Sección"
                            value={newCurso.seccion}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="horario"
                            label="Horario"
                            value={newCurso.horario}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Crear Curso
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
