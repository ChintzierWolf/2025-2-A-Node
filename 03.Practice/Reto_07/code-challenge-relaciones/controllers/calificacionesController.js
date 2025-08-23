const estudiantes = require("../data/estudiantes");
const cursos = require("../data/cursos");
const calificaciones = require("../data/calificaciones");

// Función que combina las entidades y retorna la información completa
// Sin validaciones de filtros para curso, estudiante, y calificación mínima

function obtenerCalificaciones(req, res) 
{
    try 
    {
    /*
    //Sin filtros de cursos, estudiantes, y calificación mínima
    const resultado = calificaciones.map((calificacion) => {
        // Buscar estudiante y curso relacionados
        const estudiante = estudiantes.find(e => e.id === calificacion.estudianteId);
        const curso = cursos.find(c => c.id === calificacion.cursoId);  
        // Validar existencia de relaciones
        if (!estudiante || !curso) 
        {
            throw new Error(`Relación no encontrada para calificación ID ${calificacion.id}`);
        }   
        // Retornar estructura deseada
        return {
          nombre: estudiante.nombre,
          curso: curso.nombre,
          calificacion: calificacion.calificacion
        };
    });
    */

    // Con el filtro de cursos estudiantes y calificación mínima
    const { curso, estudiante, califMinima } = req.query;

    // Filtrar calificaciones según los parámetros opcionales
    let filtradas = calificaciones.filter((calificacion) => {
      const estudianteRelacionado = estudiantes.find(e => e.id === calificacion.estudianteId);
      const cursoRelacionado = cursos.find(c => c.id === calificacion.cursoId);

      // Validación de integridad: verificar que existan relaciones
      if (!estudianteRelacionado || !cursoRelacionado) {
        throw new Error(`Relación faltante en calificación ID ${calificacion.id}`);
      }

      // Aplicar filtros si existen en la query
      if (curso && cursoRelacionado.nombre !== curso) return false;
      if (estudiante && !estudianteRelacionado.nombre.toLowerCase().includes(estudiante.toLowerCase())) return false;
      if (califMinima && calificacion.calificacion < parseInt(califMinima)) return false;

      return true;
    });

    // Transformar datos a la estructura deseada
    const resultado = filtradas.map((calificacion) => {
      const estudianteRelacionado = estudiantes.find(e => e.id === calificacion.estudianteId);
      const cursoRelacionado = cursos.find(c => c.id === calificacion.cursoId);

      return {
        nombre: estudianteRelacionado.nombre,
        curso: cursoRelacionado.nombre,
        calificacion: calificacion.calificacion
      };
    });

    res.json(resultado);
  } 
    catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
}

module.exports = { obtenerCalificaciones };

