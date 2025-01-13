const caja2 = document.getElementById("caja2");
const caja4 = document.getElementById("caja4")
const apiKey ="ac0cb62f75f6495fbcf2eb9e838a446e";
const apiUrl = `https://api.rawg.io/api/developers?page_size=6&key=${apiKey}`;
fetch(`https://corsproxy.io/?url=${encodeURIComponent(apiUrl)}`,{
    method: 'GET'
})
    .then(response => response.json())
    .then(data => { 
        // Procesamos los datos
        console.log(data);
        const titulos = data.results;
        const containerDesarroladores = document.createElement("div")
        containerDesarroladores.classList.add("containerDesarroladores")
        for(i=0; i<titulos.length; i++){
            const categoria =titulos[i]
            var desarrolladores = document.createElement("a");
            var fondConNombre = document.createElement("div");
            var fondoImagen = document.createElement("img");
            fondoImagen.setAttribute("src",categoria.image_background)
            desarrolladores.textContent = categoria.name
            desarrolladores.href ="#";
            desarrolladores.dataset.juegos = JSON.stringify(categoria.games);
            fondConNombre.appendChild(fondoImagen) 
            fondConNombre.appendChild(desarrolladores)
            
            containerDesarroladores.appendChild(fondConNombre)

        }
        caja2.appendChild(containerDesarroladores); 
        
    })
    .catch(error => console.error('Error fetching data:', error));
fetch(`./json/NoticiasVideojuegos.json`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const categoria = data.noticias;
        const contenedorTodo = document.createElement("div")
        categoria.forEach((noticia,index) => {
            //Creamos los elementos
            const contenedorNoticias = document.createElement("article")
            const h2 = document.createElement("h3")
            const contenido = document.createElement("p")
            const autor = document.createElement("p")
            const fecha = document.createElement("p")
            const tipo = document.createElement("p")
            //Le damos clases
            contenido.classList.add("contenido")
            autor.classList.add("autor")
            fecha.classList.add("fecha")
            tipo.classList.add("tipo")
            //Le implementamos la información extraída del Json
            h2.textContent = noticia.titulo;
            contenido.textContent = noticia.contenido;
            autor.textContent = noticia.autor;
            fecha.textContent = noticia.fecha;
            tipo.textContent = noticia.categoria;
            //Con esto podemos darle un ID a cada articulo para posteriormente darle estilos
            contenedorNoticias.id = `noticia-${index + 1}`;
            //Lo introducimos dentro del contenedor correspondiente
            contenedorNoticias.appendChild(h2)
            contenedorNoticias.appendChild(autor)
            contenedorNoticias.appendChild(contenido)
            contenedorNoticias.appendChild(fecha)
            contenedorNoticias.appendChild(tipo)
            contenedorTodo.appendChild(contenedorNoticias);
            contenedorNoticias.classList.add("articulos")
        })
        caja4.appendChild(contenedorTodo)

    })
    
