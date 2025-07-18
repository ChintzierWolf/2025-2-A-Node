// Vázquez Sánchez, César Adolfo
// Grupo de: Martes y Jueves de 7 a 10 de la noche
// BootCamp de Octubre

const http = require('http');

const { invertirCadena } = require('./utils/invertir');

const PORT = 3000;

const server = http.createServer((req, res) => 
{
  // TODO : Manejar las rutas y peticiones

  // se deconstruye el objeto en un párametro de url y method, para saber si es un get o un erase
  // req.method, req.url. ya no se tiene que utilizar las variables complejas como tal

  const { method, url } = req;

  if (req.pathname === '/invertir' && req.method === 'GET') {
    const texto = query.texto;

    if (!texto) 
    {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Falta el parámetro "?texto=palabra"' }));
    }

    const resultado = 
    {
      original: texto,
      invertido: invertirCadena(texto)
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(resultado));
  
  } 
  else 
  {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

// TODO : Escuchar en el puerto 3000

// Inicia el servidor y lo pone a escuchar en el puerto 3000.
// Cuando el servidor está listo, muestra un mensaje en la consola.
server.listen(PORT , () => 

{ console.log(`Servidor escuchando en http://localhost:${PORT}`); });
