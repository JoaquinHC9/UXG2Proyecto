import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config/config";
import '../styles/Actividades.css'; 
import moment from 'moment';
import Button from '@mui/material/Button';

const Actividades = () => {
    const { id_curso, id_publicacion } = useParams();
    const [instrucciones, setInstrucciones] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiantesTarea, setEstudiantesTarea] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/publicaciones/tarea/${id_publicacion}`);
                setInstrucciones(response.data);
            } catch (error) {
                console.error('Error al obtener las instrucciones:', error);
            }
        };

        const fetchEstudiantes = async () => {
            try {
                const response = await axios.get(`${API_URL}/estCurso/${id_curso}`);
                if (Array.isArray(response.data.estudiantes)) {
                    setEstudiantes(response.data.estudiantes);
                } else {
                    console.error('La respuesta de estudiantes no es un arreglo:', response.data);
                    setEstudiantes([]);
                }
            } catch (error) {
                console.error('Error al obtener los estudiantes:', error);
            }
        };

        const fetchEstudiantesTarea = async () => {
            try {
                const response = await axios.get(`${API_URL}/tareas/${id_publicacion}/estudiantes`);
                if (Array.isArray(response.data)) {
                    setEstudiantesTarea(response.data);
                } else {
                    console.error('La respuesta de estudiantesTarea no es un arreglo:', response.data);
                    setEstudiantesTarea([]);
                }
            } catch (error) {
                console.error('Error al obtener los estudiantes de la tarea:', error);
            }
        };

        fetchData();
        fetchEstudiantes();
        fetchEstudiantesTarea();
    }, [id_curso, id_publicacion]);

    const renderEstadoTarea = (estudianteId) => {
        const estudianteTarea = estudiantesTarea.find(et => et.estudiante_dni === estudianteId);
        if (estudianteTarea) {
            const estadoClass = estudianteTarea.completado ? 'estado completado' : 'estado no-completado';
            return (
                <span className={estadoClass}>
                    {estudianteTarea.completado ? 'Completado' : 'No Completado'}                    
                </span>
            );
        }
        return <span className="estado no-completado">No Completado</span>;
    };
    

    const handleCalificar = (estudianteTarea) => {              
        navigate(`/cursoP/${id_curso}/actividad/${id_publicacion}/detalle/${estudianteTarea.id_est_tarea}`)
    };

    return (
        <main>
            <div className="ActividadesContainer">
                <h1>Instrucciones de la Tarea</h1>
                <div className="TareaDetalle">
                    <h2>Detalles de la Tarea</h2>
                    <p>Título: {instrucciones?.titulo}</p>
                    <p>Contenido: {instrucciones?.contenido}</p>
                    <p>Fecha de Publicación: {moment(instrucciones?.fecha_publicacion).format('DD/MM/YYYY HH:mm')}</p>
                    <p>Fecha Límite: {moment(instrucciones?.tarea?.fecha_lim).format('DD/MM/YYYY HH:mm')}</p>
                    <p>Puntos Máximos: {instrucciones?.tarea?.puntos_max}</p>
                </div>
            </div>
            <div className="EstudiantesTarea">
                <h2>Estudiantes</h2>
                <div className="EstudianteLista">
                {Array.isArray(estudiantes) && estudiantes.length > 0 ? (
                    estudiantes.map(estudiante => {
                        const estudianteTarea = estudiantesTarea.find(et => et.estudiante_dni === estudiante.estudiante_dni);
                        const completado = estudianteTarea && estudianteTarea.completado;
                        return (
                            <div key={estudiante.id_est_curso} className="EstudianteItem">
                                <div className="EstudianteInfo">
                                    <p>{estudiante.estudiante.nombre} {estudiante.estudiante.apellido_pat} {estudiante.estudiante.apellido_mat}</p>
                                    {renderEstadoTarea(estudiante.estudiante_dni)}
                                    {estudianteTarea && estudianteTarea.completado && (
                                        <p>Completado: {estudianteTarea.calificacion != null ? `${estudianteTarea.calificacion}/` : '__/'}{instrucciones?.tarea?.puntos_max}</p>
                                    )}
                                </div>
                                <Button
                                    variant="contained"
                                    color={completado ? "primary" : "secondary"}
                                    disabled={!completado}
                                    onClick={() => handleCalificar(estudianteTarea)}
                                    className={completado ? "" : "disabledButton"}
                                >
                                    Calificar
                                </Button>
                            </div>
                        );
                    })
                ) : (
                    <p>No se encontraron estudiantes.</p>
                )}
                </div>
            </div>
        </main>
    );
};

export default Actividades;
