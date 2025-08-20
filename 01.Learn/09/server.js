const express = require('express');
const connectDB = require('./src/config/database');
const taskRoutes = require('./src/routes/TaskRoutes');
const port = 3000;

const app = express();

connectDB(app);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Tasks API');
});

app.use('/api', taskRoutes);

app.listen(port, () =>{
    console.log('Server is Running');
});