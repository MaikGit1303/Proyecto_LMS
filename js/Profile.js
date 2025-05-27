document.addEventListener('DOMContentLoaded', () => {
    // === Funcionalidad de Modo Oscuro ===
    const darkModeButton = document.querySelector('.controles button');
    const body = document.body;

    if (darkModeButton && body) {
        darkModeButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
    }

    // === Funcionalidad de Cambio de Idioma (ejemplo básico) ===
    const languageSelect = document.getElementById('language-select');

    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            const selectedLanguage = event.target.value;
            console.log(`Idioma seleccionado: ${selectedLanguage}`);
            alert(`La funcionalidad de cambio de idioma a "${selectedLanguage}" no está completamente implementada.`);
        });
    }

    // === Interactividad con botones de perfil (Guardar/Cancelar) ===
    const saveButton = document.querySelector('.save-button');
    const cancelButton = document.querySelector('.cancel-button');

    if (saveButton) {
        saveButton.addEventListener('click', () => {
            alert('¡Cambios guardados!');
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            alert('Cambios cancelados.');
        });
    }

    // === Funcionalidad para cambiar la imagen de perfil al hacer clic en ella ===
    const profilePicture = document.getElementById('profile-picture');
    const fileUploadInput = document.getElementById('file-upload-input'); // El input file oculto

    // Definir la ruta de la imagen predeterminada
    const defaultProfileImagePath = '../IMG/Courses/Perfil.jpeg';

    if (profilePicture && fileUploadInput) {
        // 1. Cargar la imagen de perfil guardada al cargar la página
        // Si hay una imagen guardada en localStorage, úsala. De lo contrario, la imagen del HTML ya es la predeterminada.
        const savedProfileImage = localStorage.getItem('../IMG/Courses/Perfil.jpeg');
        if (savedProfileImage) {
            profilePicture.src = savedProfileImage;
        } else {
            // Si no hay imagen guardada, asegúrate de que el src sea la imagen predeterminada del HTML
            // (esto ya debería estar configurado en el HTML, pero lo confirmamos aquí si fuera necesario resetear)
            profilePicture.src = defaultProfileImagePath;
        }


        // 2. Cuando se hace clic en la imagen de perfil visible
        profilePicture.addEventListener('click', () => {
            fileUploadInput.click(); // Simula un clic en el input de tipo file oculto
        });

        // 3. Cuando se selecciona un archivo a través del input de tipo file
        fileUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0]; // Obtiene el primer archivo seleccionado

            if (file) {
                const reader = new FileReader(); // Crea un lector de archivos

                reader.onload = (e) => {
                    // Cuando el archivo se ha leído, actualiza el src de la imagen de perfil
                    profilePicture.src = e.target.result;
                    // Guarda la nueva URL de la imagen en localStorage
                    localStorage.setItem('../IMG/Courses/Perfil.jpeg', e.target.result);
                };

                reader.readAsDataURL(file); // Lee el archivo como una URL de datos (base64)
            }
        });
    }
});