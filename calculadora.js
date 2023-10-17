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
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const mainDisplay = document.querySelector("#main-display img");
const secondDisplay = document.querySelector("#second-display img");
const binariSumOPtion = document.getElementById("binari-sum");
const binariSum = document.getElementById("sumaBinaria");
const numero1Input = document.getElementById("numero1");
const numero2Input = document.getElementById("numero2");
const sumarButton = document.getElementById("sumar");
const restarButton = document.getElementById("restar");
const multiplicarButton = document.getElementById("multiplicar");
const dividirButton = document.getElementById("dividir");
const resultadoDiv = document.getElementById("resultado");
const SumaFechas = document.getElementById("calculadoraFechas");
const opcionesFechas = document.getElementById("opcionesFechas");
const operacionFechas = document.getElementById("date-sum");
opcionesFechas.addEventListener("change", mostrarOpciones);
document.getElementById("delete").addEventListener("click", eliminar);
document.getElementById("M+").addEventListener("click", mPlus);
document.getElementById("M-").addEventListener("click", mMenos);
document.getElementById("MS").addEventListener("click", mS);
document.getElementById("MR").addEventListener("click", mR);
document.getElementById("MC").addEventListener("click", mC);
document.getElementById("CE").addEventListener("click", borrarPantalla);
document.getElementById("C").addEventListener("click", reiniciarCalculadora);
document.getElementById("igual").addEventListener("click", calcularResultado);
document.getElementById("fechaDesde").onchange = function () {
  // Aquí puedes ejecutar tu función personalizada
  diferenciaFechas();
};
document.getElementById("fechaHasta").onchange = function () {
  // Aquí puedes ejecutar tu función personalizada
  diferenciaFechas();
};
// Agregar manejadores de eventos para los clics en los botones
mainDisplay.addEventListener("click", () => {
  mainDisplay.style.backgroundColor = "orange";
  secondDisplay.style.backgroundColor = "gray";
});

secondDisplay.addEventListener("click", () => {
  mainDisplay.style.backgroundColor = "gray";
  secondDisplay.style.backgroundColor = "orange";
});

mainDisplay.addEventListener("click", () => {
  screen1.classList.remove("hidden"); // Ocultar pantalla 1
  screen2.classList.add("hidden");
  binariSum.classList.add("hidden");
  SumaFechas.classList.add("hidden");
});

secondDisplay.addEventListener("click", () => {
  screen1.classList.add("hidden"); // Mostrar pantalla 1
  screen2.classList.remove("hidden");
  binariSum.classList.add("hidden");
  SumaFechas.classList.add("hidden");
});

binariSumOPtion.addEventListener("click", () => {
  screen1.classList.add("hidden"); // Mostrar pantalla 1
  screen2.classList.add("hidden");
  binariSum.classList.remove("hidden");
  SumaFechas.classList.add("hidden");
});

//Solo aceptar 1 y 0 en los inputs y cambiar cualquier otro dato por "".
numero1Input.addEventListener("input", function () {
  let inputValue = this.value;
  this.value = inputValue.replace(/[^01]/g, "");
});

numero1Input.addEventListener("input", function () {
  let inputValue = this.value;
  this.value = inputValue.replace(/[^01]/g, "");
});

operacionFechas.addEventListener("click", () => {
  screen1.classList.add("hidden");
  screen2.classList.add("hidden");
  binariSum.classList.add("hidden");
  SumaFechas.classList.remove("hidden"); // Mostrar pantalla Operaciones con fechas
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("fechaDesde").value = today;
  document.getElementById("fechaHasta").value = today;
});

sumarButton.addEventListener("click", realizarOperacion("sumar"));
restarButton.addEventListener("click", realizarOperacion("restar"));
multiplicarButton.addEventListener("click", realizarOperacion("multiplicar"));
dividirButton.addEventListener("click", realizarOperacion("dividir"));

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

