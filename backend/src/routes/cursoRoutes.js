const express = require("express");
const router = express.Router();
const { cursoController } = require("../controllers/cursoController");

router.get("/:id_curso/temas", cursoController.getTemasPorCurso);
router.get("/:id_curso", cursoController.getCursoPorId);
router.post("/crear", cursoController.createCurso);
router.put("/borrar/:id", cursoController.deleteCurso);
router.put('/actualizar/:id', cursoController.updateCurso);

module.exports = router;
