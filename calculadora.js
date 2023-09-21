// Obtener elementos del DOM
const pantallaInferior = document.getElementById("pantalla-inferior");
const pantallaSuperior = document.getElementById("pantalla-superior");
document.getElementById("x2").addEventListener("click", elevarAlCuadrado);
document.getElementById("x3").addEventListener("click", elevarAlCubo);
document.getElementById("xy").addEventListener("click", elevarALaPotencia);
document.getElementById("1divX").addEventListener("click", calcularInverso);
const numeros = [
  "cero",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
];
const operaciones = [
  { nombre: "suma", signo: "+" },
  { nombre: "resta", signo: "-" },
  { nombre: "multiplicacion", signo: "×" },
  { nombre: "division", signo: "÷" },
];

// Agregar event listeners para los botones de números
for (let i = 0; i < numeros.length; i++) {
  const boton = document.getElementById(numeros[i]);
  boton.addEventListener("click", () => agregarNumero(i));
}

// Agregar event listener para el punto decimal
document
  .getElementById("puntoDecimal")
  .addEventListener("click", agregarPuntoDecimal);

// Agregar event listeners para las operaciones
for (let i = 0; i < operaciones.length; i++) {
  const boton = document.getElementById(operaciones[i].nombre);
  boton.addEventListener("click", () =>
    seleccionarOperacion(operaciones[i].nombre)
  );
}

// Otros event listeners
document.getElementById("delete").addEventListener("click", eliminar);
document.getElementById("M+").addEventListener("click", mPlus);
document.getElementById("M-").addEventListener("click", mMenos);
document.getElementById("MS").addEventListener("click", mS);
document.getElementById("MR").addEventListener("click", mR);
document.getElementById("MC").addEventListener("click", mC);
document.getElementById("CE").addEventListener("click", borrarPantalla);
document.getElementById("C").addEventListener("click", reiniciarCalculadora);
document.getElementById("igual").addEventListener("click", calcularResultado);

// Variables globales
let valorPantallaSuperior = "";
let valorPantallaInferior = "";
let valor1 = 0;
let valor2 = 0;
let operacionRealizada = "";
let resultadoOperacion = 0;
let memoria = 0;

function revisarPantalla() {
  if (valorPantallaInferior.length <= 6) {
    pantallaInferior.style.fontSize = "80px";
  } else if (valorPantallaInferior.length <= 8) {
    pantallaInferior.style.fontSize = "65px";
  } else if (valorPantallaInferior.length <= 10) {
    pantallaInferior.style.fontSize = "55px";
  } else if (valorPantallaInferior.length <= 12) {
    pantallaInferior.style.fontSize = "45px";
  } else {
    pantallaInferior.style.fontSize = "35px";
  }
}

function agregarNumero(numero) {
  if (valorPantallaInferior.length < 12) {
    valorPantallaInferior += numero;
    revisarPantalla();
    pantallaInferior.innerHTML = valorPantallaInferior;
  }
}

function agregarPuntoDecimal() {
  if (valorPantallaInferior.indexOf(".") === -1) {
    valorPantallaInferior += ".";
    pantallaInferior.innerHTML = valorPantallaInferior;
  }
}

function mPlus() {
  memoria += parseFloat(valorPantallaInferior);
  pantallaInferior.innerHTML = "";
}

function mMenos() {
  memoria -= parseFloat(valorPantallaInferior);
  pantallaInferior.innerHTML = "";
}

function mS() {
  memoria = parseFloat(valorPantallaInferior);
  valorPantallaInferior = "";
  pantallaInferior.innerHTML = "0";
}

function mR() {
  valorPantallaInferior = memoria.toString();
  pantallaInferior.innerHTML = valorPantallaInferior;
}

function mC() {
  memoria = 0;
}

function borrarPantalla() {
  valorPantallaInferior = "";
  pantallaInferior.innerHTML = "0";
}

