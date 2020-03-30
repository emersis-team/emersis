var kmzParser = new L.KMZParser({
    onKMZLoaded: function(layer, name) {
        control.addOverlay(layer, name);
        layer.addTo(mymap);
    }
});

var ambulanceIcon = L.icon({
    iconUrl: "https://www.stickpng.com/assets/images/5afac8866554160a79bea11f.png",

    iconSize: [32, 32], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var hummerIcon = L.icon({
    iconUrl: "https://www.spore.com/static/image/500/547/145/500547145370_lrg.png",

    iconSize: [32, 32], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function agregarEntidad(x, y) {
    L.marker([x, y], {
        icon: ambulanceIcon
    }).addTo(mymap);
}

function agregarCalco(ruta) {
    kmzParser.load(ruta);
}

function agregarAlcance(x, y, color, transparencia, radio) {
    var circleGreen = L.circle([x, y], {
        color: color,
        fillColor: color,
        fillOpacity: transparencia,
        radius: radio
    }).addTo(mymap);
}
