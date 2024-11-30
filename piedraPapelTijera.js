// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //
const jugador = {
    nombre: "",
    partidasActuales: 0,
    partidasTotales: 0,
    }

//Llamadas por variables a los input del HTML
const nombreInput = document.getElementsByName("nombre")[0];
const numParInput = document.getElementsByName("partidas")[0];

//Se asignan las imágenes del menú del jugador como alternativa a modificar el HMTL
const opciones = document.querySelectorAll("#jugador img");
// Establece las rutas de las imágenes
opciones[0].src = "img/piedraJugador.png";
opciones[1].src = "img/papelJugador.png";
opciones[2].src = "img/tijeraJugador.png";

const historial = [];

// Obtiene todas las imágenes dentro del div con ID "jugador"
const imagenesJugador = document.querySelectorAll("#jugador img");

// Se declara e inicializa un array para las imágenes de la máquina
let opcionJugador= "";
// Se declara e inicializa un array para las imágenes de la máquina
const opcionesMaquina = [];

// Se asignan las rutas de las imágenes de la máquina al array
opcionesMaquina[0] = "img/piedraOrdenador.png";
opcionesMaquina[1] = "img/papelOrdenador.png";
opcionesMaquina[2] = "img/tijeraOrdenador.png";

//Validar si el nombre tiene más de 3 caracteres y la primera letra no es un número.
function validarNombre(nombre) {
	//Devuelve True si se cumplen ambas condiciones.
    return nombre.length > 3 && isNaN(parseInt(nombre[0]));
    }

//Comprobamos que el número de partidas introducidas por el usuario es mayor que cero.	
function validarNumPartidas(numPartidas) {
	//Devuelve True si se cumple la condición.
    return numPartidas > 0;
    }

//Añade la funcionalidad al pulsar ¡JUGAR!
/*Añado la función DOMContentLoaded para evitar errores 
al llamamiento de los elementos HTML con el atributo Name*/
document.addEventListener("DOMContentLoaded", function() {
    var botonJugar = document.getElementsByTagName('button')[0];

    botonJugar.addEventListener("click", function jugar() {
        const nombre = nombreInput.value.trim(); //Eliminamos los espacios en blanco del nombre
        const partidasTotales = parseInt(numParInput.value); //Asignamos el valor del número de partidas que el jugador quiere hacer

        // Restablecer las clases antes de realizar las validaciones
        nombreInput.classList.remove("fondoRojo");
        numParInput.classList.remove("fondoRojo");
		
		//En el caso de que ambas condiciones se cumplan
        if (validarNombre(nombre) && validarNumPartidas(partidasTotales)) {
            jugador.nombre = nombre;
            jugador.partidasActuales = 0;
            jugador.partidasTotales = partidasTotales;
			
			//Desactiva los botones
			desactivarCamposTexto(true);
			
			//Se añade el número de partidas totales al HTML
            document.getElementById("total").textContent = jugador.partidasTotales;

            mostrarMensaje("Nueva partida");
			
			// Asigna la función seleccionarOpcion al evento de clic de cada imagen
			imagenesJugador.forEach(imagen => {
			imagen.addEventListener("click", seleccionarOpcion);
			});  
			
        } else {
			// En el caso de que una de las condiciones anteriores no se cumpla
            // Si no se cumple la condición del nombre.
            if (!validarNombre(nombre)) {
                nombreInput.classList.add("fondoRojo");
                mostrarMensaje("Nombre erróneo");
            }

            // Si no se cumple la condición del número de partidas.
            if (!validarNumPartidas(partidasTotales)) {
                numParInput.classList.add("fondoRojo");
                mostrarMensaje("Número de partidas erróneo");
            }
        }
    });
});

//Desactivar los campos de texto
function desactivarCamposTexto(desactivar) {
    nombreInput.disabled = desactivar;
    numParInput.disabled = desactivar;
    }

	
function seleccionarOpcion(event) {
    // Remover las clases "seleccionado" y "noSeleccionado" de todas las opciones dentro del div con ID "jugador"
    document.querySelectorAll("#jugador img").forEach(opcion => opcion.classList.remove("seleccionado", "noSeleccionado"));

    // Agregar la clase "seleccionado" a la opción seleccionada
    event.target.classList.add("seleccionado");

    // Obtener la posición de la opción seleccionada en el array de imágenes
	opcionJugador = posibilidades[Array.from(imagenesJugador).indexOf(event.target)];
    console.log("Posición en el array de imágenes: " + opcionJugador); 
}