function eliminar() {
  valorPantallaInferior = valorPantallaInferior.slice(0, -1);
  pantallaInferior.innerHTML = valorPantallaInferior;
}

function reiniciarCalculadora() {
  valorPantallaInferior = "";
  revisarPantalla();
  pantallaInferior.innerHTML = "0";
  pantallaSuperior.innerHTML = "";
  valor1 = 0;
  valor2 = 0;
  operacionRealizada = "";
}

function seleccionarOperacion(operacion) {
  console.log("Operación seleccionada:", operacion);

  const operacionSeleccionada = operaciones.find(
    (op) => op.nombre === operacion
  );
  console.log("Operación encontrada:", operacionSeleccionada);

  if (valorPantallaSuperior === "" && valor1 === 0) {
    revisarPantalla();
    valor1 = parseFloat(valorPantallaInferior);
    valorPantallaInferior += operacionSeleccionada.signo;
    pantallaSuperior.innerHTML = valorPantallaInferior;
    valorPantallaInferior = "";
    pantallaInferior.innerHTML = valorPantallaInferior;
    operacionRealizada = operacion;
  } else {
    revisarPantalla();
    valorPantallaInferior += operacionSeleccionada.signo;
    pantallaSuperior.innerHTML = valorPantallaInferior;
    valorPantallaInferior = "";
    pantallaInferior.innerHTML = valorPantallaInferior;
    operacionRealizada = operacion;
  }
}

function calcularResultado() {
  switch (operacionRealizada) {
    case "suma":
      valor2 = parseFloat(valorPantallaInferior);
      resultadoOperacion = valor1 + valor2;
      break;
    case "resta":
      valor2 = parseFloat(valorPantallaInferior);
      resultadoOperacion = valor1 - valor2;
      break;
    case "multiplicacion":
      valor2 = parseFloat(valorPantallaInferior);
      resultadoOperacion = valor1 * valor2;
      break;
    case "division":
      valor2 = parseFloat(valorPantallaInferior);
      if (valor2 !== 0) {
        resultadoOperacion = valor1 / valor2;
      } else {
        resultadoOperacion = "Error";
      }
      break;
    default:
      break;
  }
  valor1 = resultadoOperacion;
  valor2 = 0;
  valorPantallaInferior = resultadoOperacion.toString();

  const longitudMaxima = 6;
  if (valorPantallaInferior.length > longitudMaxima) {
    valorPantallaInferior = resultadoOperacion.toPrecision(longitudMaxima);
  }

  pantallaInferior.innerHTML = valorPantallaInferior;
  pantallaSuperior.innerHTML = "";
  revisarPantalla();
}

function elevarAlCuadrado() {
  valorPantallaInferior = (parseFloat(valorPantallaInferior) ** 2).toString();
  pantallaInferior.innerHTML = valorPantallaInferior;
}

function elevarAlCubo() {
  valorPantallaInferior = (parseFloat(valorPantallaInferior) ** 3).toString();
  pantallaInferior.innerHTML = valorPantallaInferior;
}

function elevarALaPotencia() {
  const exponente = parseFloat(prompt("Ingrese el exponente (y):"));
  if (!isNaN(exponente)) {
    valorPantallaInferior = (
      parseFloat(valorPantallaInferior) ** exponente
    ).toString();
    pantallaInferior.innerHTML = valorPantallaInferior;
  } else {
    alert("Por favor, ingrese un número válido para y.");
  }
}

function calcularInverso() {
  const numero = parseFloat(valorPantallaInferior);
  if (numero !== 0) {
    valorPantallaInferior = (1 / numero).toString();
    const longitudMaxima = 8;
    if (valorPantallaInferior.length > longitudMaxima) {
      valorPantallaInferior = valorPantallaInferior.slice(0, longitudMaxima);
    }
    pantallaInferior.innerHTML = valorPantallaInferior;
  } else {
    alert("No se puede dividir por cero.");
  }
}
