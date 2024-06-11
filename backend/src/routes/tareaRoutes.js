const express = require("express");
const router = express.Router();
const {tareaController} = require('../controllers/tareaController');

router.get('/tema/:id_tema', tareaController.getTareasPorTema);
router.get('/estudiante/:id_est/curso/:id_curso', tareaController.getTareasPorEstudianteYCurso);
router.get('/completadas/tema/:id_tema', tareaController.getTareasCompletadasPorTema);
router.get('/nocompletadas/tema/:id_tema', tareaController.getTareasNoCompletadasPorTema);
router.post('/entregar-estudiante/:estudiante_dni/tarea/:id_tarea', tareaController.entregarTarea);
router.put('/calificar-estudiante/:estudiante_dni/tarea/:id_tarea', tareaController.calificarTarea);
module.exports = router;