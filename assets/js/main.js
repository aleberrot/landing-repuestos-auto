// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Lógica del Carrusel
        const track = document.getElementById('carouselTrack');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const dotContainer = document.getElementById('dotContainer');
        const cards = track.children;
        
        let index = 0;
        let visibleCards = getVisibleCards();

        function getVisibleCards() {
            if (window.innerWidth >= 1024) return 4;
            if (window.innerWidth >= 640) return 2;
            return 1;
        }

        const maxIndex = cards.length - visibleCards;

        // Crear puntos (dots)
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-blue-600 w-8' : 'bg-gray-300'}`;
            dot.onclick = () => goToSlide(i);
            dotContainer.appendChild(dot);
        }

        function updateCarousel() {
            const cardWidth = 100 / visibleCards;
            track.style.transform = `translateX(-${index * (100 / visibleCards)}%)`;
            
            // Actualizar dots
            Array.from(dotContainer.children).forEach((dot, i) => {
                dot.className = `w-2 h-2 rounded-full transition-all ${i === index ? 'bg-blue-600 w-8' : 'bg-gray-300'}`;
            });
        }

        function goToSlide(i) {
            index = i;
            updateCarousel();
        }

        nextBtn.onclick = () => {
            index = index >= maxIndex ? 0 : index + 1;
            updateCarousel();
        };

        prevBtn.onclick = () => {
            index = index <= 0 ? maxIndex : index - 1;
            updateCarousel();
        };

        // Auto-play
        setInterval(() => {
            index = index >= maxIndex ? 0 : index + 1;
            updateCarousel();
        }, 5000);

        // Ajustar al redimensionar pantalla
        window.onresize = () => {
            visibleCards = getVisibleCards();
            updateCarousel();
        };
    
    let isMenuOpen = false;

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
