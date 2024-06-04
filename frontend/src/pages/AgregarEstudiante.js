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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/cursos/agregarEstudiante/${id_curso}`, newStudent);
            Swal.fire({
                title: 'Estudiante agregado!',
                text: 'El estudiante ha sido agregado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate(`/CursoP/${id_curso}`);
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al agregar el estudiante.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleBackToCourse = () => {
        navigate(`/CursoP/${id_curso}`);
    };

    return (
        <main>
            <Box>
                <h2>Agregar Estudiante</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="email"
                        label="Email"
                        value={newStudent.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Agregar
                    </Button>
                </form>
                <Button variant="contained" color="secondary" onClick={handleBackToCourse}>
                    Volver al Curso
                </Button>
            </Box>
        </main>
    );
}
