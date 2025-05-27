// Assignments.js

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const assignmentCards = document.querySelectorAll('.assignment-card');
    const submitButtons = document.querySelectorAll('.submit-button');

    // Elementos del modal
    const submissionModal = document.getElementById('submissionModal');
    const closeModalBtn = document.querySelector('#submissionModal .close-button');
    const modalCourseNameSpan = document.getElementById('modalCourseName');
    const modalDueDateSpan = document.getElementById('modalDueDate');
    const modalAssignmentTitle = document.getElementById('modalAssignmentTitle');
    const modalAssignmentDescription = document.getElementById('modalAssignmentDescription');
    const modalPointsSpan = document.getElementById('modalPoints');
    const modalTypeSpan = document.getElementById('modalType');
    const modalModulesSpan = document.getElementById('modalModules');
    const submissionNotesTextarea = document.getElementById('submissionNotes');
    const fileUploadInput = document.getElementById('fileUploadModal'); // ID actualizado
    const selectedFilesList = document.getElementById('selectedFilesList');
    const confirmSubmissionBtn = document.getElementById('submitAssignmentBtn'); // ID actualizado
    const cancelSubmissionBtn = document.getElementById('cancelSubmissionBtn'); // ID actualizado
    const requiredFieldsAlert = document.getElementById('requiredFieldsAlert');

    let currentAssignmentCard = null; // Para guardar la tarjeta de la asignación actual que se va a subir
    let selectedFiles = []; // Array para almacenar los archivos seleccionados

    // Función para manejar los filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterCategory = button.dataset.filter;

            assignmentCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Función para manejar la apertura del modal al hacer clic en "Submit Assignment"
    submitButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            // Verificar si el botón está deshabilitado o ya enviado
            if (button.classList.contains('disabled')) {
                alert('¡Esta asignación está bloqueada! Debes completar el curso primero.');
                return;
            }

            if (button.classList.contains('submitted')) {
                alert('¡Esta asignación ya ha sido enviada!');
                return;
            }

            // Guardar la tarjeta de la asignación actual
            currentAssignmentCard = button.closest('.assignment-card');

            // Obtener todos los datos del botón
            const assignmentTitle = button.dataset.assignmentTitle;
            const courseName = button.dataset.courseName;
            const dueDate = button.dataset.dueDate;
            const points = button.dataset.points;
            const type = button.dataset.type;
            const modules = button.dataset.modules;
            const description = button.dataset.description;


            // Llenar el modal con la información de la asignación
            modalAssignmentTitle.textContent = assignmentTitle;
            modalCourseNameSpan.textContent = courseName;
            modalDueDateSpan.textContent = dueDate;
            modalAssignmentDescription.textContent = description;
            modalPointsSpan.textContent = points;
            modalTypeSpan.textContent = type;
            modalModulesSpan.textContent = modules;
            
            submissionNotesTextarea.value = ''; // Limpiar notas previas
            selectedFiles = []; // Limpiar archivos seleccionados
            updateSelectedFilesList(); // Actualizar la lista de archivos
            requiredFieldsAlert.style.display = 'none'; // Ocultar alerta de requeridos

            // Mostrar el modal
            submissionModal.style.display = 'flex';
        });
    });

    // Cerrar el modal al hacer clic en la 'x' o en "Cancel"
    closeModalBtn.addEventListener('click', () => {
        submissionModal.style.display = 'none';
    });

    cancelSubmissionBtn.addEventListener('click', () => {
        submissionModal.style.display = 'none';
    });

    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === submissionModal) {
            submissionModal.style.display = 'none';
        }
    });

    // Manejar la selección de archivos
    fileUploadInput.addEventListener('change', () => {
        // Convertir FileList a Array y añadir a selectedFiles
        Array.from(fileUploadInput.files).forEach(file => {
            // Evitar duplicados (puedes añadir una lógica más robusta si lo necesitas)
            if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
                selectedFiles.push(file);
            }
        });
        updateSelectedFilesList();
        fileUploadInput.value = ''; // Limpiar el input para permitir seleccionar los mismos archivos de nuevo
    });

    // Función para actualizar la lista de archivos en el modal
    function updateSelectedFilesList() {
        selectedFilesList.innerHTML = ''; // Limpiar lista actual
        if (selectedFiles.length === 0) {
            selectedFilesList.innerHTML = '<li>No files selected.</li>'; // Ocultar si no hay archivos
            selectedFilesList.style.display = 'none';
        } else {
            selectedFilesList.style.display = 'block';
            selectedFiles.forEach((file, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = file.name;
                const removeBtn = document.createElement('span');
                removeBtn.classList.add('remove-file');
                removeBtn.textContent = 'x'; // O usa un icono como '✖' o '🗑️'
                removeBtn.addEventListener('click', () => {
                    selectedFiles.splice(index, 1); // Eliminar el archivo del array
                    updateSelectedFilesList(); // Actualizar la UI
                });
                listItem.appendChild(removeBtn);
                selectedFilesList.appendChild(listItem);
            });
        }
    }

    // Lógica para simular la subida del trabajo al hacer clic en "Submit Assignment" en el modal
    confirmSubmissionBtn.addEventListener('click', () => {
        // Validar si las notas de envío están vacías (si son requeridas)
        if (submissionNotesTextarea.value.trim() === '') {
            requiredFieldsAlert.style.display = 'flex'; // Mostrar alerta
            submissionNotesTextarea.focus(); // Poner el foco en el campo
            return;
        }

        requiredFieldsAlert.style.display = 'none'; // Ocultar alerta si todo está bien

        // Aquí iría la lógica para enviar el formulario real (AJAX, FormData, etc.)
        // Por ahora, simulamos el éxito.
        console.log('Notas de envío:', submissionNotesTextarea.value);
        console.log('Archivos a subir:', selectedFiles);

        // Simular un pequeño retraso para la "subida"
        setTimeout(() => {
            // Cambiar el estado de la tarjeta a "completed"
            if (currentAssignmentCard) {
                currentAssignmentCard.dataset.category = 'completed';
                // Eliminar clases de estado antiguas y añadir 'completed'
                currentAssignmentCard.classList.remove('pending', 'locked', 'overdue');
                currentAssignmentCard.classList.add('completed');

                // Actualizar el botón de la tarjeta original
                const originalButton = currentAssignmentCard.querySelector('.submit-button');
                if (originalButton) {
                    originalButton.innerHTML = '✅ Submitted';
                    originalButton.classList.add('submitted');
                    originalButton.classList.remove('submit-button', 'disabled');
                }
            }

            submissionModal.style.display = 'none'; // Cerrar el modal
            alert('¡Asignación enviada exitosamente!');
            selectedFiles = []; // Limpiar los archivos después del envío
            updateSelectedFilesList(); // Actualizar la lista de archivos (para que esté vacía)

        }, 500); // 0.5 segundos de retraso
    });


    // Opcional: Lógica para el modo oscuro/claro (si no está en modo-tema-assignments.js)
    const darkModeToggle = document.querySelector('header .controles button');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    // Inicializar la lista de archivos seleccionados al cargar la página
    updateSelectedFilesList();
});