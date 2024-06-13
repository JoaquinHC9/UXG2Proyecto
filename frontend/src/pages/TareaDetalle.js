import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config/config";
import '../styles/TareaDetalle.css';
import Swal from 'sweetalert2';

const TareaDetalle = () => {
    const { id_publicacion, id_est_tarea } = useParams();    
    const [tarea, setTarea] = useState(null);
    const [calificacion, setCalificacion] = useState(null);
    const [calificacionObtenida, setCalificacionObtenida] = useState(null); // Estado para almacenar la calificación obtenida

    useEffect(() => {
        const fetchTarea = async () => {
            try {
                const response = await axios.get(`${API_URL}/tareas/${id_publicacion}/${id_est_tarea}`);                
                setTarea(response.data);                
                // Obtener la calificación previamente asignada
                setCalificacionObtenida(response.data.calificacion);
            } catch (error) {
                console.error('Error al obtener la tarea:', error);
            }
        };

        fetchTarea();
    }, [id_publicacion, id_est_tarea]);

    const handleCalificar = async () => {
        try {
            await axios.put(`${API_URL}/tareas/calificar-estudiante/${tarea.estudiante_dni}/tarea/${tarea.id_tarea}`, { calificacion });            
            setCalificacionObtenida(calificacion);
            Swal.fire({
                icon: 'success',
                title: '¡Tarea calificada!',
                text: 'La tarea se ha calificado exitosamente.',
            });            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al calificar la tarea',
                text: 'Ha ocurrido un error al calificar la tarea. Por favor, inténtalo de nuevo más tarde.',
            });
        }
    };

    return (
        <main>
            <div className="TareaDetalleContainer">
                <h1>Detalles de la Tarea</h1>
                {tarea ? (
                    <div className="TareaDetalleContent">
                        <iframe src={tarea.url_entrega} title="Documento de Google Drive" className="TareaIframe"></iframe>
                    </div>
                ) : (
                    <p>Cargando detalles de la tarea...</p>
                )}
            </div>
            <div className="fileContainer">
                <div className="CalificacionContainer">
                    <input 
                        type="number" 
                        value={calificacion || ''} 
                        onChange={(e) => setCalificacion(e.target.value)} 
                        placeholder="Ingrese la calificación" 
                        className="CalificacionInput" 
                    />
                    <button onClick={handleCalificar} className="CalificarButton">Calificar</button>
                </div>
                <div className="CalificacionColocada"> 
                    {calificacionObtenida !== null && (
                        <div className="CalificacionColocadaItem">
                            <h3>Calificación:</h3>
                            <h3>{calificacionObtenida}</h3>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TareaDetalle;
