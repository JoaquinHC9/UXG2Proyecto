const express = require("express");
const { profController } = require("../controllers/profController");
const router = express.Router();

router.get("/", profController.getAllProfesores);
router.get("/:email", profController.getProfesor);
router.post("/login", profController.login);
router.post("/register", profController.createProfesor);
router.get("/cursos/:profesor_dni", profController.getCursosByProfesor);
router.put('/actualizar/:email',profController.updateProfesor);
router.put('/actualizar-contra/:email',profController.updateContra);
module.exports = router;
