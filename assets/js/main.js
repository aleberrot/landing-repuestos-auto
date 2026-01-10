// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL CARRUSEL ---
    const track = document.getElementById('carouselTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotContainer = document.getElementById('dotContainer');
    const cards = track.children;
    
    let index = 0;

    function getVisibleCards() {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    // Función para renderizar los puntos (dots) dinámicamente
    function renderDots() {
        dotContainer.innerHTML = '';
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all ${i === index ? 'bg-blue-600 w-8' : 'bg-gray-300'}`;
            dot.onclick = () => goToSlide(i);
            dotContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        
        if (index > maxIndex) index = maxIndex;

        // Calculamos el ancho de UNA tarjeta individual
        const cardWidth = cards[0].offsetWidth;
        // El desplazamiento es: índice por el ancho de la tarjeta
        const offset = index * cardWidth;
        
        track.style.transform = `translateX(-${offset}px)`;
        
        // Actualizar dots (puntos)
        renderDots();
}

    function goToSlide(i) {
        index = i;
        updateCarousel();
    }

    nextBtn.onclick = () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        index = (index >= maxIndex) ? 0 : index + 1;
        updateCarousel();
    };

    prevBtn.onclick = () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        index = (index <= 0) ? maxIndex : index - 1;
        updateCarousel();
    };

    // Auto-play cada 5 segundos
    let autoPlayInterval = setInterval(() => nextBtn.onclick(), 5000);

    // Detener auto-play si el usuario interactúa
    [nextBtn, prevBtn, dotContainer].forEach(el => {
        el.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        el.addEventListener('mouseleave', () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => nextBtn.onclick(), 5000);
        });
    });

    // Ajustar al redimensionar pantalla
    window.addEventListener('resize', () => {
        renderDots();
        updateCarousel();
    });

    // Inicialización inicial
    renderDots();
    updateCarousel();
    // Get elements from DOM
    const menuMobile = document.getElementById('menu-mobile');
    const navMobile = document.getElementById('nav-mobile');
    const menuMobileAnchors = navMobile.querySelectorAll('.menu-mobile-anchor');

    // TODO function for mobile menu toggle
    function handleMenu(forceClose = false){
        // Invert the state of the menu or close it if forceClose is true
        isMenuOpen = forceClose ? false : !isMenuOpen;
        // Obtain the son element with the icon
        const icon = menuMobile.querySelector('[data-lucide]');
        if(isMenuOpen){
            // Open menu
            icon.setAttribute('data-lucide', 'x');
            navMobile.hidden = false;
        }else{
            // Close menu
            icon.setAttribute('data-lucide', 'menu');
            navMobile.hidden = true;
        }
        lucide.createIcons();
    }

    // TODO function for whatsapp button



    // Event listeners
    menuMobile.addEventListener('click', () => handleMenu());

    // TODO function for mobile menu links to close menu on click
    menuMobileAnchors.forEach(anchor => {
        anchor.addEventListener('click', () =>{
            handleMenu(true);
        })
    })

});
