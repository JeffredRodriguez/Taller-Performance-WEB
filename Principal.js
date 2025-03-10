
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



//Cards de Trabajos
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