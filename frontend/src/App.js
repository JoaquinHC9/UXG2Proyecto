import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Portal from "./pages/Portal.js";
import LoginEst from "./pages/LoginEstudiante.js";
import MainEst from "./pages/MainEstudiante.js";
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
        <Sidebar isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} /> {/* Aquí pasamos isSidebarExpanded y toggleSidebar como props */}
        <Routes>
          <Route path="/" element={<Portal />} />          
          <Route path="/LoginEstudiante" element={<LoginEst />} /> 
          <Route path="/MainEstudiante" element={<MainEst isSidebarExpanded={isSidebarExpanded} />} /> {/* Aquí también pasamos isSidebarExpanded como prop */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
