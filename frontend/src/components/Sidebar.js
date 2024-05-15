import React from 'react';
import '../styles/Sidebar.css';
import { SidebarDataEst } from './SidebarDataEst';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function Sidebar({ isSidebarExpanded, toggleSidebar }) {
  const navigate = useNavigate();

  const location = useLocation();
  const isLoginRoute = location.pathname === '/' || location.pathname === '/LoginProfesor' || location.pathname === '/LoginEstudiante'|| location.pathname === '/Registro';

  if (isLoginRoute) {
    return null;
  }

  const userType = localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const handleMainClick = () => {
    const mainRoute = userType === 'estudiante' ? '/MainEstudiante' : '/MainProfesor';
    navigate(mainRoute);
  };

  return (
    <div className={`Sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <MenuIcon />
      </div>

      {isSidebarExpanded && (
        <ul className="SidebarList">
          <li className="row" onClick={handleMainClick}>
            <div id="icon">{<HomeIcon />}</div>
            <div id="title">Main</div>
          </li>
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
          <li className="row" onClick={handleLogout}>
            <div id="icon">{<ExitToAppIcon />}</div>
            <div id="title">Cerrar Sesión</div>
          </li>
        </ul>
      )}
    </div>
  );
}
