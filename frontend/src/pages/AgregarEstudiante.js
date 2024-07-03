import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { API_URL } from "../config/config";
import Swal from 'sweetalert2';

export default function AgregarEstudiante() {
    const { id_curso } = useParams();
    const [newStudent, setNewStudent] = useState({ email: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {                     
        try {
            const response = await axios.post(`${API_URL}/cursos/agregarEstudiante/${id_curso}`, newStudent);
            Swal.fire({
                title: 'Estudiante agregado!',
                text: 'El estudiante ha sido agregado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setNewStudent({ email: '' });
            });
            console.log(response); // Aquí imprimes la respuesta exitosa
        } catch (error) {
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un estado de error                
                console.log(error.response)
                Swal.fire({
                    title: 'Error '+ error.response.status,
                    text: error.response.data.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió ninguna respuesta
                console.log(error.request); 
                Swal.fire({
                    title: 'Error',
                    text: 'No se recibió respuesta del servidor.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                // Ocurrió un error al configurar la solicitud
                console.log('Error', error.message); 
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar la solicitud.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            console.log(error.config); // Aquí imprimes la configuración de Axios
        }        
    };
    
    const handleBackToCourse = () => {
        navigate(`/CursoP/${id_curso}`);
    };

    return (
        <main>
            <Box>
                <h2>Agregar Estudiante</h2>
                <TextField
                    name="email"
                    label="Email"
                    value={newStudent.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{width: '20vw'}}                    
                />
                <div>
                    <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
                        Agregar
                    </Button>
                </div>
                <div>
                    <Button variant="contained" color="secondary" onClick={handleBackToCourse}>
                        Volver al Curso
                    </Button>
                </div>
            </Box>
        </main>
    );
}
