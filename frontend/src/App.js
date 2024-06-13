import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//componentes
import Sidebar from "./components/Sidebar";

//paginas
import Portal from "./pages/Portal.js";
import Perfil from "./pages/Perfil.js"
import Registro from "./pages/Registro.js";
//pagina est
import Publicacion from './pages/Publicacion';
import CursoDetalleEst from './pages/CursoDetalleEst.js';
import LoginEst from "./pages/LoginEstudiante.js";
import MainEst from "./pages/MainEstudiante.js";
import Instrucciones from "./pages/Instrucciones.js";
// pagina prof
import MainProf from "./pages/MainProfesor.js";
import CursoDetalleProf from './pages/CursoDetalleProf.js';
import LoginProf from "./pages/LoginProfesor.js";
import AgregarEstudiante from './pages/AgregarEstudiante.js';
import Actividades from "./pages/Actividades.js";
import TareaDetalle from "./pages/TareaDetalle.js";
//main
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
          {/*rutas generales*/}
          <Route path="/" element={<Portal />} />
          <Route path="/Registro" element={<Registro />} /> 

          {/*rutas estudiante*/}
          <Route path="/LoginEstudiante" element={<LoginEst />} />
          <Route path="/MainEstudiante" element={<MainEst isSidebarExpanded={isSidebarExpanded} />} /> 
          <Route path="/CursoE/:id_curso" element={<CursoDetalleEst isSidebarExpanded={isSidebarExpanded} />} />
          <Route path="/Publicacion/:id_publicacion" element={<Publicacion />} />
          <Route path="/Instrucciones/:id_publicacion" element={<Instrucciones />} />
          <Route path="/Perfil/" element={<Perfil  />} />

          {/*rutas profesor*/}
          <Route path="/LoginProfesor" element={<LoginProf />} /> 
          <Route path="/MainProfesor" element={<MainProf isSidebarExpanded={isSidebarExpanded}/>} />
          <Route path="/CursoP/:id_curso" element={<CursoDetalleProf isSidebarExpanded={isSidebarExpanded} />} />
          <Route path="/CursosP/:id_curso/Add" element={<AgregarEstudiante />} />
          <Route path="/CursoP/:id_curso/actividad/:id_publicacion" element={<Actividades />} />          
          <Route path="/CursoP/:id_curso/actividad/:id_publicacion/detalle/:id_est_tarea" element={<TareaDetalle />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
