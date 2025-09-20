
// Bttn Leer más
async function toggleContent(event, button) {
    event.preventDefault(); 

    var extraContent = button.nextElementSibling;

    if (extraContent.style.display === "block") {
        extraContent.style.display = "none";
        button.innerHTML = "Leer más";
    } else {
        await new Promise(resolve => setTimeout(resolve, 150)); // Retraso de 150ms

        extraContent.style.display = "block";
        button.innerHTML = "Leer menos";
    }
}

// Whatsapp flotante
function abrirWhatsApp() {
    const telefono = "50688888888";  
    const mensaje = encodeURIComponent("Hola, me gustaría obtener más información.");
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    
    window.open(url, '_blank');
}



//Cards 
document.querySelectorAll('.gallery-item').forEach(item => {
    const sliderImages = item.querySelector('.slider-images');
    const images = sliderImages.querySelectorAll('img');
    let currentIndex = 0;

    const updateSlider = () => {
        const offset = -currentIndex * 100;
        sliderImages.style.transform = `translateX(${offset}%)`;
    };

    item.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateSlider();
    });

    item.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    updateSlider(); 
});



// Función para mostrar/ocultar el menú en móviles
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}



document.addEventListener("DOMContentLoaded", function () {
    const whatsappFloat = document.querySelector(".whatsapp-float");
    const footer = document.querySelector("footer");

    function ajustarPosicionWhatsApp() {
        const footerRect = footer.getBoundingClientRect();
        const distanciaDesdeElFooter = window.innerHeight - footerRect.top;

        if (distanciaDesdeElFooter > 0) {
            // Si el footer está visible, ajusta la posición del logo
            whatsappFloat.style.bottom = `${distanciaDesdeElFooter + 20}px`;
        } else {
            // Si el footer no está visible, restablece la posición original
            whatsappFloat.style.bottom = "20px";
        }
    }

    // Ajustar la posición al cargar la página y al hacer scroll
    window.addEventListener("scroll", ajustarPosicionWhatsApp);
    window.addEventListener("resize", ajustarPosicionWhatsApp);
    ajustarPosicionWhatsApp(); // Llamar inicialmente
});