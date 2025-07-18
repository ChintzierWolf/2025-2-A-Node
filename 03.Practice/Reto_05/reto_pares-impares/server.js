import express from 'express';
import {separarParesImpares} from './utils/separarParesImpares.js';

const app = express ();
const PORT = 3000;

app.get('/filtrar', (req, res) => 
{
  const { numeros } = req.query;

  if (!numeros) 
  {
    return res.status(400).json({
      error: "El parámetro 'numeros' es requerido",
      ejemplo: "?numeros=1,2,3,4,5"
    });
  }

  const arreglo = numeros.split(',').map(n => Number(n));
  const contieneInvalidos = arreglo.some(n => isNaN(n));

  if (contieneInvalidos) 
  {
    return res.status(400).json({
      error: 'Todos los valores deben ser números válidos'
    });
  }

  const { pares, impares } = separarParesImpares(arreglo);

  res.json({
    original: arreglo,
    pares,
    impares
  });

  return { pares, impares };
});

app.listen(PORT, () => {console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);});
