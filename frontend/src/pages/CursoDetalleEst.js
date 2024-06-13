import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CursoDetalleEst.css';
import { API_URL } from "../config/config";
import moment from 'moment';
import Button from '@mui/material/Button';

export default function CursoDetalleEst() {
    const { id_curso } = useParams();
    const [curso, setCurso] = useState({});
    const [temas, setTemas] = useState([]);
    const [publicacionesPorTema, setPublicacionesPorTema] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [expandedItem, setExpandedItem] = useState(null);
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

    const toggleExpand = (index) => {
        setExpandedItem(expandedItem === index ? null : index);
    };
  
    const formatFecha = (timestampString) => {
        return moment(timestampString).format('DD/MM/YY');
    };

    const handleMaterialPreview = (id_publicacion, tipo_publicacion) => {
        if (tipo_publicacion === 'tarea') {
            navigate(`/instrucciones/${id_publicacion}`);
        } else {
            navigate(`/Publicacion/${id_publicacion}`);
        }
    };
    
    return (
        <div className="curso-detalle-principal">
            <div className="curso-detalle-tareas">
                <h3>Tareas</h3>
                <button>
                    Todas las tareas
                </button>
                <h4>Proxima Entregas</h4>
            </div>
            <div className="curso-detalle-temas">
                <banner><h3>{curso.nombre}</h3></banner>                
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="tema-list">
                        {temas.map((tema, index) => (
                            <div key={index} className="tema-item">                                
                                <h3>{tema.nombre}</h3>
                                <div className="publicaciones">                                    
                                {publicacionesPorTema[tema.id_tema] &&
                                    publicacionesPorTema[tema.id_tema].map((pub, idx) => (
                                        <div className='publicacion' key={idx}>
                                            <div className={`publicacion-header ${expandedItem === idx ? 'expanded' : ''}`}
                                            onClick={() => toggleExpand(idx)}>
                                                <div className="publicacion-info">
                                                    <h4>{pub.titulo}</h4>
                                                    <p>{formatFecha(pub.fecha_publicacion)}</p>
                                                </div>
                                            </div>
                                            {expandedItem === idx && (
                                                <div className="publicacion-contenido">
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
                                                            onClick={() => navigate(`/instrucciones/${pub.id_publicacion}`)}
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
        </div>
    );
}