document.addEventListener("DOMContentLoaded", function() {
    var botonYa = document.getElementsByTagName('button')[1];
	botonYa.addEventListener("click", function() {
		// Verifica si se ha jugado al menos una partida
		console.log("partidas totales " + jugador.partidasTotales);
		console.log("partidas actuales " + jugador.partidasActuales);
		if (jugador.partidasTotales > jugador.partidasActuales) {
			console.log("no ha jugado aún");
			// Genera una opción aleatoria para la máquina
			const opcionMaquina = generarOpcionAleatoria();
			
			// Actualiza la imagen de la máquina
			document.getElementById("maquina").innerHTML = `<img src="${opcionesMaquina[opcionMaquina]}" alt="Máquina" />`;
			
			const opcionMaquinaStr = posibilidades[opcionMaquina];
			console.log("la maquina ha elegido: " + opcionMaquinaStr);
			//Actualizar contadores
			actualizarContadores(jugador.partidasActuales);
			
			// PRUEBA CONSTRUCCIÓN DEL CÓDIGO -> console.log("Partidas actuales" + jugador.partidasActuales);
			// PRUEBA CONSTRUCCIÓN DEL CÓDIGO -> console.log("La máquina seleccionó: " + opcionMaquinaStr);
			// PRUEBA CONSTRUCCIÓN DEL CÓDIGO -> console.log("el jugador: " + opcionJugador);
			
			// Retrasa la ejecución del código de alerta por 100 milisegundos (ajusta según sea necesario)
			setTimeout(function () {
				// Puedes realizar otras acciones según sea necesario
				const resultado = determinarResultado(opcionJugador, opcionMaquinaStr);
				actualizarHistorial(resultado);
				console.log("El resultado es:" + resultado);
			}, 100);
		} else {
			// Muestra un mensaje indicando que se debe jugar primero
			mostrarMensaje("Partidas finalizadas.")
		}
	});
});

// Función para generar una opción aleatoria para la máquina
function generarOpcionAleatoria() {
    return Math.floor(Math.random() * posibilidades.length);
}

//Incrementa de uno el número de la partida actual y lo muestra en el HTML
function actualizarContadores(contador) {
	jugador.partidasActuales++;
	document.getElementById("actual").textContent = jugador.partidasActuales;
	}

//Analiza el resultado	
function determinarResultado(opcionJugador, opcionMaquina) {
    let resultadoMensaje;
console.log("Jugador: " +opcionJugador);
console.log("Maquina: " +opcionMaquina);
    
	const posicionJugador = posibilidades.indexOf(opcionJugador);
    const posicionMaquina = posibilidades.indexOf(opcionMaquina);

    if ((posicionMaquina + 1) % posibilidades.length === posicionJugador) {
        resultadoMensaje = "Gana " + jugador.nombre;
    } else if (posicionJugador === posicionMaquina) {
        resultadoMensaje = "Empate";
    } else {
        resultadoMensaje = "Gana la máquina";
    }

	/*if (opcionJugador === opcionMaquina) {
        resultadoMensaje = "Empate";
    } else if (
        (posibilidades.indexOf(opcionJugador) === 0 && posibilidades.indexOf(opcionMaquina) === posibilidades.length - 1) ||
        (posibilidades.indexOf(opcionJugador) < posibilidades.indexOf(opcionMaquina))
    ) {
        resultadoMensaje = "Gana " + jugador.nombre;
    } else {
        resultadoMensaje = "Gana la máquina";
    }*/

    // Para darle algo más de visibilidad al resultado llama a la función mostrarMensaje con el mensaje obtenido
    mostrarMensaje(resultadoMensaje);

    // Devuelve el mensaje para que pueda ser registrado en el historial
    return resultadoMensaje;
}


function mostrarMensaje(mensaje) {
    alert(mensaje);
    }

function actualizarHistorial(resultado) {
    // Verificar si se debe detener la recursión
    if (resultado === null || resultado === undefined) {
        return;
    }
    historial.push(resultado);
    const listaHistorial = document.getElementById("historial");
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = resultado;
    listaHistorial.appendChild(nuevoElemento);
}

document.addEventListener("DOMContentLoaded", function() {
    var botonReset = document.getElementsByTagName('button')[2];
    botonReset.addEventListener("click", function() {
        
		// Mostrar el mensaje "Nueva partida"
        mostrarMensaje("Nueva partida");
		let resultNuevaPartida = "Nueva Partida";
		actualizarHistorial(resultNuevaPartida);

        // Activar los campos de texto del comienzo de partida
        desactivarCamposTexto(false);

        // Dejar a "0" las partidas introducidas
        numParInput.value = 0;

        // Poner a 0 los contadores de partidas "actual" y "total"
        jugador.partidasActuales = 0;
        jugador.partidasTotales = 0;
        document.getElementById("actual").textContent = jugador.partidasActuales;
        document.getElementById("total").textContent = jugador.partidasTotales;

        // Poner la imagen por defecto en la opción de la máquina
        document.getElementById("maquina").innerHTML = '<img src="img/defecto.png" alt="Máquina" />';
    });
});