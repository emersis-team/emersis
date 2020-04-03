var kmzParser;

function initEmersis() {

    kmzParser = new L.KMZParser({
        onKMZLoaded: function (layer, name) {
            control.addOverlay(layer, name);
            layer.addTo(mymap);
        }
    });

}

var sanidadIcon = L.icon({
    iconUrl: "./images/sanidad.png",
    iconSize: [32, 32]
});

var seguridadIcon = L.icon({
    iconUrl: "./images/seguridad.png",
    iconSize: [32, 32]
});


function agregarEntidad(entidad) {

    // Fix Temporal hasta mejorar los tipos

    var currentIcon = null;
    if (entidad.tipo == "Sanidad")
        currentIcon = sanidadIcon;
    if (entidad.tipo == "Seguridad")
        currentIcon = seguridadIcon;
    var marker = L.marker([entidad.posicion.latitud, entidad.posicion.longitud], {
        icon: currentIcon
    }).addTo(mymap);

    marker.bindTooltip(entidad.nombre, {
        permanent: true, 
        direction: 'top',offset: L.point({x: 0, y: -15})
    });
    marker.bindPopup("<img src='./images/contacto.png' height='24' width='24'/>" + entidad.datosContacto.responsable.nombre + "</br></br><img src='./images/number.png' height='24' width='24'/>" + entidad.datosContacto.telefono);
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
    limpiarMapa();
    emergenciaActual = obtenerEmergencia(emergencia);
    emergenciaActual.entidades.forEach(function (entidad) {
        agregarEntidad(entidad);
    });

    emergenciaActual.calcos.forEach(function (calco) {
        agregarCalco("./examples/" + calco);
    });

}

function limpiarMapa() {

    // Este metodo re inicia todo el mapa, hay que ver si existe una manera mas limpia de hacerlo
    mymap.eachLayer(function (layer) {
        mymap.removeLayer(layer);
    });

    control.remove();
    control = L.control.layers(null, null, {
        collapsed: true,
        position: 'bottomright'
    }).addTo(mymap);

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
    	var nombreVisible = "Colaborador";
        document.getElementById("situacion").classList.remove("hidden");
        document.getElementById("btnLogin").classList.add("hidden");
        var entidad = entidadDeUsuario(username);
        if (entidad != null) {
        	nombreVisible = entidad.nombre;
		}
        document.getElementById("username").text = nombreVisible;
        document.getElementById("btnSalir").classList.remove("hidden");
  	}
    
    if (isCoordinador(username)) {
    	var nombreVisible = "Coordinador";
        document.getElementById("analisis").classList.remove("hidden");
        document.getElementById("btnLogin").classList.add("hidden");
        var emergencia = emergenciaDeUsuario(username);
        if (emergencia != null) {
        	nombreVisible = emergencia.nombre;
		}
        document.getElementById("username").text = nombreVisible;
        document.getElementById("btnSalir").classList.remove("hidden");
	}

    $.each(emergencias, function (num) {
        var link = document.createElement("a");
        link.innerHTML = emergencias[num].nombre;
        link.setAttribute('onclick', 'refrescarEmergencia(' + emergencias[num].id + ')');
        link.setAttribute('id', emergencias[num].id);
        document.getElementById("emergenciasLista").appendChild(link);

    });

}


function centrarZoom(entidad)
{
    mymap.setView([entidad.posicion.latitud, entidad.posicion.longitud], 17);
}

function crearBotonCentrar()
{
    L.easyButton( '<span class="star">&starf;</span>', function(){
        var usuario = getCookie("username");
        if (isColaborador(usuario)) {
            var entidad = entidadDeUsuario(usuario);
            centrarZoom(entidad);
        }

        if (isCoordinador(getCookie("username"))) {
            var emergencia = emergenciaDeUsuario(usuario);
            centrarZoom(emergencia.entidades[0]);
        }
      }).addTo(mymap);
}
