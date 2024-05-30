import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Portal from "./pages/Portal.js";
import LoginEst from "./pages/LoginEstudiante.js";
import LoginProf from "./pages/LoginProfesor.js";
import MainEst from "./pages/MainEstudiante.js";
import Perfil from "./pages/Perfil.js"
import MainProf from "./pages/MainProfesor.js";
import Registro from "./pages/Registro.js";
import CursoDetalle from './pages/CursoDetalle';
import Publicacion from './pages/Publicacion';
import { Helmet } from "react-helmet";
import React, { useState } from 'react';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="App">
      <Router>
        <Helmet>
          <title>SmartClass</title>
        </Helmet>
        <Sidebar isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} /> 
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/Registro" element={<Registro />} /> 
          <Route path="/LoginEstudiante" element={<LoginEst />} /> 
          <Route path="/LoginProfesor" element={<LoginProf />} /> 
          <Route path="/MainEstudiante" element={<MainEst isSidebarExpanded={isSidebarExpanded} />} /> 
          <Route path="/MainProfesor" element={<MainProf isSidebarExpanded={isSidebarExpanded} />} /> 
          <Route path="/Curso/:id_curso" element={<CursoDetalle isSidebarExpanded={isSidebarExpanded} />} />
          <Route path="/Publicacion/:id_publicacion" element={<Publicacion />} />
          <Route path="/Perfil/" element={<Perfil  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
