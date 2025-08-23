// Definimos las rutas para los libros y conectamos con el controlador
import express from "express";
import 
{
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
  obtenerEstadisticas
} from "../controllers/librosController.js";

const router = express.Router();

// Se definen las rutas del CRUD
router.get("/libros", obtenerLibros);
router.get("/libros/:id", obtenerLibroPorId);
router.get("/stats", obtenerEstadisticas);
router.post("/libros", crearLibro);
router.put("/libros/:id", actualizarLibro);
router.delete("/libros/:id", eliminarLibro);

export default router;
