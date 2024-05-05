import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Portal from "./pages/Portal.js";
import LoginEst from "./pages/LoginEstudiante.js";
import MainEst from "./pages/MainEstudiante.js";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Router>
        <Helmet>
          <title>SmartClass</title>
        </Helmet>        
        <Routes>
          <Route path="/" element={<Portal />} />          
          <Route path="/login-estudiante" element={<LoginEst />} /> 
          <Route path="/EstudianteMain" element={<MainEst />} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
