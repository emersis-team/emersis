var recursos = [ {
	id : 0,
	nombre : "Camión Transporte",
	tipo : "Vehículo"
}, {
	id : 1,
	nombre : "Ambulancia",
	tipo : "Vehículo"
}, {
	id : 2,
	nombre : "Camas Portátiles",
	tipo : "Insumo"
}, {
	id : 3,
	nombre : "Máscara de protección",
	tipo : "Insumo"
}, {
	id : 4,
	nombre : "Gasa",
	tipo : "Insumo"
}, {
	id : 5,
	nombre : "Frasada",
	tipo : "Insumo"
}, {
	id : 6,
	nombre : "Patrullero",
	tipo : "Vehículo"
}, {
	id : 7,
	nombre : "Guantes Médicos",
	tipo : "Insumo"
}, {
	id : 8,
	nombre : "Fuerzas de Seguridad",
	tipo : "Personal"
}, {
	id : 9,
	nombre : "Personal de Asistencia",
	tipo : "Personal"
}, {
	id : 10,
	nombre : "Agua",
	tipo : "Insumo"
} ];

var entidades = [ {
	id : 0,
	nombre : "Hospital Militar",
	username: "hospitalmilitar",
	tipo : "Sanidad",
	posicion : {
		latitud : -34.5703072,
		longitud : -58.4365975
	},
	datosContacto : {
		responsable : {
			id : 0,
			nombre : "coronel"
		},
		telefono : "4444444",
		dirección : "direccion1"
	},
	capacidades : [ {
		id : 0,
		recurso : recursos[2],
		cantidad : 1000
	}, {
		id : 1,
		recurso : recursos[1],
		cantidad : 50
	} ],
	necesidades : [ {
		id : 2,
		recurso : recursos[4],
		cantidad : 5000
	}, {
		id : 3,
		recurso : recursos[5],
		cantidad : 266
	} ]
}, {
	id : 1,
	nombre : "Policia de la Cuidad - Comisaría 15",
	username: "policia",
	tipo : "Seguridad",
	posicion : {
		latitud : -34.5915316,
		longitud : -58.455465
	},
	datosContacto : {
		responsable : {
			id : 1,
			nombre : "comisario"
		},
		telefono : "4444444",
		dirección : "direccion 2"
	},
	capacidades : [ {
		id : 4,
		recurso : recursos[6],
		cantidad : 100
	}, {
		id : 5,
		recurso : recursos[8],
		cantidad : 20
	} ],
	necesidades : [ {
		id : 6,
		recurso : recursos[8],
		cantidad : 50
	}, {
		id : 7,
		recurso : recursos[0],
		cantidad : 1
	} ]
}, {
	id : 2,
	nombre : "Centro de Evacuación",
	username: "centroevacuacion",
	tipo : "Sanidad",
	posicion : {
		latitud : -31.5317743,
		longitud : -68.5501862
	},
	datosContacto : {
		responsable : {
			id : 2,
			nombre : "doctor"
		},
		telefono : "4444444",
		dirección : "direccion 3"
	},
	capacidades : [ {
		id : 8,
		recurso : recursos[2],
		cantidad : 500
	}, {
		id : 9,
		recurso : recursos[9],
		cantidad : 50
	} ],
	necesidades : [ {
		id : 10,
		recurso : recursos[2],
		cantidad : 300
	}, {
		id : 11,
		recurso : recursos[0],
		cantidad : 50
	}, {
		id : 12,
		recurso : recursos[10],
		cantidad : 50000
	} ]
} ];

var emergencias = [
		{
			id : 0,
			nombre : "Coronavirus COVID-19",
			usuarioCoordinador : "virus19",
			fechaInicio : new Date("2020/03/20"),
			fechaFin : null,
			calcos : [ "Contagios Coronavirus 1.v1.kmz",
					"Contagios Coronavirus 2.v1.kmz",
					"Contagios Coronavirus 3.v1.kmz" ],
			entidades : [ entidades[0], entidades[1] ],
			publicaciones : [ {
				id : 0,
				titulo : "Lavarse las Manos",
				fecha : new Date("2020/03/25"),
				tipo : "Anuncio",
				texto : "Deben lavarse las manos con abundante jabón durante al menos 30 segundos"
			} ]
		},
		{
			id : 1,
			nombre : "Terremoto en San Juan",
			usuarioCoordinador : "terremoto08",
			fechaInicio : new Date("2008/04/18"),
			fechaFin : new Date("2008/05/02"),
			calcos : [ "Terremoto San Juan - Zona Afectada.v1.kmz",
					"Terremoto San Juan.v1.kmz" ],
			entidades : [ entidades[2] ],
			publicaciones : [
					{
						id : 1,
						titulo : "Dirigirse al centro de evacuados",
						fecha : new Date("2008/04/19"),
						tipo : "Anuncio",
						texto : "Deben dirigirse al centro de evacuados para su mayor seguridad"
					},
					{
						id : 2,
						titulo : "San Juan destruído",
						fecha : new Date("2008/04/23"),
						tipo : "Noticia",
						texto : "El terremoto ha dejado un sin número de edificios destruídos"
					} ]
		} ];

function isUsuario(user, pass) {
	return (pass == "123") && (isCoordinador(user) || isColaborador(user));
}

function isCoordinador(user) {
	var coordinadores = emergencias.map(usuarioCoordinador);
	return coordinadores.includes(user);
}

function isColaborador(user) {
	var colavorador = entidades.map(usuarioEntidad);
	debugger;
	return colavorador.includes(user);
}

function usuarioCoordinador(emergencia) {
	return emergencia.usuarioCoordinador;
}

function usuarioEntidad(entidad) {
	return entidad.username;
}
