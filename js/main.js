var circles = document.querySelectorAll(".circle"); // Accedemos a todos los círculos
var speeds = []; // Array para almacenar las velocidades aleatorias

// Generar velocidades aleatorias para cada círculo
for (var i = 0; i < circles.length; i++) {
  speeds.push(Math.random() * 0.3 + 0.2); // Velocidades entre 0.5 y 1.0
}

function moveCircles() {
  for (var i = 0; i < circles.length; i++) {
    var position = parseFloat(circles[i].style.left || 0); // Obtenemos la posición actual
    position += speeds[i]; // Incrementamos la posición según la velocidad del círculo
    if (position >= 98) {
      position = 0; // Reiniciamos la posición si llega al final
    }
    circles[i].style.left = position + "%"; // Movemos el círculo
  }
  requestAnimationFrame(moveCircles);
}

moveCircles();