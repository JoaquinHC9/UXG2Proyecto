import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config/config";
import '../styles/Publicacion.css'; 

const Publicacion = () => {
    const { id_publicacion } = useParams();
    const [material, setMaterial] = useState(null);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await axios.get(`${API_URL}/publicaciones/${id_publicacion}`);
                setMaterial(response.data);
            } catch (error) {
                console.error('Error al obtener el material:', error);
            }
        };

        fetchMaterial();
    }, [id_publicacion]);

    return (
        <div className="PublicacionContainer"> 
            <h1>Visualización de Material</h1>
            {material ? (
                <div className="IframeContainer"> 
                    <iframe src={material.url_profesor} title="Material" className="PublicacionIframe"></iframe> 
                </div>
            ) : (
                <p>Cargando material...</p>
            )}
        </div>
    );
};

export default Publicacion;
