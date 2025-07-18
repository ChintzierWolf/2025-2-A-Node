// Vázquez Sánchez, César Adolfo
// Grupo de: Martes y Jueves de 7 a 10 de la noche
// BootCamp de Octubre

// primo.js
// de declara y exporta la función esPrimo
export function esPrimo(numero) 
{
  // TODO: funcionalidad para verificar si un número es primo

  if (numero <= 1) return false;
  // si la entrada de número es menor o igual a uno, la salida es errónea
  // ya que los números primos NO son menores o iguales a 1

  if (numero === 2) return true;
  // si la entrada de número es igual a 2 puede continuar con el análisis de la operación
  // ya que si resulta ser 2 el número que se digite pasará directo al resultado

  if (numero % 2 === 0) return false;
  // si el número es divisible entre 2, y el residuo a su vez es 0, la entrada es errónea.
  // ya que quiere decir que el número es par y no primo


  for (let i = 3; i <= Math.sqrt(numero); i += 2) {
    if (numero % i === 0) 
    
    return false;

  // si el número tiene algún divisor impar desde el 3 hasta la raíz cuadrada de numero. Si encuentra uno, no es primo.

  }
  return true;
}