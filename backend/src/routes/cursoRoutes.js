const express = require("express");
const router = express.Router();
const { cursoController } = require("../controllers/cursoController");

router.get("/:id_curso/temas", cursoController.getTemasPorCurso);
router.get("/:id_curso", cursoController.getCursoPorId);
router.post("/crear", cursoController.createCurso);
router.put("/borrar/:id", cursoController.deleteCurso);
router.put('/actualizar/:id', cursoController.updateCurso);
router.post('/agregarTema/:id_curso', cursoController.agregarTema);
router.post('/agregarEstudiante/:id_curso',cursoController.agregarEstudiante)

module.exports = router;
