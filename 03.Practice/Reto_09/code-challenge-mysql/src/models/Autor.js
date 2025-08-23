import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definimos el modelo Autor con sus campos
export const Autor = sequelize.define("Autor", 
{
  nombre: 
  { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  nacionalidad: 
  { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  fechaNacimiento: 
  { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
});