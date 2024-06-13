const express = require("express");
const router = express.Router();
const {tareaController} = require('../controllers/tareaController');

router.get('/estudiante/:id_est/curso/:id_curso', tareaController.getTareasPorEstudianteYCurso);
router.get('/completadas/tema/:id_tema', tareaController.getTareasCompletadasPorTema);
router.get('/nocompletadas/tema/:id_tema', tareaController.getTareasNoCompletadasPorTema);
router.post('/entregar-estudiante/:estudiante_dni/tarea/:id_tarea', tareaController.entregarTarea);
router.put('/calificar-estudiante/:estudiante_dni/tarea/:id_tarea', tareaController.calificarTarea);
router.get('/verificar-completada/:id_tarea/:estudiante_dni', tareaController.verificarTareaCompletada);
router.get('/:id_publicacion/estudiantes', tareaController.obtenerEstudiantesPorTarea);
router.get('/:id_publicacion/:id_est_tarea', tareaController.obtenerDetallesTarea);
module.exports = router;