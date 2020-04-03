function cargarNotificaciones() {

    var user = getCookie("username");

    if (user != null) {

        for (let emergencia of emergencias) {

            if (emergencia.id === emergenciaActual.id) {

                $("#modal-alertas-body").empty();

                let publicaciones = emergencia.publicaciones;

                for (let publicacion of publicaciones) {

                    let fecha = publicacion.fecha.getDate() + "-" + (publicacion.fecha.getMonth() + 1) + "-" + publicacion.fecha.getFullYear();

                    let notification =
                        "<div style='padding: 15px'>" +
                        "<div class='alert-info' style='padding: 15px;'>" +
                        "<span class='glyphicon glyphicon-info-sign'></span><strong>" + publicacion.titulo + "</strong><strong style='float: right'>" + fecha + "</strong>" +
                        "<hr class='message-inner-separator'><p>" + publicacion.texto + "</p></div></div>";

                    $("#modal-alertas-body").append(notification);

                }

            }

        }

    }

}
