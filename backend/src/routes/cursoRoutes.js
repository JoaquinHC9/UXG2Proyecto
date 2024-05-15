const express = require("express");
const router = express.Router();
const { cursoController } = require("../controllers/cursoController");

router.get("/:id_curso/temas", cursoController.getTemasPorCurso);
router.get("/:id_curso", cursoController.getCursoPorId);

module.exports = router;
