const express = require("express");
const { profController } = require("../controllers/profController");
const router = express.Router();

router.get("/", profController.getAllProfesores);
router.get("/:email", profController.getProfesor);
router.post("/login", profController.login);
router.post("/register", profController.createProfesor);
router.get("/cursos/:profesor_dni", profController.getCursosByProfesor);
router.put('/actualizar/:email',profController.updateProfesor);
module.exports = router;
