const http = require('http');
const url = require('url');
const encontrarMayor = require('./utils/encontrarMayor');

const server = http.createServer((req, res) => 
{
  const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/mayor') 
    {
        const query = parsedUrl.query;
        const numerosRaw = query.numeros;

    if (!numerosRaw) 
    {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Parámetro "numeros" requerido en la query' }));
      return;
    }

    const numerosArray = numerosRaw.split(',').map(str => Number(str));

    const invalidos = numerosArray.some(num => isNaN(num));

    if (invalidos) 
    {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Todos los elementos deben ser números válidos' }));
      return;
    }

    const mayor = encontrarMayor(numerosArray);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ numeros: numerosArray, mayor }));
    } 
    else 
    {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
});

    server.listen(3000, () => {console.log('Servidor escuchando en http://localhost:3000');
});
