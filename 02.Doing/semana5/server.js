/**
 * Servidor Express principal - Semana 5
 *
 * Este servidor implementa una API REST completa utilizando Express.js con:
 * - Múltiples rutas organizadas en módulos separados
 * - Middleware personalizado para logging
 * - Manejo de JSON automático
 * - Sistema de almacenamiento en archivos JSON
 * - Endpoints para usuarios, productos, búsquedas y utilidades
 */

// Importa la librería Express para crear el servidor web
import express from 'express';
// Importa la función para cargar datos desde archivos JSON al iniciar el servidor
import { loadData } from './src/storage.js';
// Importa todos los módulos de rutas organizados por funcionalidad
import buscarRoutes from './src/routes/buscarRoutes.js';
import edadRoutes from './src/routes/edadRoutes.js';
import homeRoutes from './src/routes/homeRoutes.js';
import perfilRoutes from './src/routes/perfilRoutes.js';
import productsRoutes from './src/routes/productsRoutes.js';
import saludoRoutes from './src/routes/saludoRoutes.js';
import sumaRoutes from './src/routes/sumaRoutes.js';
import usersRoutes from './src/routes/usersRoutes.js';

// Define el puerto donde el servidor escuchará las peticiones
const PORT = 3000;

// Carga los datos iniciales desde los archivos JSON antes de iniciar el servidor
// Utiliza await porque loadData() es una función asíncrona
await loadData();

// Crea una instancia de la aplicación Express
const app = express();

// ===== CONFIGURACIÓN DE MIDDLEWARES =====

// Middleware global para parsear automáticamente el cuerpo de las peticiones JSON
// Esto permite acceder a req.body en las rutas POST/PUT

app.use(express.json());

// ===== CONFIGURACIÓN DE RUTAS =====

// Ruta: http://localhost:3000/api/buscar?producto=teclado&categoria=hardware
// Maneja búsquedas con query parameters para filtrar productos por categoría
app.use('/api', buscarRoutes);

// Ruta: http://localhost:3000/api/edad?anioNacimiento=2000
// Calcula la edad basada en el año de nacimiento proporcionado
app.use('/api', edadRoutes);

// Ruta: http://localhost:3000/Rodrigo?isAdmin=true
// Rutas dinámicas principales que detectan si el usuario es administrador
app.use(homeRoutes);

// Ruta: http://localhost:3000/perfil/rodrigo?lang=es
// Maneja perfiles de usuario con soporte para múltiples idiomas (es, fr, en)
app.use(perfilRoutes);

// Ruta: http://localhost:3000/api/products
// CRUD completo para productos (GET para listar, POST para crear)
app.use('/api', productsRoutes);

// Ruta: http://localhost:3000/saludo/Rodrigo
// Genera saludos personalizados usando el nombre como parámetro de ruta
app.use(saludoRoutes);

// Ruta: http://localhost:3000/suma/4/8
// Realiza operaciones matemáticas (suma) con dos números como parámetros
app.use(sumaRoutes);

// Ruta: http://localhost:3000/api/users
// CRUD completo para usuarios (GET para listar, POST para crear)
app.use('/api', usersRoutes);

// ===== INICIO DEL SERVIDOR =====

/**
 * Inicia el servidor Express en el puerto especificado
 * Cuando el servidor esté listo, imprime un mensaje de confirmación en la consola
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







//import http from 'http';
//import { logger } from './src/middlewares/logger.js';
//import { parseQuery } from './src/middlewares/parseQuery.js';
//import { usersRouter } from './src/routes/userRoutes.js';
//import { productsRouter } from './src/routes/productRoutes.js';
//import { loadData } from './src/storage.js';
//
//const PORT = 3000;
//
//await loadData();
//
//const server = http.createServer((req, res) => 
//{
//  logger(req, res, () => 
//  {
//    parseQuery(req, res, () => 
//    {
//      const { pathname, method, query } = req;
//
//      if (pathname === '/' && method === 'GET') 
//      {
//        if (query.name && query.admin === 'true') 
//        
//        { return res.end(`Welcome Admin ${query.name} to your API`); }
//        
//        if (query.name) 
//        
//        { return res.end(`Welcome ${query.name}`); }
//        
//        return res.end('Welcome! Agrega ?name=tu_nombre');
//      }
//
//      if (usersRouter(req, res) !== false) return;
//      if (productsRouter(req, res) !== false) return;
//
//      res.writeHead(404, { 'Content-Type': 'text/plain' });
//      res.end('Ruta no encontrada');
//    });
//  });
//});
//
//server.listen(PORT, () => 
//
//  { console.log(`Servidor escuchando en http://localhost:${PORT}`); });
//
//


/*// Importa el módulo http de Node.js
const http = require('http');
// Define el puerto en el que escuchará el servidor
const PORT = 3000;

// Middleware para registrar la solicitud y guardar la fecha/hora en req
function logEvent(req, res, next) {
  // Obtiene la fecha y hora actual
  const dateTime = new Date();
  // Formatea la fecha
  const fecha = dateTime.toLocaleDateString();
  // Formatea la hora
  const hora = dateTime.toLocaleTimeString();
  // Imprime en consola la fecha, hora y URL solicitada
  console.log(`${fecha}-${hora} | Solicitud a ${req.url}`);
  // Guarda la fecha/hora en el objeto req
  req.dateTime = dateTime;
  // Llama al siguiente middleware
  next();
}

// Middleware para validar que venga el parámetro name
function validarNombre(req, res, next) {
  // Parsea la URL de la solicitud
  const url = new URL(req.url, `http://${req.headers.host}`);
  // Obtiene el parámetro 'name' de la query
  const nombre = url.searchParams.get('name');
  // Si existe, lo guarda en req
  if (nombre) { req.nombre = nombre; }
  // Llama al siguiente middleware
  next();
}

// Middleware para validar el parámetro admin
function isAdmin(req, res, next) {
  // Parsea la URL de la solicitud
  const url = new URL(req.url, `http://${req.headers.host}`);
  // Obtiene el parámetro 'admin' de la query
  const admin = url.searchParams.get('admin');
  // Si existe, lo guarda en req como booleano
  if (admin) { req.admin = (admin === 'true'); }
  // Llama al siguiente middleware
  next();
} 

// Función para medir el tiempo de respuesta
function medirTiempo(beginDate, endDate) {
  // Retorna la diferencia en milisegundos
  return endDate - beginDate;
}

// Crea el servidor HTTP
const server = http.createServer((req, res) => {
  // Ignora la ruta /favicon.ico
  if (req.url === '/favicon.ico') {
    res.writeHead(204); // Sin contenido
    return res.end();
  }

  // Encadena los "middlewares" de forma manual
  logEvent(req, res, () => {
    validarNombre(req, res, () => {
      isAdmin(req, res, () => {
        // Solo responde a la raíz con parámetros
        if (req.url.startsWith('/?')) {
          // Si es admin y tiene nombre
          if (req.admin && req.nombre) {
            res.end('Welcome Admin ' + req.nombre + ' to your API');
            // Si no es admin pero tiene nombre
          } else if (!req.admin && req.nombre) {
            res.end('Welcome ' + req.nombre);
          }
        } else {
          // Si la ruta no es válida, responde 404
          res.statusCode = 404;
          res.end('404');
        }
        // Muestra el tiempo de respuesta en consola
        console.log(`⏱️ Tiempo de respuesta: ${medirTiempo(req.dateTime, new Date())} ms`);
      });
    });
  });
});

// Inicia el servidor y muestra un mensaje en consola
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
}); */