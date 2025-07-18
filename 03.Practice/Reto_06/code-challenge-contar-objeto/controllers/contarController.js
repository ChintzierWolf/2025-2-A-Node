/**
 * Función que cuenta las propiedades propias de un objeto
 * @param {Object} objeto - El objeto JSON recibido desde el cuerpo de la petición
 * @returns {number} - Número total de propiedades (claves) propias
 */
export function contarPropiedades(objeto) {
  // Validar que el parámetro recibido sea un objeto y no sea null
  if (typeof objeto !== 'object' || objeto === null || Array.isArray(objeto)) {
    console.warn('⚠️ Parámetro no es un objeto válido');
    return 0;
  }

  // Extraer las claves propias del objeto (ignora propiedades heredadas)
  const claves = Object.keys(objeto);

  // Mostrar en consola las claves encontradas (opcional)
  console.log('🔍 Claves encontradas:', claves);

  // Contar el número de claves
  const cantidad = claves.length;

  // Devolver la cantidad
  return cantidad;
}

