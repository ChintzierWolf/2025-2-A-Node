// dentro de éste otro archivo del programa podemos
// utililzar la función anteriormente creada en el archivo saludo
// con el uso de la función require

// con archivo principal en terminación .js

// por el uso de require y module.exports

/*

const saludar = require ('./saludo');

console.log (saludar("Inadaptados"));

*/

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

// Segunda parte del programa, 

// con el uso de: "type": "module", 
// en el packaje.json del programa

import chalk from 'chalk';
import saludar from './saludo.js';

import inquirer from 'inquirer';

inquirer.prompt([
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cómo te llamas?'
    },
    {
        type: 'list',
        name: 'color',
        message: '¿Cuál es tú color favorito?',
        choices:['Rojo','Verde','Amarillo']
    }
])
.then(respuestas => {
    console.log(saludar(respuestas.nombre));
    console.log(`Tu color favorito es: ${respuestas.color}`);
})

//console.log (chalk.blue(saludar("Inadaptados")));

// nota: no se olvide cambiar el nombre del archivo principal
// con terminación .mjs
// ejemplo: ejemplo.mjs en este caso es app.mjs
// para dejar claro a todo el ambiente de JS que es una tarea de
// tipo modulo
