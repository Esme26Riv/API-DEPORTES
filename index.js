function getDeportes(done) {
    fetch("deportes.json")
        .then(response => {
            if (!response.ok) throw new Error("Error " + response.status);
            return response.json();
        })
        .then(data => done(data))
        .catch(error => {
            // Si el fetch falla (por ejemplo al abrir con doble clic), usa deportes.js
            console.warn("fetch falló, usando datos locales:", error.message);
            done(DEPORTES_DATA);
        });
}

getDeportes(data => {
    data.results.forEach(deporte => {
        const article = document.createRange().createContextualFragment(/*html*/`
        <article>
            <div class="image-container">
                <img src="${deporte.imagen}" alt="${deporte.nombre}" onerror="this.style.display='none'">
            </div>

            <h2>${deporte.nombre}</h2>
            <p><b>Escenario:</b> ${deporte.escenario}</p>
            <p><b>Dimensiones:</b> ${deporte.dimensiones}</p>
            <p><b>Número de elementos:</b> ${deporte.numero_elementos}</p>
            <p><b>Equipo:</b></p>
            <ul>
                <li>Short: ${deporte.equipo.short}</li>
                <li>Playera: ${deporte.equipo.playera}</li>
                <li>Tacos: ${deporte.equipo.tacos}</li>
                <li>Medias: ${deporte.equipo.medias}</li>
            </ul>
            <p><b>País:</b> ${deporte.pais}</p>
        </article>
        `);

        const main = document.querySelector("main");

        main.append(article);
    });
});
