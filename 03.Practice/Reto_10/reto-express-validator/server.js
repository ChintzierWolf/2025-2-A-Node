import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import registroRoutes from "./routes/registro.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Cargamos variables de entorno
dotenv.config({path: './.env'});
console.log("URI de MongoDB:", process.env.MONGO_URI);

// Conectamos a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Routes principales
app.use("/api", registroRoutes);

// Error handling Generic middleware 
app.use((err, req, res, next) => {
  console.error("❌ Error no controlado:", err);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});