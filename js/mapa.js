var mymap = L.map("mapid").setView([ -34.574503, -58.435714 ], 18);
L.tileLayer(
				"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
				{
					maxZoom : 18,
					attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
							+ '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
							+ 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
					id : "mapbox/streets-v11",
					tileSize : 512,
					zoomOffset : -1
				}).addTo(mymap);

var control = L.control.layers(null, null, {
	collapsed : true,
	position : 'bottomright'
}).addTo(mymap);

agregarEntidad(-34.574503, -58.435714);
agregarAlcance(-34.574503, -58.435714, "green", 0.3, 75);
agregarCalco('./examples/primerosContagios.kmz');
agregarCalco('./examples/zonaInundadaRioUruguay.kmz');
agregarCalco('./examples/zonaTerremotosSanJuan.kmz');
agregarCalco('./examples/desbordamientoRioParana.kmz');
agregarCalco('./examples/desbordamientoRioParana2.kmz');

mymap.on('baselayerchange', function(e) {
	console.log(e);
});
