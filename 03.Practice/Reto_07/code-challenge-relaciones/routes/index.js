const express = require("express");
const router = express.Router();
const calificacionesRoutes = require("./calificacionesRoutes");

// Ruta principal opcional
router.get("/", (req, res) => {
  res.send("🎓 Bienvenido a la API de Calificaciones. Usa /calificaciones para consultar datos.");
});

// Usar las rutas de calificaciones
router.use("/", calificacionesRoutes);

module.exports = router;
