//Importación de cada una de las dependencias
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import perfilRoutes from "./routes/perfil.js";

// Configurar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para parsear JSON en las solicitudes
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", perfilRoutes);

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.json({
    message: "🔑 Servidor de autenticación JWT funcionando",
    endpoints: {
      login: "POST /api/auth/login",        // Login
      perfil: "GET /api/perfil",            // Perfil Log
    },
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});