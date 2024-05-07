import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Portal from "./pages/Portal.js";
import LoginEst from "./pages/LoginEstudiante.js";
import LoginProf from "./pages/LoginProfesor.js";
import MainEst from "./pages/MainEstudiante.js";
import MainProf from "./pages/MainProfesor.js";
import Registro from "./pages/Registro.js";
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
          <Route path="/MainProfesor" element={<MainEst isSidebarExpanded={isSidebarExpanded} />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
