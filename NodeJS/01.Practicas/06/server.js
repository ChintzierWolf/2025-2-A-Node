const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenido a Express!');
});

app.get('/meme', (req, res) =>
{
    res.json
    ({
        imagen: 'O0O0O0O',
        description: 'Cuando tu código funciona a la primera'
    });
});

app.get('/libros/:id', (req, res) => {
    const libroId = req.params.id; //Capturamos el ID del libro
    res.send ('Estás viendo el libro numero: ' + libroId);
});

app.listen(3000,() => {
    console.log('Server runninn on port: 3000')
});