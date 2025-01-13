//Llamamos a los elementos.
const img1 = document.getElementById("img-1")
const img2 = document.getElementById("img-2")
const img3 = document.getElementById("img-3")
const img4 = document.getElementById("img-4")
const img5 = document.getElementById("img-5")
const img6 = document.getElementById("img-6")
const img7 = document.getElementById("img-7")
const img8 = document.getElementById("img-8")
const infoProductos = document.getElementsByClassName("infoProductos")
const infoProducto = infoProductos[0];
const imgProducto = document.getElementsByClassName("imgProducto")
const containerFoto = imgProducto[0];
insertarFoto(img1 ,0);
//Declaramos las funciones que van a darle el dinamismo.
function resetear() {
    infoProducto.innerHTML = ""; // Limpia la información
    while (containerFoto.firstChild) {
        containerFoto.removeChild(containerFoto.firstChild); // Elimina las imágenes previas
    }}

function insertarFoto(imagen, numeroImg){
    resetear();
    //Capturamos la imagen.
    currentIndex = numeroImg;
    imagen = imagen.src;
    let contador = 0;
    let posicion = contador + numeroImg;
    //Creamos el contenedor de imagen e imagen.
    const cajaImg = document.createElement("div")
    const imgP = document.createElement("img")
    //Le damos la ruta de la imagen.
    imgP.src=imagen;
    imgP.classList.add("imgP")
    imgP.setAttribute("title","Click para acercar")
    cajaImg.appendChild(imgP)

    const prevArrow = document.createElement("button");
    prevArrow.textContent = "←";
    prevArrow.classList.add("nav-arrow", "prev-arrow");

    const nextArrow = document.createElement("button");
    nextArrow.textContent = "→";
    nextArrow.classList.add("nav-arrow", "next-arrow");

    cajaImg.appendChild(prevArrow);
    cajaImg.appendChild(nextArrow);

    containerFoto.appendChild(cajaImg)
    
    prevArrow.addEventListener("click", () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = 7; // Ciclar al último si es el primero
        insertarFoto(document.getElementById(`img-${newIndex + 1}`), newIndex);
    });

    nextArrow.addEventListener("click", () => {
        let newIndex = currentIndex + 1;
        if (newIndex > 7) newIndex = 0; // Ciclar al primero si es el último
        insertarFoto(document.getElementById(`img-${newIndex + 1}`), newIndex);
    });
    
    //Extraemos el json con la informacion del producto.
    fetch(`../json/infoProductos.json`)
    .then(response => response.json())
    .then(data=>{
        const poductos =data.products;
        console.log(data);
        for(i=0; i<poductos.length;i++){
            if(posicion===i){
                //Creamos los contenedores dinamicos.
                const h2 =document.createElement("h3")
                const h4 = document.createElement("h4")
                const descripcion = document.createElement("div")
                const listaFeatures = document.createElement("ul")
                const features = poductos[i].features;
                    //Bucle para sacar cada feature en un li.
                    for(x=0; x<features.length; x++){
                        const feature = document.createElement("li")
                        feature.textContent= features[x];
                        listaFeatures.appendChild(feature)
                    }
                //Asignamos cada conetedor a su respectivo campo.
                h2.textContent = poductos[i].name;
                h4.textContent = poductos[i].category;
                descripcion.textContent = poductos[i].description;
                //Insertamos los elementos en el html.
                infoProducto.innerHTML = "";
                infoProducto.appendChild(h2)
                infoProducto.appendChild(h4)
                infoProducto.appendChild(descripcion)
                infoProducto.appendChild(listaFeatures)
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}
//Añadimos los eventos a cada imagen.
img1.addEventListener("click",e=>{
    e.preventDefault();
    resetear()
    insertarFoto(img1 ,0);

})
img2.addEventListener("click", (e) => {
    e.preventDefault();
    resetear();
    insertarFoto(img2, 1);
});
img3.addEventListener("click", (e) => {
    e.preventDefault();
    resetear();
    insertarFoto(img3, 2);
});
img4.addEventListener("click", (e) => {
    e.preventDefault();
    resetear();
    insertarFoto(img4, 3);
});
img5.addEventListener("click", (e) => {
    e.preventDefault();
    resetear();
    insertarFoto(img5, 4);
});
img6.addEventListener("click", (e) => {
    e.preventDefault();
    resetear();
    insertarFoto(img6, 5);
});
img7.addEventListener("click", (e) => {
    e.preventDefault();
    resetear();
    insertarFoto(img7, 6);
});
img8.addEventListener("click", (e) => {
    e.preventDefault();
    resetear();
    insertarFoto(img8, 7);
});

//Lightbox en imagenes insertadas.

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.querySelector(".close");

// Mostrar el modal con la imagen seleccionada
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("imgP")) {
        modalImage.src = e.target.src; // Usar la fuente de la imagen seleccionada
        modal.style.display = "flex"; // Mostrar el modal
    }
});

// Cerrar el modal al hacer clic en el botón de cierre o fuera de la imagen
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});