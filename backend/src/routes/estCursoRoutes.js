const express = require('express');
const router = express.Router();
const estudianteCursoController = require('../controllers/estCursoController');

router.get('/:dni/cursos', estudianteCursoController.obtenerCursosPorDNI);

module.exports = router;
