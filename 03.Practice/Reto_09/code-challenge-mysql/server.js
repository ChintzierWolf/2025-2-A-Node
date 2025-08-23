import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import rutas from "./src/routes/index.js";

// Cargamos variables de entorno
dotenv.config();

// Inicializamos Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectamos a la base de datos
connectDB();

// Usamos las rutas
app.use("/", rutas);

// Puerto desde .env
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});