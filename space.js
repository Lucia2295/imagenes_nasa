document.getElementById('btnBuscar').addEventListener('click', () => {
    // Obtenemos el valor resultante de la busqueda
    const searchTerm = document.getElementById('inputBuscar').value;

    // Verificamos que el campo de búsqueda no este vacio
    if (searchTerm.trim() !== "") {
        // Construimos la url con lo que ingresamos en el campo de búsqueda
        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}`;

        // Realizamos la solicitud a la API de la NASA
        fetch(url)
        // Convertimos la respuesta a formato JSON
            .then(response => response.json()) 
            .then(data => {
                // Llamamos la función para mostrar los resultados otenidos
                mostrarResultados(data.collection.items);
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    } else {
        alert("Por favor, ingresa un término de búsqueda.");
    }
});

// Función para mostrar los resultados obtenidos de la búsqueda
function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    // Borrar resultados anteriores de la búsqueda
    contenedor.innerHTML = ''; 

    if (items.length > 0) {
        items.forEach(item => {
            // Algunos resultados no tienen imágenes, por lo tanto verificamos si el enlace existe
            if (item.links && item.links[0].href) {
                // Creamos un contenedor para cada imagen obtenida y su información
                const div = document.createElement('div');
                div.classList.add('col-md-4', 'my-3');

                // Imagenes
                const img = document.createElement('img');
                img.src = item.links[0].href;
                img.alt = item.data[0].title;
                img.classList.add('img-fluid'); 

                // Título imagenes
                const title = document.createElement('h5');
                title.textContent = item.data[0].title || 'Título no disponible';

                // Descripción imagenes 
                const description = document.createElement('p');
                description.textContent = item.data[0].description || 'Descripción no disponible'; 

                // Fecha imagenes
                const date = document.createElement('p');
                date.textContent = `Fecha: ${item.data[0].date_created || 'Fecha no disponible'}`; 

                // Añadimos todos los elementos obtenidos al div que creamos
                div.appendChild(img);
                div.appendChild(title);
                div.appendChild(description);
                div.appendChild(date);

                // Añadimos el div al contenedor principal
                contenedor.appendChild(div);
            }
        });
    } else {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
    }
}