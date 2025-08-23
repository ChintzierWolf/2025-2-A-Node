const express = require("express");
const app = express();
const rutas = require("./routes");

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas definidas
app.use("/", rutas);

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
