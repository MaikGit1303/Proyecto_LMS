document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('CambioDeModo');
    const header = document.querySelector('header.encabezado');

    if (!toggleButton || !header) return;

    // Aplicar el estado guardado al cargar la página
    const modoOscuro = localStorage.getItem('modoOscuroAssignments') === 'true';

    if (modoOscuro) {
        header.style.backgroundColor = 'black';
        toggleButton.textContent = '☀️';
    } else {
        header.style.backgroundColor = 'steelblue';
        toggleButton.textContent = '🌙';
    }

    function toggleHeader() {
        const modoActualEsLuna = toggleButton.textContent.trim() === '🌙';

        if (modoActualEsLuna) {
            header.style.backgroundColor = 'black';
            toggleButton.textContent = '☀️';
            localStorage.setItem('modoOscuroAssignments', 'true');
        } else {
            header.style.backgroundColor = 'steelblue';
            toggleButton.textContent = '🌙';
            localStorage.setItem('modoOscuroAssignments', 'false');
        }
    }

    toggleButton.addEventListener('click', toggleHeader);
});
