function encontrarMayor (numeros)
{
    if (!Array.isArray(numeros) || numeros.lenght === 0)
    {
        throw new Error('Debe proporcionar un arreglo de números válido');
    }

    return Math.max(...numeros);
}

//Exporta la función de encontrarMayor para poder usarla posteriormente
module.exports = encontrarMayor;