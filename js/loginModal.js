function getLoginModal() {
  document.getElementById("_Menu").innerHTML +=
    '<div class="modal fade" id="myModalLogin" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '<h4 class="modal-title">Iniciar Sesión</h4>' +
    "</div>" +
    '<div class="modal-body">' +
    '<form action="" id="form-login" method="post" class="form padding-20">' +
    '<div class="form-group">' +
    '<label for="username" class="control-label">Usuario</label>' +
    "<div>" +
    '<input class="form-control" placeholder="Ingrese su nombre de usuario" type="text" ' +
    'autofocus = true, maxlenght="150">' +
    "</div>" +
    "</div>" +
    '<div class="form-group">' +
    '<label for="password" class="control-label">Contraseña</label>' +
    "<div>" +
    '<input id="password" class="form-control" placeholder="Ingrese su contraseña" type="password" ' +
    'autofocus = true, maxlenght="150">' +
    '<input type="checkbox" onclick="mostrarContra()">Mostrar contraseña' +
    "</div>" +
    "</div>" +
    '<div class="form-group">' +
    '<label for=""></label>' +
    "<div>" +
    '<button type="submit" class="btn btn-block btn-lg btn-primary" id="form-login-ingresar" data-loading-text="Ingresando..."><i class="fa fa-" aria-hidden="true"></i> Ingresar</button>' +
    "</div>" +
    "</div>" +
    "</form>" +
    "</div>" +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
}
