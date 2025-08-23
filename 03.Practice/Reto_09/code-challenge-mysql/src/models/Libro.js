import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definimos el modelo Libro con relación a Autor
export const Libro = sequelize.define("Libro", {
  titulo: { type: DataTypes.STRING, allowNull: false, unique: true },
  año: { type: DataTypes.INTEGER, allowNull: false },
  genero: { type: DataTypes.STRING, allowNull: false },
});