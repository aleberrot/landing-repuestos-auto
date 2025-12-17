// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
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
