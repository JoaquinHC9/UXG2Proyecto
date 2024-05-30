import React, { useEffect, useState } from 'react';
import { API_URL } from "../config/config";
import axios from 'axios';
import '../styles/Perfil.css';

export default function Perfil() {
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);    
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const correo = localStorage.getItem('correo');
                const response = await axios.get(`${API_URL}/estudiantes/${correo}`);
                setUserData(response.data);                                
            } catch (error) {
                setError('Error al obtener datos del estudiante');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const handleEditClick = () => {
        setIsEditing(!isEditing); 
    };

    const handleSaveClick = async () => {
        try {
            const correo = localStorage.getItem('correo');
            const updatedData = {
                nombre: document.getElementById('nombreInput').value,
                apellido_pat: document.getElementById('apellidoPatInput').value,
                apellido_mat: document.getElementById('apellidoMatInput').value,
                email: document.getElementById('emailInput').value,
                estudiante_dni: document.getElementById('dniInput').value,
                telefono: document.getElementById('telefonoInput').value,
                fecha_nacimiento: document.getElementById('fechaInput').value
            };
            await axios.put(`${API_URL}/estudiantes/actualizar/${correo}`, updatedData);            
            setUserData(updatedData);            
            setIsEditing(false);
        } catch (error) {
            setError('Error al guardar los datos');
            console.error(error);
        }
    };
    

    return (
        <main>
            <div>
            <div>
                {isLoading ? (<p>Cargando...</p>
                ) : error ? (<p>{error}</p>) : (
                    userData && (<h1>{userData.nombre} {userData.apellido_pat } {userData.apellido_mat}</h1>)
                )}              
            </div>                      
            <div className='perfil-container'>
                <div className='perfil-info'>
                    {isLoading ? (
                        <p>Cargando...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        userData && (
                            <div>
                                <div className='edit-info'>
                                    <h2>Informacion Basica</h2>
                                    <button onClick={isEditing ? handleSaveClick : handleEditClick} className="edit-button">{isEditing ? 'Guardar' : 'Editar'}</button>
                                </div>
                                <p>Nombre: {isEditing ? <input id="nombreInput" type="text" defaultValue={userData.nombre} /> : userData.nombre}</p>
                                <p>Apellido Paterno: {isEditing ? <input id="apellidoPatInput" type="text" defaultValue={userData.apellido_pat} /> : userData.apellido_pat}</p>
                                <p>Apellido Materno: {isEditing ? <input id="apellidoMatInput" type="text" defaultValue={userData.apellido_mat} /> : userData.apellido_mat}</p>
                                <p>Correo: {isEditing ? <input id="emailInput" type="text" defaultValue={userData.email} /> : userData.email}</p>
                                <p>DNI: {isEditing ? <input id="dniInput" type="text" defaultValue={userData.estudiante_dni} /> : userData.estudiante_dni}</p>
                                <p>Telefono: {isEditing ? <input id="telefonoInput" type="text" defaultValue={userData.telefono} /> : userData.telefono}</p>
                                <p>Fecha Nacimiento: {isEditing ? <input id="fechaInput" type="text" defaultValue={userData.fecha_nacimiento} /> : userData.fecha_nacimiento}</p>
                            </div>
                        )
                    )}
                </div>
                <div className='config-info'>
                    <h2>Configuración</h2>
                    <p>Idioma: Español</p>                    
                </div>
            </div>
            </div>
        </main>
    );
}
