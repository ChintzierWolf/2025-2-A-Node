import express from "express";
import librosRoutes from "./librosRoutes.js";

const router = express.Router();

// Ruta base para libros
router.use("/libros", librosRoutes);

export default router;