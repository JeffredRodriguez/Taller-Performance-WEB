document.addEventListener("DOMContentLoaded", function () {
    // Mostrar la fecha actual automáticamente
    const fecha = new Date();
    document.getElementById("fecha-actual").textContent = 
        `Actualmente es ${fecha.toLocaleDateString("es-ES", { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })} ${fecha.toLocaleTimeString("es-ES")}`;

    // Envía datos el correo mediante Formspree
    const form = document.querySelector(".contact-form");
    //form.action = "https://formspree.io/f/movjgvwggg";  
    form.method = "POST";
 
    // Manejar el envío del formulario
    form.addEventListener("submit", function (event) {
        // Validar campos antes de permitir el envío
        let nombre = document.getElementById("nombre").value.trim();
        let apellido = document.getElementById("apellido").value.trim();
        let email = document.getElementById("email").value.trim();
        let ayuda = document.getElementById("ayuda").value;

        if (nombre === "" || apellido === "" || email === "" || ayuda === "") {
            alert("Por favor, completa todos los campos obligatorios.");
            event.preventDefault();  
            return;
        }

        // Si todo está correcto, mostrar el mensaje 
        alert("Formulario enviado con éxito. Nos pondremos en contacto contigo pronto.");
        // No hago reset aquí porque Formspree recarga la página después de enviar
    });
});



// Función para mostrar/ocultar el menú en móviles
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("membresia").value = "";
    document.getElementById("email").value = "";
    document.getElementById("ayuda").value = "";
    document.getElementById("detalle").value = "";
}

