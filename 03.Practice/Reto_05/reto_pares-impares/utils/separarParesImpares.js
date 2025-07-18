export function separarParesImpares(numeros) 
{
  const pares = [];
  const impares = [];

  for (const num of numeros) {
    if (num % 2 === 0) {
      pares.push(num);
    } else {
      impares.push(num);
    }
  }
}
