var contenido = document.querySelector(".cuerda")
var colores = ["rojo", "verde", "azul", "amarillo"];
let intervalo = "";

function crearCirculo() {
  var circulo = document.createElement('div');
  circulo.setAttribute("class", "circulo");
  var color = colores[Math.floor(Math.random() * colores.length)];
  circulo.setAttribute("id", color);
  return circulo;
}

function crearCompetidor() {
  var competidorDiv = crearCirculo();
  competidorDiv.dataset.velocidad = Math.random() * 10;
  var color = competidorDiv.id;
  var contenedor = document.getElementById(color);
  contenedor.appendChild(competidorDiv);
}

function start() {
  intervalo = setInterval(function () {
    crearCompetidor();
    var elementos = document.querySelectorAll(".circulo");
    elementos.forEach(function (elemento) {
      elemento.style.animation = `move ${100 / elemento.dataset.velocidad}s linear infinite`;
      document.querySelectorAll('.circulo').forEach(circulo => {
        circulo.addEventListener('animationiteration', () => {
          circulo.remove();
        });
      });
    });
  }, 1000);
}

function stop() {
  clearInterval(intervalo);
  var elementos = document.querySelectorAll(".circulo");
  elementos.forEach(elemento => {
    elemento.style.animation = "none"; 
  });
}

document.addEventListener("keyup", function (evt) {
  if (evt.key === "a") {
    start();
  }
  if (evt.key === "s") {
    stop();
  }
});

