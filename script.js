const btnSaludo = document.getElementById("btn-saludo");
if (btnSaludo) {
  btnSaludo.addEventListener("click", function() {
    const nombre = prompt("¿Cómo te llamás?");
    const edad = prompt("¿Cuántos años tenés?");
    const ciudad = prompt("¿Dónde naciste?");
    
    if (nombre && edad && ciudad) {
      alert(`¡Bienvenido/a, ${nombre}! Tenés ${edad} años y naciste en ${ciudad}. Este sitio también es tu lugar.`);
    } else {
      alert("¡Hola! Cuando estés listo, volvemos a intentarlo 😄");
    }
  });
} else {
  console.error("El elemento con ID 'btn-saludo' no existe en el DOM.");
}