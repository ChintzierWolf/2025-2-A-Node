// Importamos mongoose para manejar la conexión con MongoDB
import mongoose from "mongoose";

// Función que conecta a la base de datos usando la URI del archivo .env
export const connectDB = async () => {
  try 
  {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado correctamente");
  } 
  
  catch (error) 
  {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};
