import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config/config";
import '../styles/Instrucciones.css';
import moment from 'moment';
import Swal from 'sweetalert2';

const Instrucciones = () => {
    const { id_publicacion } = useParams();
    const [instrucciones, setInstrucciones] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [urlEntrega, setUrlEntrega] = useState('');
    const [idTarea, setIdTarea] = useState(null);
    const [dniEstudiante, setDniEstudiante] = useState('');
    const [tareaEstudiante, setTareaEstudiante] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/publicaciones/tarea/${id_publicacion}`);
                setInstrucciones(response.data);

                const storedEmail = localStorage.getItem('correo');
                if (storedEmail) {
                    const responseDni = await axios.get(`${API_URL}/estudiantes/email/${storedEmail}`);
                    const dni = responseDni.data.dni;
                    setDniEstudiante(dni);

                    const id_tarea = response.data.tarea.id_tarea;
                    setIdTarea(id_tarea);

                    const responseCompletada = await axios.get(`${API_URL}/tareas/verificar-completada/${id_tarea}/${dni}`);
                    setTareaEstudiante(responseCompletada.data);
                }
            } catch (error) {
                console.error('Error al obtener las instrucciones:', error);
            }
        };
        fetchData();
    }, [id_publicacion]);

    const handleEntregarTarea = async () => {
        try {
            await axios.post(`${API_URL}/tareas/entregar-estudiante/${dniEstudiante}/tarea/${idTarea}`, { url_entrega: urlEntrega });
            setShowModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Tarea entregada correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            const responseCompletada = await axios.get(`${API_URL}/tareas/verificar-completada/${idTarea}/${dniEstudiante}`);
            setTareaEstudiante(responseCompletada.data);
        } catch (error) {
            console.error('Error al entregar la tarea:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al entregar la tarea',
                text: 'Hubo un problema al entregar la tarea. Por favor, inténtalo de nuevo.'
            });
        }
    };

    const handleCancelarEntrega = async () => {
        try {
            // await axios.put(`${API_URL}/tareas/cancelar-entrega/${dniEstudiante}/${idTarea}`);
            console.log("implementar xd");
        } catch (error) {
            console.error('Error al cancelar la entrega:', error);
        }
    };

    return (
        <main>
            <div className="InstruccionesContainer">
                <h1>Instrucciones de la Tarea</h1>
                <div className="TareaDetails">
                    <h2>Detalles de la Tarea</h2>
                    <p>Título: {instrucciones?.titulo}</p>
                    <p>Contenido: {instrucciones?.contenido}</p>
                    <p>Fecha de Publicación: {moment(instrucciones?.fecha_publicacion).format('DD/MM/YYYY HH:mm')}</p>
                    <p>Fecha Límite: {instrucciones?.tarea?.fecha_lim}</p>
                    <p>Puntos Máximos: {instrucciones?.tarea?.puntos_max}</p>
                    {tareaEstudiante && tareaEstudiante.completado === false && <p style={{ color: 'red' }}>No entregado</p>}
                    {tareaEstudiante && tareaEstudiante.completado && <p style={{ color: 'green' }}>Entregado</p>}
                </div>
                {tareaEstudiante && tareaEstudiante.completado && (
                    <div className="EntregaDetails">
                        <h2>Detalles de la Entrega</h2>
                        <p>URL de Entrega: {tareaEstudiante.url_entrega}</p>
                        <p>Fecha de Entrega: {moment(tareaEstudiante.fecha_entrega).format('DD/MM/YYYY HH:mm')}</p>
                        {tareaEstudiante.calificacion === null && <p> Esperando Calificacion</p>}
                        {tareaEstudiante.calificacion !== null && <p> Calificado: {tareaEstudiante.calificacion}</p>}
                    </div>
                )}
                <div className="ButtonContainer">
                    {tareaEstudiante && tareaEstudiante.completado === false ? (
                        <button onClick={() => setShowModal(true)}>Entregar Tarea</button>
                    ) : (
                        <button onClick={handleCancelarEntrega}>Cancelar Entrega</button>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="ModalBackdrop">
                    <div className="ModalContent">
                        <h2>Entregar Tarea</h2>
                        <input type="text" placeholder="URL de la entrega" value={urlEntrega} onChange={(e) => setUrlEntrega(e.target.value)} />
                        <div className="ButtonContainer">
                            <button onClick={handleEntregarTarea}>Enviar</button>
                            <button onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Instrucciones;
