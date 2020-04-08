function cargarDestinatarios() {
    debugger;
    var listaDeEntidadesAEnviar = [];
	var username = getCookie("username");
	if (username != null) {
        
		$.each(entidades, function(num) {
			if (entidades[num].username != username) {
				listaDeEntidadesAEnviar.push(entidades[num]);
			}
        });
        
        $.each(listaDeEntidadesAEnviar, function(num) {

            let opcion = "<option value='"+ listaDeEntidadesAEnviar[num].id +"'>" + listaDeEntidadesAEnviar[num].nombre +"</option>";
            $(".listaDeDestinatarios").append(opcion);

		});

	}
};
