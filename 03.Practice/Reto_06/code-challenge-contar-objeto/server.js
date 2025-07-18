import express from 'express';
import { contarPropiedades } from './controllers/contarController.js';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal POST
app.post('/contar', (req, res) => {
  const datos = req.body;

  // Validación: verificar que se recibió un objeto
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    return res.status(400).json({
      error: 'Se requiere un objeto JSON válido en el cuerpo de la petición',
      ejemplo: {
        nombre: "Ana",
        edad: 25,
        correo: "ana@example.com"
      }
    });
  }

  const propiedades = contarPropiedades(datos);
  res.json({ propiedades });
});

// Ruta GET opcional
app.get('/', (req, res) => {
  res.send('🧠 API lista para contar propiedades de objetos JSON');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
