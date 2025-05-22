document.addEventListener('DOMContentLoaded', () => {
    // Contenedor donde se insertarán las tarjetas
    const contenedor = document.querySelector('.contenedor-tarjetas');

    // Función para crear una tarjeta HTML a partir de un objeto curso
    function crearTarjeta(curso) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('curso-tarjeta');

        tarjeta.innerHTML = `
            <img src="${curso.imagen}" alt="Imagen del curso ${curso.titulo}" class="curso-img" />
            <div class="barra-progreso-externa">
                <div class="barra-progreso-interna" style="width: ${curso.progreso}%;"></div>
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
        return tarjeta;
    }

    // Cargar el JSON externo y generar las tarjetas
    fetch('DATA/cursos.json')
        .then(response => response.json())
        .then(cursos => {
            cursos.forEach(curso => {
                const tarjeta = crearTarjeta(curso);
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error al cargar el JSON de cursos:', error);
        });
});