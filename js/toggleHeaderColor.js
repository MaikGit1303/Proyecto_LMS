document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('header .controles button[aria-label="Toggle dark mode"]');
    const header = document.querySelector('header.encabezado');

    if (!toggleButton || !header) return;

    // Aplicar el estado guardado al cargar la página
    const modoOscuro = localStorage.getItem('modoOscuro') === 'true';

    if (modoOscuro) {
        header.style.backgroundColor = 'black';
        toggleButton.textContent = '☀️';
    } else {
        header.style.backgroundColor = 'steelblue'; // o el color original de tu header
        toggleButton.textContent = '🌙';
    }

    // Función para alternar el modo y guardar el estado
    function toggleHeader() {
        const modoActualEsLuna = toggleButton.textContent.trim() === '🌙';

        if (modoActualEsLuna) {
            header.style.backgroundColor = 'black';
            toggleButton.textContent = '☀️';
            localStorage.setItem('modoOscuro', 'true');
        } else {
            header.style.backgroundColor = 'steelblue';
            toggleButton.textContent = '🌙';
            localStorage.setItem('modoOscuro', 'false');
        }
    }

    toggleButton.addEventListener('click', toggleHeader);
});
