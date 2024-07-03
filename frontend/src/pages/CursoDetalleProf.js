import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config/config";
import moment from 'moment';
import 'moment/locale/es';
import '../styles/CursoDetalleProf.css';
import { Button, Modal, TextField, Box, Menu, MenuItem } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';

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
        tipo_publicacion: '',
        fecha_lim: '',
        puntos_max: ''
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
                toast.error('Error al obtener las Publicaciones', { containerId: 'error' });
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
        setNewPublicacion({ titulo: '', contenido: '', tipo_publicacion: '', fecha_lim: '', puntos_max: '' });
    };

    const handleChangeTema = (e) => {
        const { name, value } = e.target;
        setNewTema(prevState => ({ ...prevState, [name]: value }));
    };
    
    const handleChangePublicacion = (e) => {
        const { name, value } = e.target;
        setNewPublicacion(prevState => ({ ...prevState, [name]: value }));
    };
    

    const handleSubmitTema = async () => {
        try {
            const response = await axios.post(`${API_URL}/cursos/agregarTema/${id_curso}`, {
                ...newTema,
                id_curso: id_curso
            });            
            const temasResponse = await axios.get(`${API_URL}/cursos/${id_curso}/temas`);
            setTemas(temasResponse.data);            
            handleCloseModal();
            toast.success('Tema creado exitosamente', { containerId: 'success' });
        } catch (error) {
            toast.error('Error al crear el tema', { containerId: 'error' });
            console.error('Error al crear tema', error);
        }
    };
    
    const handleSubmitMaterial = async () => {
        try {
            const response = await axios.post(`${API_URL}/publicaciones/agregar/${selectedTema}`, {
                ...newPublicacion,
                tipo_publicacion: modalType
            });
            toast.success('Material creado exitosamente', { containerId: 'success' });
            const publicacionesResponse = await axios.get(`${API_URL}/publicaciones/tema/${selectedTema}`);
            setPublicacionesPorTema(prevPublicaciones => ({
                ...prevPublicaciones,
                [selectedTema]: publicacionesResponse.data
            }));
            handleCloseModal();
        } catch (error) {
            toast.error('Error el crear el material', { containerId: 'error' });
            console.error('Error al crear material', error);
        }
    };
    
    const handleSubmitTarea = async () => {
        try {            
            const response = await axios.post(`${API_URL}/publicaciones/agregarTarea/${selectedTema}`, {
                ...newPublicacion,
                tipo_publicacion: modalType                
            });
            toast.success('Tarea creada exitosamente', { containerId: 'success' });
            const publicacionesResponse = await axios.get(`${API_URL}/publicaciones/tema/${selectedTema}`);
            setPublicacionesPorTema(prevPublicaciones => ({
                ...prevPublicaciones,
                [selectedTema]: publicacionesResponse.data
            }));
            handleCloseModal();
        } catch (error) {
            toast.error('Error al crear la tarea', { containerId: 'error' });
            console.error('Error al crear tarea', error);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalType === 'Tema') {
            handleSubmitTema();
        } else if (modalType === 'Material') {
            handleSubmitMaterial();
        } else {
            handleSubmitTarea();
        }
    };    

    const handleAddStudent = () => {
        navigate(`/CursosP/${id_curso}/Add`);
    };

    return (        
        <div className="prof-curso-detalle-principal">
            <ToastContainer
                position="bottom-center"
                containerId="error"
                autoClose={5000}                                                
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
            <ToastContainer
                position="top-center"
                containerId="success"
                autoClose={2000}                                                
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
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
                        <MenuItem onClick={() => handleOpenModal('Tema')}>Tema</MenuItem>
                        <MenuItem onClick={() => handleOpenModal('Material')}>Material</MenuItem>
                        <MenuItem onClick={() => handleOpenModal('Pregunta')}>Pregunta</MenuItem>
                        <MenuItem onClick={() => handleOpenModal('Tarea')}>Tarea</MenuItem>
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
                                                        <p>Fecha de Publicacion: {formatFecha(pub.fecha_publicacion)}</p>
                                                    </div>
                                                </div>
                                                {expandedItems[tema.id_tema] === idx && (
                                                    <div className="prof-publicacion-contenido">
                                                        <p>{pub.contenido}</p>
                                                        {pub.tipo_publicacion === 'Material' && (
                                                        <Button 
                                                            variant="contained" 
                                                            onClick={() => handleMaterialPreview(pub.id_publicacion, pub.tipo_publicacion)}
                                                        >
                                                            Ver Material
                                                        </Button>
                                                        )}
                                                        {pub.tipo_publicacion === 'Tarea' && (
                                                            <Button 
                                                                variant="contained" 
                                                                onClick={() => navigate(`/cursoP/${id_curso}/actividad/${pub.id_publicacion}`)}
                                                            >
                                                                Ver Instrucciones
                                                            </Button>
                                                        )}                                                                                              
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

            <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="prof-modal-box" sx={{ width: '80vw', maxWidth: '1200px', height: '65vh', maxHeight: '80vh', overflowY: 'auto' }}>
                    <h2>Agregar {modalType}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="prof-modal-content">
                        {modalType === 'Tema' ? (
                            <>
                                <TextField
                                name="nombre"
                                label="Nombre"
                                value={newTema.nombre}
                                onChange={handleChangeTema}
                                fullWidth
                                required
                                readOnly={false}
                            />
                             
                            </>
                        ) : (
                            <>
                                <div className="modal-column">
                                    <TextField
                                        name="titulo"
                                        label="Título"
                                        value={newPublicacion.titulo}
                                        onChange={handleChangePublicacion}
                                        fullWidth
                                        required
                                    />                                    
                                    <TextField
                                        name="url_profesor"
                                        label="URL del profesor"
                                        value={newPublicacion.url_profesor}
                                        onChange={handleChangePublicacion}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        select
                                        name="id_tema"
                                        label="Tema"
                                        value={selectedTema}
                                        onChange={(e) => {
                                            const selectedTemaId = e.target.value;
                                            const selectedTemaNombre = temas.find((tema) => tema.id_tema === selectedTemaId).nombre;
                                            setSelectedTema(selectedTemaId);
                                        }}
                                        fullWidth
                                        required
                                    >
                                        {temas.map((tema) => (
                                            <MenuItem key={tema.id_tema} value={tema.id_tema}>
                                                {tema.nombre}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        name="contenido"
                                        label="Contenido"
                                        value={newPublicacion.contenido}
                                        onChange={handleChangePublicacion}
                                        multiline
                                        rows={8} 
                                        fullWidth
                                        required
                                        sx={{ width: '100%', maxWidth: '600px' }}
                                    />
                                </div>
                                {modalType !== 'Material' && (
                                    <>
                                    <div className="modal-column">
                                        <TextField
                                            name="puntos_max"
                                            label="Puntos Máximos"
                                            type="number"
                                            value={newPublicacion.puntos_max}
                                            onChange={handleChangePublicacion}
                                            fullWidth
                                            required
                                        />
                                       <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="es">
                                        <DateTimePicker
                                                label="Fecha y Hora Límite"
                                                value={newPublicacion.fecha_lim ? moment(newPublicacion.fecha_lim) : null}
                                                onChange={(date) => setNewPublicacion(prevState => ({
                                                    ...prevState,
                                                    fecha_lim: date ? date.toISOString() : ''
                                                }))}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    </>                                    
                                )}
                            </>
                        )}
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 6, mr: -1.5 }}>
                                Agregar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