function realizarOperacion(operacion) {
  return function () {
    const numero1 = numero1Input.value;
    const numero2 = numero2Input.value;
    let resultadoBinario = "";
    switch (operacion) {
      case "sumar":
        //valor2 = parseFloat(valorPantallaInferior);
        resultadoBinario = (numero1 + numero2).toString(2); //linea modificada
        console.log("llegue aqui3");
        break;
      case "restar":
        //valor2 = parseFloat(valorPantallaInferior);
        resultadoBinario = (numero1 - numero2).toString(2); //linea modificada
        break;
      case "multiplicar":
        //valor2 = parseFloat(valorPantallaInferior);
        resultadoBinario = (numero1 * numero2).toString(2); //linea modificada
        break;
      case "dividir":
        //valor2 = parseFloat(valorPantallaInferior);
        if (numero2 !== 0) {
          resultadoBinario = Math.floor(numero1 / numero2).toString(2); //linea modificada
        } else {
          resultadoBinario = "Error"; //linea modificada
        }
        break;
      default:
        resultadoDiv.textContent = "Algun cambo esta vacio";
        break;
    }
    resultadoDiv.textContent = `${resultadoBinario}`;
  };
}

function mostrarOpciones() {
  const difFechas = document.getElementById("difFechas");
  const sumFechas = document.getElementById("sumFechas");
  var años = document.getElementById("años");
  var meses = document.getElementById("meses");
  var dias = document.getElementById("dias");
  switch (opcionesFechas.value) {
    case "Diferencia entre fechas":
      sumFechas.classList.add("hidden");
      difFechas.classList.remove("hidden");
      break;
    case "Sumar o restas días":
      for (var i = 0; i <= 999; i++) {
        var optionA = document.createElement("option");
        var optionM = document.createElement("option");
        var optionD = document.createElement("option");
        optionA.text = i;
        optionA.value = i;
        optionM.text = i;
        optionM.value = i;
        optionD.text = i;
        optionD.value = i;
        años.appendChild(optionA);
        meses.appendChild(optionM);
        dias.appendChild(optionD);
      }
      sumFechas.classList.remove("hidden");
      difFechas.classList.add("hidden");
      var today = new Date().toISOString().split("T")[0];
      document.getElementById("fechaDesdeSum").value = today;

      break;
    default:
      break;
  }
}

function sumaRestaFechas() {
  var fecha = new Date(); // Inicializa la fecha como un objeto de fecha
  var fechaSeleccionada = document.getElementById("fechaDesdeSum").value;
  var resultado = document.getElementById("resultadoSumaResta");
  var sumarCheckbox = document.getElementById("sumarFecha");
  var restarCheckbox = document.getElementById("restarFecha");

  // Convertimos la cadena de fecha en un objeto de fecha
  fecha = new Date(fechaSeleccionada);
  var año = document.getElementById("años");
  var mes = document.getElementById("meses");
  var dia = document.getElementById("dias");

  var añoSeleccionado = parseInt(año.value);
  var mesesSeleccionado = parseInt(mes.value);
  var diasSeleccionado = parseInt(dia.value);

  if (sumarCheckbox.checked) {
    fecha.setFullYear(fecha.getFullYear() + añoSeleccionado);
    fecha.setMonth(fecha.getMonth() + mesesSeleccionado);
    fecha.setDate(fecha.getDate() + diasSeleccionado);
  } else if (restarCheckbox.checked) {
    fecha.setFullYear(fecha.getFullYear() - añoSeleccionado);
    fecha.setMonth(fecha.getMonth() - mesesSeleccionado);
    fecha.setDate(fecha.getDate() - diasSeleccionado);
  }

  var resultadoFinal =
    fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
  resultado.innerHTML = resultadoFinal;
}

function diferenciaFechas() {
  var fechaDesdeSeleccionada = document.getElementById("fechaDesde").value;
  var fechaHastaSeleccionada = document.getElementById("fechaHasta").value;
  var resultado = document.getElementById("resultadoDifFecha");

  var fechaDesde = new Date(fechaDesdeSeleccionada);
  var fechaHasta = new Date(fechaHastaSeleccionada);

  var diffTiempo = Math.abs(fechaHasta.getTime() - fechaDesde.getTime());
  var diffDias = Math.floor(diffTiempo / (1000 * 3600 * 24));
  var difEnDias = diffDias;
  if (diffDias === 0) {
    resultado.innerHTML = "Mismas fechas";
  } else {
    var diffAños = Math.floor(diffDias / 365);
    diffDias %= 365;
    var diffMeses = Math.floor(diffDias / 30);
    diffDias %= 30;
    resultado.innerHTML =
      diffAños + " años, " + diffMeses + " meses, " + diffDias + " días";
    resultado.innerHTML += "\n" + difEnDias + " días";
  }
}
