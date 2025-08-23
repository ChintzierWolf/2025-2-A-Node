// Importamos los modelos necesarios
import Libro from "../models/Libro.js";
import Autor from "../models/Autor.js";
import Reseña from "../models/Reseña.js";
import mongoose from "mongoose";

// GET /libros - Listar todos los libros con su autor
export const obtenerLibros = async (req, res) => {
  try 
  {
    /*
    // Primera parte, sin filtros adicionales
    const libros = await Libro.find().populate("autorId");
    res.json(libros);
    */
    
    // Segunda parte extra, con filtros de autor, página género y año
    // Páginación y texto
    const { genero, año, autor, page = 1, limit = 10, buscar } = req.query;

    const query = {};

    // Filtro por género
    if (genero) query.genero = genero;

    // Filtro por año
    if (año) query.año = Number(año);

    // Filtro por autor (por nombre, no por ID)
    if (autor) {
      const autorEncontrado = await Autor.findOne({ nombre: autor });
      if (autorEncontrado) {
        query.autorId = autorEncontrado._id;
      } else {
        return res.status(404).json({ error: "Autor no encontrado" });
      }
    }

    // Búsqueda por texto en título o género
    if (buscar) {
      query.$or = [
        { titulo: { $regex: buscar, $options: "i" } },
        { genero: { $regex: buscar, $options: "i" } },
      ];
    }

    // Paginación
    const skip = (Number(page) - 1) * Number(limit);

    const libros = await Libro.find(query)
      .populate("autorId")
      .skip(skip)
      .limit(Number(limit));
    
    res.json(libros);
  } 
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }

  /*
  - query se construye dinámicamente según los parámetros.
  - regex permite búsquedas parciales y sin distinción de mayúsculas.
  - skip y limit controlan la paginación.
  */
};

// Obtener Estadísticas GET /libros/stats
export const obtenerEstadisticas = async (req, res) => {
  try {
    const stats = await Libro.aggregate([
      {
        $group: {
          _id: "$genero",
          totalLibros: { $sum: 1 },
        },
      },
      {
        $sort: { totalLibros: -1 },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

// GET /libros/:id - Obtener un libro con autor y reseñas
export const obtenerLibroPorId = async (req, res) => {
  const { id } = req.params;

  // Validamos que el ID sea válido
  if (!mongoose.Types.ObjectId.isValid(id)) 
  {
    return res.status(400).json({ error: "ID inválido" });
  }

  try 
  {
    const libro = await Libro.findById(id).populate("autorId");
    if (!libro) 
    {  
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    const reseñas = await Reseña.find({ libroId: id });
    res.json({ ...libro.toObject(), reseñas });
  } 
  
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
};

// POST /libros - Crear un nuevo libro
export const crearLibro = async (req, res) => {
  try 
  {
    const nuevoLibro = new Libro(req.body);
    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } 
  
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
};

// PUT /libros/:id - Actualizar un libro existente
export const actualizarLibro = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) 
  {
    return res.status(400).json({ error: "ID inválido" });
  }

  try 
  {
    const libroActualizado = await Libro.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!libroActualizado) 
    {  
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    
    res.json(libroActualizado);
  } 
  
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /libros/:id - Eliminar un libro
export const eliminarLibro = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) 
  {
    return res.status(400).json({ error: "ID inválido" });
  }

  try 
  {
    const libroEliminado = await Libro.findByIdAndDelete(id);
    if (!libroEliminado) 
    {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    
    res.json({ mensaje: "Libro eliminado correctamente" });
  } 
  
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
};