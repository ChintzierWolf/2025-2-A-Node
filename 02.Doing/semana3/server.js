// Importa el módulo nativo 'http' de Node.js para crear el servidor HTTP.
const http = require('http');
// Importa la función manejarRutas desde el archivo de rutas personalizado.
const { manejarRutas } = require('./routes');

// Crea el servidor HTTP y delega el manejo de cada solicitud a la función manejarRutas.
const server = http.createServer((req, res) => {
  manejarRutas(req, res);
});

  // Inicia el servidor y lo pone a escuchar en el puerto 3000.
  // Cuando el servidor está listo, muestra un mensaje en la consola.
  server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});


//const http = require ('http');
//
//const server = http.createServer((req, res) => {
//
//    if(req.url === '/'){
//        // res.writehead(200, {'Content-Type':'text/plain'});
//        // res.end('Hola desde el servidor de')
//        // res.writehead(200, {'Content-Type':'text/html'});
//        // res.end('<h1> Página de inicio <h1>');
//        res.writehead(200, {'Content-Type':'text/html'});
//        res.end('<h1> Bienvenido </h1>');
//    }else if (req.url === '/contacto'){
//        res.writehead(200, {'Content-Type':'text/html'});
//        res.end('<h2> Sobre nosotros </h2>');
//    }else if { (req.url === '/conocenos') {
//        res.writehead(200, {'Content-Type':'text/html'});
//        res.end('<h2> Conocenos </h2>');
//    }else {
//        res.writehead(404, {'Content-Type':'text/html'});
//        res.end('<h1> No se pudo encontrar esta página </h1>');
//    }
//});
//    server.listen (3000, () => {
//    console.log('Server is running on por: 3000 port');
//});

// ¿Cómo saber que es sintaxis básica de JS?
// Por dos cosas básicas, que el archivo a trabajar tiene terminación .js
// Y que además tenemos el uso del require dentro del programa, ya que si se encontrara
// usando un import en su lugar, todo lo anterior cambia a que el nombre del archivo sea
// .mjs y se da a entender que el archivo será de tipo modulo para poder llamar más instancias
// o librerías