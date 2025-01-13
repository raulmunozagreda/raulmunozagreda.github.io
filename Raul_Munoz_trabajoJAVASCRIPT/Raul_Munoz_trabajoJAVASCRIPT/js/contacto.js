let options={
    enableHighAccuracy:true,
    timeout: 5000,
    maximunAge:0
}
if(navigator.geolocation){
    
    navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
    )

}
else{
    alert("No has permitido la geolocalizacion.")
}

function success(position){
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
    let map = L.map('map',{
        center:[51.6303524 ,-0.7983671],
        zoom:14
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
        let marker =L.marker([51.6303524 ,-0.7983671]).addTo(map)
        let control = L.Routing.control({
        waypoints:[
            L.latLng(latitud,longitud),
            L.latLng(51.6303524,-0.7983671)],
        language:"es"}).addTo(map)
}
function error(){
    let map = L.map('map',{
        center:[51.6303524 ,-0.7983671],
        zoom:14
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    let marker =L.marker([51.6303524 ,-0.7983671]).addTo(map)
    document.getElementById("btn-rastrear").addEventListener("click", ()=>{
        alert("Debes compartir tu ubicacion")

    })
}
    
