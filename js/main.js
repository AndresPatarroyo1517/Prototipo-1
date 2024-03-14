var contenido = document.querySelector(".cuerda");
var botonIniciarJuego = document.getElementById("iniciar");
var botonPausarJuego = document.getElementById("pausar");
var botonContinuarJuego = document.getElementById("continuar");
var botonReiniciarJuego = document.getElementById("reiniciar");
var contadorJuego = document.getElementById("contador");
var colores = ["Rojo", "Verde", "Azul", "Amarillo"];
let intervaloMover;
let intervaloCrear;
let intervaloContador;
let juegoIniciado = false;
let pausa = false;
var cont = 0;


function crearCirculo() {
    var circulo = document.createElement('div');
    circulo.setAttribute("class", "circulo");
    var color = colores[Math.floor(Math.random() * colores.length)];
    circulo.setAttribute("id", color.toLowerCase());
    return circulo;
}

function crearCompetidor() {
    if (juegoIniciado && !pausa) {
        var competidorDiv = crearCirculo();
        competidorDiv.dataset.velocidad = Math.random() * 20;
        competidorDiv.style.left = '0px';
        var color = competidorDiv.id;
        var contenedor = document.getElementById(color);
        contenedor.appendChild(competidorDiv);
    }
}

function moverCirculos() {
    if (!pausa) {
        var competidores = document.querySelectorAll('.circulo');
        competidores.forEach(function (competidor) {
            var velocidad = parseFloat(competidor.dataset.velocidad);
            var pos = parseFloat(competidor.style.left);
            competidor.style.left = pos + velocidad + 'px';
            if (pos + velocidad >= contenido.offsetWidth - 40) {
                competidor.remove();
            }
        });
    }
}

function reestablecer() {
    pausa = true;
    juegoIniciado = false;
    clearInterval(intervaloMover);
    clearInterval(intervaloCrear);
    clearInterval(intervaloContador);
    var competidores = document.querySelectorAll('.circulo');
    competidores.forEach(function (competidor) {
        competidor.remove();
    })
    cont = 0;
    actualizarContador();
}

function teclaPresionada(num) {
    var circulos = document.querySelectorAll('.circulo');
    var color = colores[num];
    var final = document.querySelector('.final#btn' + color);
    circulos.forEach(function (circulo) {
        var circuloAct = circulo.getBoundingClientRect();
        var finalAct = final.getBoundingClientRect();
        if (
            circuloAct.left < finalAct.right + 1 &&
            circuloAct.right > finalAct.left - 1 &&
            circuloAct.top < finalAct.bottom + 1 &&
            circuloAct.bottom > finalAct.top - 1
        ) {
            circulo.style.animation = 'explotar 0.5s forwards';
            circulo.addEventListener('animationend', function () {
                circulo.remove();
                cont++;
                actualizarContador();
            });
        }
    })
}

function actualizarContador() {
    contadorJuego.innerText = cont;
}

function juego() {
    pausa = false;
    juegoIniciado = true;
    clearInterval(intervaloMover);
    clearInterval(intervaloCrear);
    clearInterval(intervaloContador);
    intervaloMover = setInterval(moverCirculos, 60);
    intervaloCrear = setInterval(crearCompetidor, 2000);
    intervaloContador = setInterval(actualizarContador, 1);
}

function pausar() {
    pausa = true;
}
function continuar() {
    pausa = false;
}
document.addEventListener('keydown', function (event) {
    if (event.key === '1' && !juegoIniciado) {
        juego();
    } else if (event.key === 'p') {
        pausar();
    } else if (event.key === 'c') {
        continuar();
    } else if (event.key === 'r') {
        reestablecer();
    } else if (event.key === 'd') {
        teclaPresionada(0);
    } else if (event.key === 'f') {
        teclaPresionada(1);
    } else if (event.key === 'j') {
        teclaPresionada(2);
    } else if (event.key === 'k') {
        teclaPresionada(3);
    }
});
document.addEventListener("click", function (evento) {
    if (evento.target == botonIniciarJuego && !juegoIniciado) {
        juego();
    } else if (evento.target == botonPausarJuego) {
        pausar();
    } else if (evento.target == botonContinuarJuego) {
        continuar();
    }
    else if (evento.target == botonReiniciarJuego) {
        reestablecer();
    }
});
