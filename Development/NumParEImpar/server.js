// Ejercicio para deducir si el número ingresado es par o impar en CodeWars
// par = even
// impar = Odd

// La solución es que si el número es divisible entre 2 y el residuo es = 0, entonces el número por consecuencia es par.
//                    si el número no es divisible entre 2, por consecuencia el residuo de la división es diferente de cero y el número es impar

function evenOrOdd(number) 
{
    if (number % 2 === 0) 
    {
        return "Even";
    }
    else 
    {
        return "Odd"
    }
}

//function evenOrOdd(number) {
//  return number % 2 === 0 ? 'Even' : 'Odd';
//}