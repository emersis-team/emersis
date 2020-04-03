var kmzParser;

function initEmersis() {

    kmzParser = new L.KMZParser({
        onKMZLoaded: function (layer, name) {
            control.addOverlay(layer, name);
            layer.addTo(mymap);
        }
    });

}

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


function agregarEntidad(x, y, tipo) {

    // Fix Temporal hasta mejorar los tipos
    var currentIcon = null;
    if (tipo == "Sanidad")
        currentIcon = ambulanceIcon;
    if (tipo == "Seguridad")
        currentIcon = hummerIcon;
    L.marker([x, y], {
        icon: currentIcon
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

var emergenciaActual;

function refrescarEmergencia(emergencia) {
    emergenciaActual = obtenerEmergencia(emergencia);
    emergenciaActual.entidades.forEach(function (entry) {
        agregarEntidad(entry.posicion.latitud, entry.posicion.longitud, entry.tipo);
    });

    emergenciaActual.calcos.forEach(function (entry) {
        agregarCalco("./examples/" + entry);
    });

}

function obtenerEmergencia(id) {
    var current = null;
    emergencias.forEach(function (entry) {
        if (entry.id == id)
            current = entry;
    });

    return current;
};

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function loadUserData() {

    var username = getCookie("username");
    
    if (isColaborador(username)) {
        document.getElementById("situacion").classList.remove("hidden");
	}
    
    if (isCoordinador(username)) {
        document.getElementById("analisis").classList.remove("hidden");
	}

    $.each(entidades, function (num) {
        if (entidades[num].username == username) {
            document.getElementById("username").text = entidades[num].nombre;
            document.getElementById("btnLogin").classList.add("hidden");
        }
    });


    $.each(emergencias, function (num) {
        var link = document.createElement("a");
        link.innerHTML = emergencias[num].nombre;
        link.setAttribute('onclick', 'refrescarEmergencia(' + emergencias[num].id + ')');
        link.setAttribute('id', emergencias[num].id);
        document.getElementById("emergenciasLista").appendChild(link);

    });

}
