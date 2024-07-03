import React, { useEffect, useState } from 'react';
import { API_URL } from "../config/config";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Perfil.css';

export default function PerfilProfesor() {
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);    
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); 
    const [isEditingPassword, setIsEditingPassword] = useState(false); // Estado para la edición de contraseña
    const [originalData, setOriginalData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(''); // Estado para la contraseña actual
    const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la contraseña

    useEffect(() => {
        const fetchData = async () => {
            try {
                const correo = localStorage.getItem('correo');
                const response = await axios.get(`${API_URL}/profesores/${correo}`);                
                setUserData(response.data);
                setOriginalData(response.data);                
            } catch (error) {
                setError('Error al obtener datos del profesor');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const correo = localStorage.getItem('correo');
            const updatedData = {
                nombre: document.getElementById('nombreInput').value,
                apellido_pat: document.getElementById('apellidoPatInput').value,
                apellido_mat: document.getElementById('apellidoMatInput').value,
                email: document.getElementById('emailInput').value,                
                telefono: document.getElementById('telefonoInput').value,
                fecha_nacimiento: document.getElementById('fechaInput').value
            };
            await axios.put(`${API_URL}/profesores/actualizar/${correo}`, updatedData);                        
            setUserData(updatedData);
            setIsEditing(false);
            toast.success('Perfil editado correctamente', { containerId: 'success' });
        } catch (error) {            
            console.error(error);
            toast.error('Error al editar el perfil', { containerId: 'error' });
        }
    };

    const handleCancelClick = () => {
        setUserData(originalData);
        setIsEditing(false);
        setIsEditingPassword(false); // Cancelar la edición de contraseña
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleEditPasswordClick = () => {
        setIsEditingPassword(true);
    };

    const handleSavePasswordClick = async () => {
        try {
            if (newPassword !== confirmPassword) {
                toast.error('Las contraseñas no coinciden', { containerId: 'error' });
                setUserData(originalData);
                return;
            }    
            const correo = localStorage.getItem('correo');
            const updatedData = {
                contra: newPassword
            };               
            await axios.put(`${API_URL}/profesores/actualizar-contra/${correo}`, updatedData);
            setUserData(prevUserData => ({
                ...prevUserData,
                contra: newPassword
            }));
            setIsEditingPassword(false); 
            setCurrentPassword(''); 
            setNewPassword(''); 
            setConfirmPassword('');
            toast.success('Contraseña Actualizada', { containerId: 'success' });
        } catch (error) {            
            toast.error('Error al guardar la contraseña', { containerId: 'error' });
            console.error(error);
        }
    };
    

    return (
        <main>
            <ToastContainer
                position="bottom-center"
                containerId="error"
                autoClose={5000}                                                
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
            <ToastContainer
                position="top-right"
                containerId="success"
                autoClose={2000}                                                
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
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
                                        {isEditing ? (
                                            <>
                                                <button onClick={handleSaveClick} className="edit-button">Guardar</button>
                                                <button onClick={handleCancelClick} className="edit-button">Cancelar</button>
                                            </>
                                        ) : (
                                            <button onClick={handleEditClick} className="edit-button">Editar Información</button>
                                        )}
                                    </div>
                                    <p>Nombre: {isEditing ? <input id="nombreInput" type="text" defaultValue={userData.nombre} /> : userData.nombre}</p>
                                    <p>Apellido Paterno: {isEditing ? <input id="apellidoPatInput" type="text" defaultValue={userData.apellido_pat} /> : userData.apellido_pat}</p>
                                    <p>Apellido Materno: {isEditing ? <input id="apellidoMatInput" type="text" defaultValue={userData.apellido_mat} /> : userData.apellido_mat}</p>
                                    <p>Correo: {isEditing ? <input id="emailInput" type="text" defaultValue={userData.email} /> : userData.email}</p>                                    
                                    <p>Telefono: {isEditing ? <input id="telefonoInput" type="text" defaultValue={userData.telefono} maxLength="9" /> : userData.telefono}</p>
                                    <p>Fecha Nacimiento: {isEditing ? <input id="fechaInput" type="text" defaultValue={userData.fecha_nacimiento} /> : userData.fecha_nacimiento}</p>
                                </div>
                            )
                        )}
                        <div className='password-info'>
                            <h2>Contraseña</h2>
                            {isEditingPassword ? (
                                <div>
                                    <p>Contraseña: {userData && userData.contra}</p>
                                    <p>Nueva Contraseña: <input id="newPasswordInput" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></p>
                                    <p>Confirmar Contraseña: <input id="confirmPasswordInput" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></p>
                                    <button onClick={handleSavePasswordClick} className="edit-button">Guardar Contraseña</button>
                                    <button onClick={handleCancelClick} className="edit-button">Cancelar</button>
                                </div>
                            ) : (
                                <p>Contraseña: ********</p>
                            )}
                            {!isEditingPassword && (
                                <button onClick={handleEditPasswordClick} className="edit-button">Editar Contraseña</button>
                            )}
                        </div>
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
