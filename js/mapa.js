var control;
var mymap;

function initMap() {

    mymap = L.map("mapid").setView([-34.574503, -58.435714], 18);
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
                + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
                + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

    control = L.control.layers(null, null, {
        collapsed: true,
        position: 'bottomright'
    }).addTo(mymap);

    crearBotonCentrar();

    prepararUbicacion();

}

var latitudUsuario;
var longitudUsuario;
var marker;
var markerRadio;

var customMarkerPH = L.icon({

    iconUrl: 'images/ubicacion.png',
    html: "<img  src='images/ubicacion.png' />",
    iconSize: [28, 28],
    className: 'location-marker'
});


function obtenerUbicacion() {
    mymap.locate({ setView: true, maxZoom: 16 });
}
function prepararUbicacion() {

    mymap.on('locationfound', function (e) {
        latitudUsuario = e.latitude;
        longitudUsuario = e.longitude;

        var b = new L.LatLng(latitudUsuario, longitudUsuario);
        mymap.setView(new L.LatLng(latitudUsuario, longitudUsuario), 16);

        if (typeof (marker) != "undefined") {
            marker.setLatLng(b);
        }
        else {
            marker = L.marker([latitudUsuario, longitudUsuario], { }).addTo(mymap);
            markerRadio = crearRadioUbicacion(e.latlng, e.accuracy).addTo(mymap);
        }
    });

    mymap.on('locationerror', onLocationError);

    obtenerUbicacion();

}


function onLocationError(e) {
    var username = getCookie("username");
    centrarEnUser(username);
}