// Primera parte

// se define una función para poder 
// realizar una tarea en específico.
// En éste caso es para guardar una 
// variable nombre para la muestra del mensaje.

// con archivo principal en terminación .js

// por el uso de require y module.exports

/*

function saludar (nombre) {

    return `Hola, ${nombre}!`;
}

module.exports = saludar;
*/

// Para poder definir que es una función que se 
// puede exportar para el uso migratorio
// de otro archivo, necesitamos definir con 
// module.export que la función tiene ese objetivo
// ser utilizada en otra parte del programa

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

// Segunda parte del programa, 

// con el uso de: "type": "module", 
// en el packaje.json del programa

export default function saludar (nombre) {

    return `Hola, ${nombre}!`;
}

// nota: no se olvide cambiar el nombre del archivo principal
// con terminación .mjs
// ejemplo: ejemplo.mjs en este caso es app.mjs
// para dejar claro a todo el ambiente de JS que es una tarea de
// tipo modulo