// Importamos Sequelize para manejar la conexión con MySQL
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargamos variables de entorno desde .env
dotenv.config();

// Creamos una instancia de Sequelize con los datos de conexión
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // Oculta logs SQL en consola
  }
);

// Función para autenticar y sincronizar la base de datos
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a MySQL");
    await sequelize.sync(); // Crea tablas si no existen
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
  }
};