const express = require('express');
const app = express ();
const PORT = 3000;

app.use(express.json());

let tareas = [
    {
        id: 1,
        texto:"Aprender Node.js",
        completada: false
    }
]
app.get("/tareas", (req, res) => { 
    res.json(tareas);
});

app.post("/tareas", (req, res) => {
    const NuevaTarea =
    {
        id: tareas.length+1,
        texto:req.body.texto,
        completada:false
    }

    tareas.push(NuevaTarea);
    res.status(201).json(NuevaTarea);
});

app.put ('/tareas/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);

    if(!tarea)
    {
        return res.status(404).json({error:"Tarea no encontrada"});
    }
});

app.delete()

app.listen (port, () => {
    console.log(`server sunning on port ${PORT}`)
});