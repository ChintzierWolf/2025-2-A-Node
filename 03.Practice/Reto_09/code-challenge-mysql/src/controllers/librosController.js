import { Libro, Autor, Reseña } from "../models/index.js";
import { Op } from "sequelize";

// 1 GET /libros - Listar todos los libros con su autor
// 2 GET /libros - con filtros, paginación, búsqueda y ordenamiento

export const obtenerLibros = async (req, res) => {
  try 
  {
    /*
    // Primera parte, solo el listado de los libros por autor
    const libros = await Libro.findAll({
      include: { model: Autor, as: "autor" },
    });
    res.json(libros);
    */
    
    // Segunda parte o bonus, con filtros, paginación, búsqueda y ordenamiento
    // Extraemos parámetros de consulta
    const { genero, año, autor, buscar, page = 1, limit = 10, orden = "id", dir = "asc" } = req.query;

    // Construimos el objeto de filtros dinámicamente
    const filtros = {};

    if (genero) filtros.genero = genero;
    if (año) filtros.año = año;

    // Búsqueda por texto en título o género
    if (buscar) 
    {
      filtros[Op.or] = 
      [
        { titulo: { [Op.like]: `%${buscar}%` } },
        { genero: { [Op.like]: `%${buscar}%` } },
      ];
    }

    // Si se especifica autor por nombre, buscamos su ID
    let autorFiltro = {};
    if (autor) 
      {
        const autorEncontrado = await Autor.findOne
      ({
        where: { nombre: { [Op.like]: `%${autor}%` } },
      });
      
      if (autorEncontrado) 
      {
        filtros.autorId = autorEncontrado.id;
      } 
      else 
      {
        return res.status(404).json({ error: "Autor no encontrado" });
      }
    }

    // Paginación: calculamos offset y limit
    const offset = (Number(page) - 1) * Number(limit);

    // Ordenamiento: por campo y dirección
    const ordenamiento = [[orden, dir.toUpperCase() === "DESC" ? "DESC" : "ASC"]];

    // Ejecutamos la consulta con filtros, paginación y relaciones
    const libros = await Libro.findAll({
      where: filtros,
      include: { model: Autor, as: "autor" },
      offset,
      limit: Number(limit),
      order: ordenamiento,
    });

    res.json(libros); 
  } 
  catch (error) 
  {
    res.status(500).json({ error: "Error al obtener libros", detalle: error.message});
  }

  /*
  //Notas:
  - Usamos Op.like para búsquedas parciales (similar a regex en MongoDB).
  - Sequelize permite combinar where, include, order, offset, y limit en una sola consulta.
  - El ordenamiento es seguro y controlado, evitando inyecciones al validar dir.
  */
};

// GET /libros/:id - Obtener un libro con autor y reseñas
export const obtenerLibroPorId = async (req, res) => {
  try 
  {
    const libro = await Libro.findByPk(req.params.id, {
      include: 
      [
        { model: Autor, as: "autor" },
        { model: Reseña, as: "reseñas" },
      ],
    });
    
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    
    res.json(libro);
  } 
  catch (error) 
  {
    res.status(500).json({ error: "Error al obtener el libro" });
  }
};

// POST /libros - Crear un nuevo libro
export const crearLibro = async (req, res) => {
  try 
  {
    const nuevoLibro = await Libro.create(req.body);
    res.status(201).json(nuevoLibro);
  } 
  catch (error) 
  {
    res.status(400).json({ error: "Error al crear el libro" });
  }
};

// PUT /libros/:id - Actualizar un libro existente
export const actualizarLibro = async (req, res) => {
  try 
  {
    const libro = await Libro.findByPk(req.params.id);
    
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    await libro.update(req.body);
    res.json(libro);
  } 
  catch (error) 
  {
    res.status(400).json({ error: "Error al actualizar el libro" });
  }
};

// DELETE /libros/:id - Eliminar un libro
export const eliminarLibro = async (req, res) => {
  try 
  {
    const libro = await Libro.findByPk(req.params.id);
    
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    await libro.destroy();
    res.json({ mensaje: "Libro eliminado correctamente" });
  } 
  catch (error) 
  {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};