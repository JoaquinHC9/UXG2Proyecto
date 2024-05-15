const express = require("express");
const router = express.Router();
const {publiController} = require("../controllers/publiController");

router.get("/tema/:id_tema", publiController.getPublicacionesPorTema);
router.get("/:id_publicacion", publiController.getPublicacionById);

module.exports = router;
