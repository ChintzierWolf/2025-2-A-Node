// Vázquez Sánchez, César Adolfo
// Grupo de: Martes y Jueves de 7 a 10 de la noche
// BootCamp de Octubre

function invertirCadena(texto) 
{
  // TODO: funcionalidad para invertir una cadena de texto

  return texto.split('')    // pasa de string a array
        .reverse()          //invierte el array
        .join('');          //vuelve a unirlo en un string

  // return texto.split('') - Convierte la cadena en un array 
  // de caracteres, pero no la invierte ni la vuelve a unir. Resultado: ['h', 'o', 'l', 'a'].

  // return texto.reverse('') - Esto lanza un error si texto 
  // es un string, porque reverse() es un método de arrays, no de strings. Solo funciona después de hacer split('').

  // return texto.join('') - Este es un pequeño typo: 
  // Además, igual que con reverse, solo funciona sobre arrays.

}

module.exports = { invertirCadena }

// Nota, no pude realizar la elaboración del contenido porque me da un error al momento de integrar ambos programas
// no tengo mucho tiempo en la semana, si me pudieran dejar alguna retroalimentación para después checar estaría bien,

// también, tengo un poco de lío con las sintaxis de algunas cosas, en clase todo bien.
// pero cuando trato de poner en práctica me es muy complicado