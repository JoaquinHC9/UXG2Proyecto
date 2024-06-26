const express = require("express");
const router = express.Router();
const {publiController} = require("../controllers/publiController");

router.get("/tema/:id_tema", publiController.getPublicacionesPorTema);
router.get("/:id_publicacion", publiController.getPublicacionById);
router.post("/agregar/:id_tema",publiController.agregarPublicacion)
router.post('/agregarTarea/:id_tema', publiController.agregarTarea);
router.get("/tarea/:id_publicacion", publiController.getPublicacionConTarea);
module.exports = router;
