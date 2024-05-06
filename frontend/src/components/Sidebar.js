import React from 'react';
import '../styles/Sidebar.css';
import { SidebarDataEst } from './SidebarDataEst';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ isSidebarExpanded, toggleSidebar }) {
  const navigate = useNavigate();

  const location = useLocation();
  const isLoginRoute = location.pathname === '/' || location.pathname === '/LoginProfesor' || location.pathname === '/LoginEstudiante';

  if (isLoginRoute) {
    return null;
  }

  const handleLogout = () => {
    // Implementa tu lógica de cierre de sesión aquí
    navigate('/');
  };

  return (
    <div className={`Sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <MenuIcon />
      </div>

      {isSidebarExpanded && (
        <ul className="SidebarList">
          {SidebarDataEst.map((val, key) => (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? 'active' : ''}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="logout-button" onClick={handleLogout}>        
        <ExitToAppIcon />
        <div>Cerrar Sesión</div>
      </div>
    </div>
  );
}
