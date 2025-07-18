// Vázquez Sánchez, César Adolfo
// Grupo de: Martes y Jueves de 7 a 10 de la noche
// BootCamp de Octubre

// index.js
import inquirer from "inquirer";
// no olvidar instalar en consola la librería con npm i inquirer
import chalk from "chalk";
// no olvidar instalar en consola la librería con npm i chalk

import { esPrimo } from "./primo.js";

inquirer.prompt
([
    {
      type: "number",
      name: "numero",
      message: "Ingresa un número para verificar si es primo:",
     
      // Esta condición la complete por medio de internet.
      // evita que la entrada del número sea un valor string
      validate: (input) => 
      {
        if (isNaN(input)) 
        {
          return "Por favor, ingresa un valor numérico válido.";
        }
        if (input <= 0) 
        {
          return "Ingresa un número mayor que cero.";
        }
        return true;
      },
    },
  ])
  
  .then((res) => {
    const { numero } = res;

    if (esPrimo(numero)) 
    {
      console.log(chalk.green(`${numero} SÍ es un número primo ✅`));
    } 
    
    else 
    {
      console.log(chalk.red(`${numero} NO es un número primo ❌`));
    }
  });