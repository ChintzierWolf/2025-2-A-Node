const express = require('express');
const jwt = require ('jsonwebtoken');
const connectDB = require ('./src/config/database');
const TaskRoutes = require ('./src/routes/TaskRoutes');
const port = 3000;

//use data

const user = {
    id: 123,
    name: 'Ana',
    role: 'Admin'
}

//Generar el token
const token = jwt.sign(user, 'clave_secreta', {expiresIn: '1h'});
console.log('Token jwt = ', token);

const validateToken = (() => {
    try {
        const data = jwt.verify(token, 'clave_secreta');
        console.log('Token Validate: ', data);
    }
    catch (err){
        console.log('Invalid token', err);
    }
});

const app = express();

connectDB (app);

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Ewlcome To Tasks API');
    validateToken();
});

app.use('/api', TaskRoutes);


app.listen(port, () => { console.log('Server is running');});