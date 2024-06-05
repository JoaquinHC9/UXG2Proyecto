import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config/config";
import moment from 'moment';
import { Button, Modal, TextField, Box, Menu, MenuItem } from '@mui/material';
import '../styles/CursoDetalleProf.css';

export default function CursoDetalleProf() {
    const { id_curso } = useParams();
    const [curso, setCurso] = useState({});
    const [temas, setTemas] = useState([]);
    const [publicacionesPorTema, setPublicacionesPorTema] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [expandedItems, setExpandedItems] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [newTema, setNewTema] = useState({ nombre: '' });
    const [newPublicacion, setNewPublicacion] = useState({ 
        titulo: '', 
        contenido: '', 
        url_profesor: '', 
        completado: '', 
        tipo_publicacion: ''
    });

    const [selectedTema, setSelectedTema] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurso = async () => {
            try {
                const cursoResponse = await axios.get(`${API_URL}/cursos/${id_curso}`);
                setCurso(cursoResponse.data);                
            } catch (error) {
                console.error('Error al obtener el Curso:', error);
            }
        };

        const fetchTemas = async () => {
            try {
                const response = await axios.get(`${API_URL}/cursos/${id_curso}/temas`);
                setTemas(response.data); 
            } catch (error) {
                console.error('Error al obtener los Temas:', error);
            }
        };

        fetchCurso();
        fetchTemas();
    }, [id_curso]);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                if (temas.length === 0) {
                    return;
                }
                const publicacionesPorTemaTemp = {};
                for (const tema of temas) {
                    const response = await axios.get(`${API_URL}/publicaciones/tema/${tema.id_tema}`);                   
                    publicacionesPorTemaTemp[tema.id_tema] = response.data;
                }
                setPublicacionesPorTema(publicacionesPorTemaTemp);                
            } catch (error) {
                console.error('Error al obtener las Publicaciones:', error);
            } finally {
                setIsLoading(false);
            }
        };    
        fetchPublicaciones();
    }, [temas]);

    const toggleExpand = (temaId, pubIndex) => {
        setExpandedItems(prevState => {
            const newExpandedItems = { ...prevState };
            newExpandedItems[temaId] = newExpandedItems[temaId] === pubIndex ? null : pubIndex;
            return newExpandedItems;
        });
    };
  
    const formatFecha = (timestampString) => {
        return moment(timestampString).format('DD/MM/YY');
    };

    const handleMaterialPreview = (id_publicacion) => {        
        navigate(`/Publicacion/${id_publicacion}`);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
        handleCloseMenu();            
        if (type !== 'tema') {
            setSelectedTema(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTema({ nombre: ''});
        setNewPublicacion({ titulo: '', contenido: '', tipo_publicacion: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (modalType === 'tema') {
            setNewTema(prevState => ({ ...prevState, [name]: value }));
        } else {
            setNewPublicacion(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            if (modalType === 'tema') {
                const response = await axios.post(`${API_URL}/cursos/agregarTema/${id_curso}`, {
                    ...newTema,
                    id_curso: id_curso
                });                
                const temasResponse = await axios.get(`${API_URL}/cursos/${id_curso}/temas`);
                setTemas(temasResponse.data);
            } else {
                let completadoValue = 'A';
                if (modalType !== 'material') {
                    completadoValue = 'N'; 
                }
                const response = await axios.post(`${API_URL}/publicaciones/agregar/${selectedTema}`, {
                    ...newPublicacion,
                    tipo_publicacion: modalType
                });                
                const publicacionesResponse = await axios.get(`${API_URL}/publicaciones/tema/${selectedTema}`);
                setPublicacionesPorTema(prevPublicaciones => ({
                    ...prevPublicaciones,
                    [selectedTema]: publicacionesResponse.data
                }));
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al crear', error);
        }
    };

    const handleAddStudent = () => {
        navigate(`/CursosP/${id_curso}/Add`);
    };

    return (
        <div className="prof-curso-detalle-principal">
            <div className="prof-curso-detalle-tareas">
                <h3>Tareas</h3>
                <Button variant="contained" onClick={handleOpenMenu}>Crear</Button>
                <Button variant="contained" onClick={handleAddStudent}>
                    Agregar Estudiante
                </Button>
            </div>
            <div className="prof-curso-detalle-temas">
                <banner><h3>{curso.nombre}</h3></banner>
                <div>                
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => handleOpenModal('tema')}>Tema</MenuItem>
                        <MenuItem onClick={() => handleOpenModal('material')}>Material</MenuItem>
                        <MenuItem onClick={() => handleOpenModal('pregunta')}>Pregunta</MenuItem>
                        <MenuItem onClick={() => handleOpenModal('tarea')}>Tarea</MenuItem>
                    </Menu>
                </div>
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="prof-tema-list">
                        {temas.map((tema, index) => (
                            <div key={index} className="prof-tema-item">
                                <h3>{tema.nombre}</h3>
                                <div className="prof-publicaciones-grid">
                                    {publicacionesPorTema[tema.id_tema] &&
                                        publicacionesPorTema[tema.id_tema].map((pub, idx) => (
                                            <div key={idx} className="prof-publicacion">
                                                <div
                                                    className={`prof-publicacion-header ${expandedItems[tema.id_tema] === idx ? 'expanded' : ''}`}
                                                    onClick={() => toggleExpand(tema.id_tema, idx)}
                                                >
                                                    <div className="prof-publicacion-info">
                                                        <h4>{pub.titulo}</h4>
                                                        <p>{formatFecha(pub.fecha_publicacion)}</p>
                                                    </div>
                                                </div>
                                                {expandedItems[tema.id_tema] === idx && (
                                                    <div className="prof-publicacion-contenido">
                                                        <p>{pub.contenido}</p>
                                                        <Button variant="contained" onClick={() => handleMaterialPreview(pub.id_publicacion)}>
                                                            Ver Material
                                                        </Button>
                                                        <Button variant="contained" color='secondary'>
                                                            Ver Entregas
                                                        </Button>                                           
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}                
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-box">
                    <h2 id="modal-modal-title">
                        {modalType === 'tema' ? 'Agregar Tema' : 'Agregar Publicación'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {modalType === 'tema' ? (
                            <>
                                <TextField
                                    name="nombre"
                                    label="Nombre"
                                    value={newTema.nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />                                
                            </>
                        ) : (
                            <>
                                    <TextField
                                        name="titulo"
                                        label="Título"
                                        value={newPublicacion.titulo}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        name="contenido"
                                        label="Contenido"
                                        value={newPublicacion.contenido}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        name="url_profesor"
                                        label="URL del profesor"
                                        value={newPublicacion.url_profesor}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        select
                                        name="id_tema"
                                        label="Tema"
                                        value={selectedTema} // Cambiar esto
                                        onChange={(e) => {
                                            const selectedTemaId = e.target.value; // Guardar el ID del tema seleccionado
                                            const selectedTemaNombre = temas.find((tema) => tema.id_tema === selectedTemaId).nombre; // Obtener el nombre del tema seleccionado
                                            console.log("Nuevo tema seleccionado:", selectedTemaNombre); // Mostrar el nombre del tema seleccionado en la consola
                                            setSelectedTema(selectedTemaId); // Actualizar el estado con el ID del tema
                                        }}
                                        fullWidth
                                        required
                                    >
                                        {temas.map((tema) => (
                                            <MenuItem key={tema.id_tema} value={tema.id_tema}>
                                                {tema.nombre} {/* Asegúrate de que se muestre el nombre del tema */}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </>
                        )}
                        <Button type="submit" variant="contained" color="primary">
                            Agregar
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}