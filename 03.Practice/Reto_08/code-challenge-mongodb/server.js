// Configuramos Express, dotenv y conectamos a MongoDB
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import rutas from "./src/routes/index.js";

// Cargamos variables de entorno
dotenv.config({path: './.env'});
console.log("URI de MongoDB:", process.env.MONGO_URI);

// Inicializamos Express
const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Conectamos a la base de datos
connectDB();

// Usamos las rutas definidas
app.use("/", rutas);

// Iniciamos el servidor en el puerto definido
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});