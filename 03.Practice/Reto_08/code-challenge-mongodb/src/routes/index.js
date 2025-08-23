// Archivo principal de rutas, donde se agrupan todas
import express from "express";
import librosRoutes from "./librosRoutes.js";

const router = express.Router();

// Ruta base para los libros
router.use("/", librosRoutes);

export default router;