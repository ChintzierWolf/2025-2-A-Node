const express = require("express");
const router = express.Router();
const { obtenerCalificaciones } = require("../controllers/calificacionesController");

// Ruta GET /calificaciones que llama al controlador
router.get("/calificaciones", obtenerCalificaciones);

module.exports = router;
