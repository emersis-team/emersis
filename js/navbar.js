function getNavbar() {
  document.getElementById("_Navbar").innerHTML +=
    '<nav class="navbar navbar-default" id="_Menu">' +
    '<div class="container-fluid">' +
    "<!-- Brand and toggle get grouped for better mobile display -->" +
    '<div class="navbar-header">' +
    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">' +
    '<span class="sr-only">Toggle navigation</span>' +
    '<span class="icon-bar"></span>' +
    '<span class="icon-bar"></span>' +
    ' <span class="icon-bar"></span>' +
    "</button>" +
    '<a class="navbar-brand" href="#">' +
    "EMERSIS" +
    "</a>" +
    "</div>" +
    "<!-- Collect the nav links, forms, and other content for toggling -->" +
    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
    '<ul class="nav navbar-nav">' +
    '<li class="dropdown">' +
    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
    '<i class="fa fa-book" aria-hidden="true"></i>' +
    "Emergencias" +
    '<span class="caret"></span>' +
    "</a>" +
    '<ul class="dropdown-menu">' +
    "<li>" +
    '<a href="#"><span><i class="fa fa-book"></i>COVID-19</span></a>' +
    "</li>" +
    "</ul>" +
    "</li>" +
    ' <li class="dropdown">' +
    '<a href="#">' +
    "Alertas" +
    "</a>" +
    "</li>" +
    "</ul>" +
    '<ul class="nav navbar-nav navbar-right">' +
    "<li>" +
    '<li class="dropdown">' +
    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
    ' <i class="fa fa-book" aria-hidden="true"></i>' +
    "Usuario" +
    '<span class="caret"></span>' +
    " </a>" +
    '<ul class="dropdown-menu">' +
    " <li>" +
    '       <a data-toggle="modal" data-target="#myModalLogin">Iniciar Sesion</a>' +
    " </li>" +
    " <li>" +
    "      <a>Salir</a>" +
    "</li>" +
    "</ul>" +
    " </li>" +
    " </li>" +
    " </ul>" +
    "  </div><!-- /.navbar-collapse -->" +
    " </div><!-- /.container-fluid -->" +
    "</nav>";
  getLoginModal();
}
