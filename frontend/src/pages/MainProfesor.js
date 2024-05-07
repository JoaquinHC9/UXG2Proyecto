import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/MainEstudiante.css';

export default function MainEstudiante({ isSidebarExpanded }) {   
    return (    
        <body>
            <div className={isSidebarExpanded ? 'header-container expanded' : 'header-container collapsed'}>
                <h1>SmartClass</h1>
                <div className="search-bar">
                    <SearchIcon />
                    <input type="text" placeholder="Buscar..." />
                </div>
            </div>
            <nav></nav>
            <main>
                <div>
                    Contenido Principal
                </div>
            </main>
            <footer></footer>
        </body>
    );
}
