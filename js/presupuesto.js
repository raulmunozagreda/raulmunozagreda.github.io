//***Contacto***
//Declaración de variables
const nombreInput = document.getElementById("nombre")
const telefonoInput = document.getElementById("telefono")
const emailInput = document.getElementById("email")
const contrasenaInput = document.getElementById("contrasena")
const contacto = document.getElementById("contacto")
const apellidosInput = document.getElementById("apellidos")
let nombreValido
let apellidosValido
let telefonoValido
let emailValido
let valido =false;
//FUNCIONES
function validarNombre(){
    const nombre = nombreInput.value
    const nombrePattern = /^[a-zA-Z][a-zA-Z0-9]*$/
    if(nombre.length <= 15 && nombrePattern.test(nombre)){
        nombreInput.classList.add("valido")
        nombreInput.classList.remove("invalido")
        document.getElementById("nombreError").textContent=""
        nombreValido = true;
    }
    else{
        nombreInput.classList.remove("valido")
        nombreInput.classList.add("invalido")
        document.getElementById("nombreError").textContent=`El nombre de usuario debe tener 
        máximo 15 caracteres y contener solo letras.`
        nombreValido = false;
    }
}
function validarApellidos(){
    const apellidos = apellidosInput.value
    const apellidoPattern =/^[a-zA-Z]+(?: [a-zA-Z]+)*$/; // Solo permite letras y espacios entre apellidos
    if(apellidos.length <= 40 && apellidoPattern.test(apellidos)){
        apellidosInput.classList.add("valido")
        apellidosInput.classList.remove("invalido")
        document.getElementById("apellidosError").textContent=""
        apellidosValido = true;
    
    }
    else{
        apellidosInput.classList.remove("valido")
        apellidosInput.classList.add("invalido")
        document.getElementById("apellidosError").textContent=`Solo permite letras y espacios entre apellidos.`
        apellidosValido = false
    }
}
function validarTelefono(){
    const telefono = telefonoInput.value
    const telefonoPattern = /^[6789]\d{8}$/; //Valido para números nacionales
    if(telefonoPattern.test(telefono) && telefono.length===9){
        telefonoInput.classList.add("valido")
        telefonoInput.classList.remove("invalido")
        document.getElementById("telefonoError").textContent=""
        telefonoValido = true;
    
    }
    else{
        telefonoInput.classList.remove("valido")
        telefonoInput.classList.add("invalido")
        document.getElementById("telefonoError").textContent=`Valido para números nacionales.`
        telefonoValido = false
    }
}
function validaremail(){
    const email = emailInput.value
    const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(emailPattern.test(email)){
        emailInput.classList.add("valido")
        emailInput.classList.remove("invalido")
        document.getElementById("emailError").textContent=""
        valido = true;
        emailValido = true;
    }
    else{
        emailInput.classList.add("invalido")
        emailInput.classList.remove("valido")
        document.getElementById("emailError").textContent=`El email debe tener un cumplir con los 
                                                            estándares de correo electronico.`
        emailValido = false
    }
}
//EVENTOS
nombreInput.addEventListener("keyup",validarNombre);
apellidosInput.addEventListener("keyup",validarApellidos)
telefonoInput.addEventListener("keyup", validarTelefono)
emailInput.addEventListener("keyup", validaremail)
// ---------------------------> Presupuesto <---------------------------------
//Capturamos los elementos y declaramos variables 
const producto = document.getElementById("producto")
let valorInicialP = producto.value;
const condiciones = document.getElementById("condiciones")
const plazoInput = document.getElementById("plazo")
const extras = document.getElementsByClassName("extras");
const cantidadProvisional =document.getElementById("cantidadProvisional");
const enviarbtn = document.getElementById("enviar")

