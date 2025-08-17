// librería que se va a utilizar para poder hacer uso de cada
// uno de los códigos de respuesta que se encuentran.
// 100, 200, 3000, 400 y 500
const http = require ('http');

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

// Primera parte 

// Se hace una solicitud de servidor con una sola condición
// y el código de respuesta de éxito 200, que es para una solicitud cumplida.

// Y con el uso de texto plano dentro de la pantalla del navegador.
// Sin ningún tipo de filtros o cambios en las fuentes

/*
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hola desde el servidor de NodeJS, con Cesar');
});
*/

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

// Segunda parte

// Se comienza a tener el uso de condiciones de respuesta para diferentes
// situaciones de parámetros dentro de la URL, para solicitudes de tareas.
// Con el uso de ciclos if y el error 404 para un recurso solicitado no encontrado.

const server = http.createServer((req, res) => {
    if (req.url === '/')
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Pagina de Inicio</h1>');
    }

    else if (req.url === '/about')
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h2>Sobre Nosotros</h2>');
    }

    else
    {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Pagina no encontrada</h1>');
    }
});

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});