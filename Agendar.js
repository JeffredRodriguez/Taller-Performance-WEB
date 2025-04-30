let horarioSeleccionado = null;
let filaSeleccionada = null; 

//Vista de citas-horarios
function cargarCitas() {
    let fecha = document.getElementById("fechaCita").value;
    let citas = JSON.parse(localStorage.getItem("citas")) || {};
    let horarios = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "16:00"];

    let tabla = document.getElementById("tablaCitas");
    tabla.innerHTML = `<tr><th>Hora</th><th>Estado</th></tr>`;

    horarios.forEach(hora => {
        let estado = citas[fecha]?.includes(hora) ? "Reservado" : "Disponible";
        let clase = estado === "Reservado" ? "ocupada" : "disponible";
        tabla.innerHTML += `<tr class="${clase}" onclick="seleccionarHorario(this, '${fecha}', '${hora}')">
            <td>${hora}</td><td>${estado}</td>
        </tr>`;
    });

    horarioSeleccionado = null;
    filaSeleccionada = null; // Reiniciar selección al cargar nueva fecha
    document.getElementById("btnConfirmar").disabled = true;
}

function seleccionarHorario(fila, fecha, hora) {
    let citas = JSON.parse(localStorage.getItem("citas")) || {};
    if (citas[fecha]?.includes(hora)) {
        alert("Horario ocupado.");
        return;
    }

    // Quitar resaltado de la fila previamente seleccionada
    if (filaSeleccionada) {
        filaSeleccionada.style.backgroundColor = ""; 
    }

    // Resaltar nueva fila seleccionada
    fila.style.backgroundColor = "#ffd700"; 

    // Actualizar variables de selección
    filaSeleccionada = fila;
    horarioSeleccionado = { fecha, hora };
    validarFormularioCita(); 
}

// Función para validar el formulario cita
function validarFormularioCita() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const modeloAuto = document.getElementById("modeloAuto").value.trim();
    const anioAuto = document.getElementById("anioAuto").value.trim();
    const detalle = document.getElementById("detalle").value.trim();

    // Verificar si todos los campos están llenos y si se ha seleccionado un horario
    const todosLlenos = nombre !== "" && apellido !== "" && telefono !== "" &&
                        correo !== "" && modeloAuto !== "" && anioAuto !== "" &&
                        detalle !== "" && horarioSeleccionado !== null;

    document.getElementById("btnConfirmar").disabled = !todosLlenos; // Habilitar o deshabilitar el botón
}

// Vincular el evento input a todos los campos para validación en tiempo real
document.querySelectorAll("#formCita input, #formCita textarea").forEach(elemento => {
    elemento.addEventListener("input", validarFormularioCita);
});

// Mostrar popup de pago
function mostrarPopupPago() {
    document.getElementById("popupPago").style.display = "flex";
}

// Cerrar popup de pago
function cerrarPopup() {
    document.getElementById("tipoTarjeta").value = "Visa";
    document.getElementById("numeroTarjeta").value = '';
    document.getElementById("nombreTarjeta").value = '';
    document.getElementById("vencimientoTarjeta").value = '';
    document.getElementById("cvvTarjeta").value = '';

    document.getElementById("popupPago").style.display = "none";
}

// Verifica el pago de tarjeta
function procesarPago() {
    let tipoTarjeta = document.getElementById("tipoTarjeta").value;
    let numero = document.getElementById("numeroTarjeta").value.trim();
    let nombre = document.getElementById("nombreTarjeta").value.trim();
    let vencimiento = document.getElementById("vencimientoTarjeta").value;
    let cvv = document.getElementById("cvvTarjeta").value.trim();

    // Validar el número de tarjeta (16 dígitos numéricos)
    if (numero.length !== 16 || isNaN(numero)) {
        alert("El número de tarjeta debe contener exactamente 16 dígitos numéricos.");
        return;
    }

    if (nombre === "") {
        alert("El nombre en la tarjeta es obligatorio.");
        return;
    }

    if (!vencimiento) {
        alert("La fecha de vencimiento es obligatoria.");
        return;
    }

    let fechaActual = new Date();
    let [año, mes] = vencimiento.split("-").map(Number);
    let fechaVencimiento = new Date(año, mes); // Nota: el mes en Date es 0-indexed

    if (fechaVencimiento <= fechaActual) {
        alert("La tarjeta está vencida. Por favor, revise la fecha de vencimiento.");
        return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        alert("El CVV debe contener exactamente 3 dígitos numéricos.");
        return;
    }

    // Simulación de confirmación de pago
    alert(`Pago realizado exitosamente con tarjeta ${tipoTarjeta}.`);

    // Registrar la cita y cerrar el popup
    registrarCita();
    cerrarPopup();
    limpiarFormulario();
}


//Guarda cita en localstorage
function registrarCita() {
    let citas = JSON.parse(localStorage.getItem("citas")) || {};

    if (!citas[horarioSeleccionado.fecha]) {
        citas[horarioSeleccionado.fecha] = [];
    }

    // Registrar la cita seleccionada
    citas[horarioSeleccionado.fecha].push(horarioSeleccionado.hora);
    localStorage.setItem("citas", JSON.stringify(citas));

    // Recargar la vista de citas
    cargarCitas();
    limpiarFormulario()
}


// Función para mostrar/ocultar el menú en móviles
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

function limpiarFormulario() {
    // Limpiar campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("modeloAuto").value = "";
    document.getElementById("anioAuto").value = "";
    document.getElementById("detalle").value = "";

    // Deshabilitar el botón de confirmar
    document.getElementById("btnConfirmar").disabled = true;

    // Limpiar selección de horario
    if (filaSeleccionada) {
        filaSeleccionada.style.backgroundColor = ""; 
    }
    horarioSeleccionado = null;
    filaSeleccionada = null;
}