// Espera a que todo el contenido HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona el contenedor del HTML donde se insertarán las tarjetas de cursos
    const contenedor = document.querySelector('.contenedor-tarjetas');

    // Función que recibe un objeto "curso" y devuelve un elemento HTML con su información
    function crearTarjeta(curso) {
        // Crea un nuevo <div> para la tarjeta del curso
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('curso-tarjeta'); // Agrega una clase para aplicar estilos

        // Agrega contenido HTML dentro de la tarjeta con los datos del curso
        tarjeta.innerHTML = `
            <img 
                src="${curso.imagen}" 
                alt="Imagen del curso ${curso.titulo}" 
                class="curso-img"
            />
            <div class="barra-progreso-externa">
                <div 
                    class="barra-progreso-interna" 
                    style="width: ${curso.progreso}%;">
                </div>
            </div>
            <div class="curso-info">
                <h4>${curso.titulo}</h4>
                <p>${curso.profesor}</p>
                <div class="progreso-detalle">
                    <span class="texto-progreso">${curso.progreso}% Complete</span>
                    <span>${curso.leccionesCompletadas}/${curso.totalLecciones} Lessons</span>
                </div>
                <button class="btn-curso">Continue Learning</button>
            </div>
        `;

        return tarjeta; // Devuelve la tarjeta lista para insertarse en el HTML
    }

    // Carga el archivo cursos.json con los datos de los cursos
    fetch('DATA/cursos.json') // Ruta relativa al archivo JSON
        .then(response => response.json()) // Convierte la respuesta en formato JSON
        .then(cursos => {
            // Recorre cada curso del archivo JSON
            cursos.forEach(curso => {
                // Crea una tarjeta para cada curso
                const tarjeta = crearTarjeta(curso);
                // Inserta la tarjeta en el contenedor del HTML
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            // Muestra un mensaje de error en la consola si falla la carga del JSON
            console.error('Error al cargar el JSON de cursos:', error);
        });
});
