function cargarStuacionDeEntidad() {
	var user = getCookie("username");
	if (username != null) {
		$.each(entidades, function(num) {
			if (entidades[num].username == user) {
				user = entidades[num];
			}
		});
		$('.nombreEntidad').text = user.nombre;
		var objetoACopiar = $('.lineaRelleno:first');
		$.each(user.capacidades,
			function(num) {
				objetoACopiar.clone().appendTo('.listaDeRecursos');
				$('.lineaRelleno:last').find('.recurso').text = (user.capacidades[num].recurso.nombre);
				$('.lineaRelleno:last').find('.cantidad').text = (user.capacidades[num].cantidad);
				$('.lineaRelleno:last').classList.remove("hidden");
			});

		$.each(user.necesidades,
			function(num) {
				objetoACopiar.clone().appendTo('.listaDeNecesidades');
				$('.lineaRelleno:last').find('.recurso').text = (user.capacidades[num].recurso.nombre);
				$('.lineaRelleno:last').find('.cantidad').text = (user.capacidades[num].cantidad);
				$('.lineaRelleno:last').classList.remove("hidden");
			});
	}
};
