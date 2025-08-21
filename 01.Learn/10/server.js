const express = require("express");
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const connection = mysql.createPool
({
    host: "localhost",
    user: "root",
    database: "BookLibrary",
});

async function test ()
{
    const [result] = await connection.query("SELECT 1+10 AS result");
    console.log('Connection established', result[0].result);
}

test();

app.post("/books", async (req, res) => {
    try
    {
        const [result] = await connection.query(
        `INSERT INTO Books (title, autor) VALUES (?,?)`,
        [req.body.title, req.body.autor]);
    
        res.status(201).json({ id: result.insertId, ...req.body});
    } 
    
    catch(err)
    {
        res.status(500).json({error: "Error at trying to create new book"});
    }
});

app.get("/books", async (req, res) => {
    try
    {
        const [result] = await connection.query('SELECT * FROM Books');
        res.status(200).json(result);
    } 
    
    catch (err)
    {
        res.status(500).json({error: "Error at trying to get a books"});
    }
});

app.put("/books/:id", async (req, res) => {
    try
    {
        const [result] = await connection.query(`UPDATE Books SET title = ?, autor = ? WHERE id = ?`, 
        [req.body.title, req.body.autor, req.params.id]);

        res.status(200).json({ id: req.params.id, ...req.body});
    } 
    
    catch (err)
    {
        res.status(500).json({error: "Error at trying to update a books"});
    }
});

app.delete("/books/:id", async (req, res) => {
    try
    {
        await connection.query(`DELETE FROM Books WHERE id = ?`, 
        [req.params.id]);

        res.status(204).end();
    } 
    
    catch (err)
    {
        res.status(500).json({error:"Error at trying to delete a book"});
    }
});

const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Server Running on PORT ${PORT}`);
});