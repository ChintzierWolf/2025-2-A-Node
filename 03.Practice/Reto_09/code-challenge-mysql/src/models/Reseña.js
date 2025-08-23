import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definimos el modelo Reseña con relación a Libro
export const Reseña = sequelize.define("Reseña", {
  comentario: { type: DataTypes.TEXT, allowNull: false },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});