let calculo
let validarProducto=false
let validarPlazo=false
let descuento= 0;
//FUNCIONES
function sumaExtras(){
    calcularProducto()
    plazoDescuento()
    for (let i = 0; i < extras.length; i++) {
        if (extras[i].checked) {
            const totalExtras = parseFloat(extras[i].dataset.precio);
            calculo += totalExtras;
        }
    }   
    
    
    cantidadProvisional.textContent = `Total: ${parseFloat(calculo)}`
}
function plazoDescuento(){
    calcularProducto()
    const plazo = parseInt(plazoInput.value);
    if(valorInicialP!=producto.value && plazo>=0){
        plazoInput.classList.add("valido")
        plazoInput.classList.remove("invalido")
        document.getElementById("plazoError").textContent=``
        
    
    if(plazo<=3){
        descuento = (10/100)*calculo;
        
    }
    else if(plazo>3 && plazo<=5){
        descuento = (5/100)*calculo;

    }
    else{
        descuento =0;
        
    } 
    calculo = calculo - descuento;
    
    cantidadProvisional.textContent = `Total: ${parseFloat(calculo)}`
    validarPlazo = true;}
    else{
        plazoInput.classList.add("invalido")
        plazoInput.classList.remove("valido")
        document.getElementById("plazoError").textContent=`Debe seleccionar un producto e introducir un valor válido.`
    }
    
}
function calcularProducto(){
    cantidadProvisional.style.display ="block"
    const productoSelec= producto.options[producto.selectedIndex];
    const productoPrecio =parseFloat(productoSelec.dataset.precio)
    calculo = productoPrecio
    for (let i = 0; i < extras.length; i++) {
        const extra = extras[i]; // Obtenemos el checkbox actual
        if (extra.checked) {
            calculo += parseInt(extra.dataset.precio, 10); // Sumamos el precio si está marcado
        }
    }
    
    cantidadProvisional.textContent = `Total: ${calculo}`
    
    
    validarProducto = true; 
}

function validarFormulario(){
    if(valido === true && condiciones.checked &&emailValido &&nombreValido
    &&apellidosValido&&telefonoValido&&validarPlazo&&validarProducto){
        alert("Tu compra se ha realizado con éxito.")
    }
    else{
        alert("Debes cumplimentar todos los campos.")
    }
}
function resetFormulario() {
    // Reinicia los campos de texto
    nombreInput.value = "";
    telefonoInput.value = "";
    emailInput.value = "";
    contrasenaInput.value = "";
    apellidosInput.value = "";
    plazoInput.value = "";

    // Elimina mensajes de error
    document.getElementById("nombreError").textContent = "";
    document.getElementById("apellidosError").textContent = "";
    document.getElementById("telefonoError").textContent = "";
    document.getElementById("emailError").textContent = "";

    // Restablece los select y checkboxes
    producto.selectedIndex = 0; // Selecciona el primer producto
    for (let i = 0; i < extras.length; i++) {
        extras[i].checked = false;
    }
    condiciones.checked = false;

    // Reinicia las clases de estilo
    nombreInput.classList.remove("valido", "invalido");
    apellidosInput.classList.remove("valido", "invalido");
    telefonoInput.classList.remove("valido", "invalido");
    emailInput.classList.remove("valido", "invalido");
    plazoInput.classList.remove("valido", "invalido");

    // Oculta el total provisional
    cantidadProvisional.style.display = "none";

    // Reinicia las variables de control
    calculo = 0;
    totalExtras = 0;
    validarProducto = false;
    validarPlazo = false;
    nombreValido = false;
    apellidosValido = false;
    telefonoValido = false;
    emailValido = false;
    valido = false;
}
//Aplicamos eventos.
producto.addEventListener("change",()=>{
    plazoInput.value=""
    calcularProducto()})
plazoInput.addEventListener("input", plazoDescuento)
plazoInput.addEventListener("change", plazoDescuento)
for (let i = 0; i < extras.length; i++) {
    extras[i].addEventListener("change", sumaExtras);
}
enviarbtn.addEventListener("click",e=>{
    e.preventDefault()
    validarFormulario()
})

// Agrega el evento al botón de reinicio
document.getElementById("resetear").addEventListener("click",e=>{
    e.preventDefault()
    resetFormulario()
});