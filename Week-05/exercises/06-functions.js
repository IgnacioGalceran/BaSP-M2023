console.log('--EXERCISE 6: FUNCTIONS');

/* a. Crear una función suma que reciba dos valores numéricos y retorne el resultado. Ejecutar la función y guardar el
resultado en una variable, mostrando el valor de dicha variable en la consola del navegador. */

console.log('-Exercise 6.a:');
function add(num1, num2) {
  return num1 + num2;
}
var addition = add(10, 4);
console.log(addition);

/* b. Copiar la función suma anterior y agregarle una validación para controlar si alguno de los parámetros
no es un número; de no ser un número, mostrar un alert aclarando que uno de los
parámetros tiene error y retornar el valor NaN como resultado. */

console.log('-Exercise 6.b:');
function addValid(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    alert('One or both params are not a number');
    return NaN;
  } else return num1 + num2;
}

/* c. Crear una función “validateInteger” que reciba un número como parámetro y
devuelva verdadero si es un número entero. */

console.log('-Exercise 6.c:');
function validInteger(num) {
  if (num % 1 === 0) {
    return true;
  } else return false;
}

/* d. Copiar y renombrar la función suma del ejercicio 6b) y agregarle una llamada a la función del ejercicio 6c.
y que valide que los números sean enteros. En caso que haya decimales mostrar un alert con el error y
retornar el número convertido a entero (redondeado). */

console.log('-Exercise 6.d:');
function addIntValid(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    alert('One or both params are not a number');
    return NaN;
  } else {
    if (validInteger(num1) && validInteger(num2)) return num1 + num2;
    else {
      alert('One or both params are not integer');
      return Math.round(num1) + Math.round(num2);
    }
  }
}

/* e. Convertir la validación del ejercicio 6d) en una función separada y llamarla dentro de una nueva función
probando que todo siga funcionando igual que en el apartado anterior. */

console.log('-Exercise 6.e:');
function intNumValid(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    alert('One or both params are not a number');
    return NaN;
  } else {
    if (num1 % 1 !== 0 || num2 % 1 !== 0) {
      alert('One or both params are not integer');
      return Math.round(num1) + Math.round(num2);
    } else return num1 + num2;
  }
}

function addWithValidation(num1, num2) {
  return intNumValid(num1, num2);
}
