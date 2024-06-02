const express = require("express");
const router = express.Router();
const { estCursoController } = require("../controllers/estCursoController");

router.get("/:dni/cursos", estCursoController.obtenerCursosPorDNI);
router.get("/:id_curso", estCursoController.obtenerEstudiantesPorCurso);

module.exports = router;
