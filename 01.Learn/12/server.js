const express = require('express');

// La librería Bcrypt, por medio de sus modulos...
// se va a encargar de recoger el valor que le asigenmos 
// a una variable en específico, conviertiéndola en una cadena
// de carácteres encriptada con una longitud específica.

const bcrypt = require('bcryptjs');

const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    
    //Encrypt
    const password = '1234';
    const hashPassword = await bcrypt.hash(password,10);

    // Aquí podemos corroborar que el dato de la encriptación es real,
    // ya que se muestra su valor asignado directamente en la terminal del programa
    console.log('Hashed Password', hashPassword);

    const compare = await bcrypt.compare('1234', hashPassword);
    // Por seguridad, solo la librería Bcrypt  sabrá que es el valor encriptado que agrego
    // a la variable en cuestión
    console.log(compare);

    res.send(hashPassword);
});

app.listen(PORT, () =>{
     console.log('Server is Running');
});
