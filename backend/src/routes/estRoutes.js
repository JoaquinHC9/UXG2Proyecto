const express = require('express');
const {estController} = require ('../controllers/estController');
const router = express.Router();

router.get('/', estController.getAll);
router.get("/:email", estController.getEstudiante);
router.post("/register", estController.createEstudiante);
router.post("/login", estController.login);
router.get('/dni/:dni', estController.getEstudianteByDni);
router.get('/:dni/cursos', estController.obtenerCursosPorDNI);
router.put('/actualizar/:email',estController.updateEstudiante);
module.exports = router;