import { Autor } from "./Autor.js";
import { Libro } from "./Libro.js";
import { Reseña } from "./Reseña.js";

// Un autor puede tener muchos libros
Autor.hasMany(Libro, { foreignKey: "autorId", as: "libros" });
Libro.belongsTo(Autor, { foreignKey: "autorId", as: "autor" });

// Un libro puede tener muchas reseñas
Libro.hasMany(Reseña, { foreignKey: "libroId", as: "reseñas" });
Reseña.belongsTo(Libro, { foreignKey: "libroId", as: "libro" });

// Exportamos los modelos para usarlos en el controlador
export { Autor, Libro, Reseña };