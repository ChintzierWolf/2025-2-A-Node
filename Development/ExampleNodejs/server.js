// Es para importar nuestra funcionalidad de la librería express
// librería que se va ausar para éste proyecto.
const express = require('express');

let port = 0;

const environment = process.argv[2];

if (environment.includes('--dev')){
        port = 3000;
}
else if (environment.includes('--qa')){
    port = 3001;
}

const app = express();

// se está creando una constante llamada "app" app.get('/', (req, resp) =>{ la cual contendrá la, 
// referencia a nuestra librería que estamos utilizando, con esto... 
// La constante tiene la facilidad utilizar toda la facilidad que contiene la librería en cuestión

// la librería express no solo proporciona la facilidad de dar un levantamiento y una llamada a un servidor local de manera sencilla
// sino que también sirve para tener el control de las rutas que queremos para el funcionamiento de una API

app.get('/', (req, resp) => {
    resp.send ('Este es mi ejemplo');
});

app.get('/admin', (req, resp) =>{
    resp.send ('Este es mi ejemplo de Admin');
});

app.listen (port, () => {
    console.log('server is running on port', port);
    // lo que va a mostrar en consola serán los parametros que podemos escribir dentro de la consola y que se pueden mostrar.
    console.log('Arguentos de línea de comandos', process.argv);
});