document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------
    // Lógica para el giro de las tarjetas 
    // ------------------------------------

    // Seleccionar todos los botones "More Info" y "Close"
    const flipButtons = document.querySelectorAll('.btn.info, .btn.cerrar-info');

    // Función para girar la tarjeta
    function flipCard(event) {
        const button = event.target;
        // Encontrar el .tarjeta-inner más cercano al botón que fue clickeado
        const tarjetaInner = button.closest('.tarjeta').querySelector('.tarjeta-inner');
        if (tarjetaInner) {
            // Alternar la clase 'flipped' para iniciar/revertir la animación
            tarjetaInner.classList.toggle('flipped');
        }
    }

    // Añadir el evento de clic a todos los botones que inician el giro
    flipButtons.forEach(button => {
        button.addEventListener('click', flipCard);
    });

    // ---------------------------------------------------
    // Lógica para el manejo de enlaces activos en el menú
    // ---------------------------------------------------

    const navLinks = document.querySelectorAll('.nav-menu a');

    // Función para activar el enlace del menú
    function activateNavLink() {
        // Remover la clase 'activo' de todos los enlaces
        navLinks.forEach(navLink => {
            navLink.classList.remove('activo');
        });

        // Añadir la clase 'activo' al enlace que coincide con la URL actual
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            if (link.href.includes(currentPath)) {
                link.classList.add('activo');
            }
        });
    }

    // Ejecutar al cargar la página
    activateNavLink();

    // También podrías agregar un listener para clics si quieres que se active al navegar internamente (aunque no es común con enlaces de página completa)
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Aquí no necesitamos event.preventDefault() si son enlaces a páginas reales
            // activateNavLink(); // Esto ya se llama al cargar la página, pero si son SPA, necesitarías más lógica
        });
    });


    // --------------------------
    // Lógica para el modo oscuro 
    // --------------------------

    const darkModeToggle = document.querySelector('button[aria-label="Toggle dark mode"]');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Opcional: Guardar la preferencia del usuario en localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        // Opcional: Cargar la preferencia del usuario al iniciar
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    // --------------------------------
    // Lógica para el select de idioma 
    // --------------------------------

    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        // Cargar el idioma guardado al iniciar
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
        }

        // Guardar la preferencia del idioma al cambiar
        languageSelect.addEventListener('change', (event) => {
            localStorage.setItem('language', event.target.value);
            // Aquí podrías añadir lógica para cambiar el texto en la página
            console.log('Idioma cambiado a:', event.target.value);
        });
    }

});