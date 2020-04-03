function agregarEnRecurso() {
	$('.lineaRelleno:first').clone().appendTo('#listaDeRecursos').attr({});
	$('#listaDeRecursos:first').find('.lineaRelleno:last')
			.removeClass("hidden");
}

function agregarEnNecesidad() {
	$('.lineaRelleno:first').clone().appendTo('#listaDeNecesidades').attr({});
	$('#listaDeNecesidades:first').find('.lineaRelleno:last').removeClass(
			"hidden");
}

function cargarStuacionDeEntidad() {
	var user = getCookie("username");
	if (username != null) {
		$.each(entidades, function(num) {
			if (entidades[num].username == user) {
				user = entidades[num];
			}
		});
		document.getElementById("nombreEntidadRecursos").textContent = user.nombre;
		$.each(user.capacidades, function(num) {
			$('.lineaRelleno:last').clone().appendTo('#listaDeRecursos').attr(
					{});
			$('.lineaRelleno:last').find('.recurso').val(
					user.capacidades[num].recurso.nombre);
			$('.lineaRelleno:last').find('.cantidad').val(
					user.capacidades[num].cantidad);
			$('.lineaRelleno:last').removeClass("hidden");
		});

		$.each(user.necesidades, function(num) {
			$('.lineaRelleno:last').clone().appendTo('#listaDeNecesidades')
					.attr({});
			$('.lineaRelleno:last').find('.recurso').val(
					user.necesidades[num].recurso.nombre);
			$('.lineaRelleno:last').find('.cantidad').val(
					user.necesidades[num].cantidad);
			$('.lineaRelleno:last').removeClass("hidden");
		});
	}
};
