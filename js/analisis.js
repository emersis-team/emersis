var entidades = [
  {
    id: 1,
    nombre: "nombre1",
    posicion: {
      latitud: -34.574509,
      longitud: -58.435715
    },
    datosContacto: {
      responsable: {
        id: 31,
        nombre: "Persona1"
      },
      telefono: "4444444",
      dirección: "direccion1"
    },
    capacidades: [
      { id: 11, nombre: "recurso1", cantidad: 10 },
      { id: 12, nombre: "recurso2", cantidad: 5 }
    ],
    necesidades: [
      { id: 21, nombre: "necesidad1", tipo: "tipo1", cantidad: 10 },
      { id: 22, nombre: "necesidad2", tipo: "tipo1", cantidad: 5 }
    ]
  },
  {
    id: 2,
    nombre: "nombre2",
    posicion: {
      latitud: -34.575509,
      longitud: -58.438715
    },
    datosContacto: {
      responsable: {
        id: 32,
        nombre: "Persona2"
      },
      telefono: "4444444",
      dirección: "direccion2"
    },
    capacidades: [
      { id: 13, nombre: "recurso3", tipo: "tipo1", cantidad: 10 },
      { id: 14, nombre: "recurso4", tipo: "tipo1", cantidad: 5 }
    ],
    necesidades: [
      { id: 21, nombre: "necesidad1", tipo: "tipo1", cantidad: 10 },
      { id: 25, nombre: "necesidad5", tipo: "tipo1", cantidad: 5 }
    ]
  },
  {
    id: 3,
    nombre: "nombre3",
    posicion: {
      latitud: -34.573509,
      longitud: -58.435715
    },
    datosContacto: {
      responsable: {
        id: 33,
        nombre: "Persona3"
      },
      telefono: "4444444",
      dirección: "direccion3"
    },
    capacidades: [
      { id: 13, nombre: "recurso3", tipo: "tipo1", cantidad: 10 },
      { id: 14, nombre: "recurso4", tipo: "tipo1", cantidad: 5 }
    ],
    necesidades: [
      { id: 22, nombre: "necesidad2", tipo: "tipo1", cantidad: 10 },
      { id: 23, nombre: "necesidad3", tipo: "tipo1", cantidad: 5 }
    ]
  }
];

var responsables = [];
var recursos = [];
var entidadesEnTabla = [];

var entidadFiltro = null;
var recursoFiltro = null;
var responsableFiltro = null;
var ascendente = false;
var ultimoOrden = null;

agruparEntidades(entidades);
agregarEntidadesADropdown(entidades);

function agruparEntidades(array) {
  var entidadesAgrupadas = [];
  array.forEach(function(e) {
    e.capacidades.forEach(function(c) {
      if (
        !entidadesAgrupadas.some(
          entidad => entidad.id == e.id && entidad.recurso.id == c.id
        )
      ) {
        entidadesAgrupadas.push({
          id: e.id,
          nombre: e.nombre,
          responsable: e.datosContacto.responsable,
          recurso: {
            id: c.id,
            nombre: c.nombre,
            cantidadDisponible: c.cantidad
          }
        });
      } else {
        entidadesAgrupadas.filter(
          entidad => entidad.id == e.id && entidad.recurso.id == c.id
        )[0].recurso.cantidadDisponible += c.cantidad;
      }
    });
    e.necesidades.forEach(function(n) {
      if (
        !entidadesAgrupadas.some(
          entidad => entidad.id == e.id && entidad.recurso.id == n.id
        )
      ) {
        entidadesAgrupadas.push({
          id: e.id,
          nombre: e.nombre,
          responsable: e.datosContacto.responsable,
          recurso: {
            id: n.id,
            nombre: n.nombre,
            cantidadFaltante: n.cantidad
          }
        });
      } else {
        entidadesAgrupadas.filter(
          entidad => entidad.id == e.id && entidad.recurso.id == n.id
        )[0].recurso.cantidadFaltante += n.cantidad;
      }
    });
  });
  ordenarJson2doOrden(entidadesAgrupadas, "recurso", "nombre", true);
  agregarEntidadesATabla(entidadesAgrupadas);
}
function agregarEntidadesATabla(array) {
  entidadesEnTabla = [];
  $(".analisis-table-body").empty();
  var index = 0;
  var cantidadDisponibleTotal = 0;
  var cantidadFaltanteTotal = 0;
  array.forEach(function(e) {
    if (
      (entidadFiltro == null ||
        (entidadFiltro != null && e.id == entidadFiltro.id)) &&
      (responsableFiltro == null ||
        (responsableFiltro != null && e.responsable.id == responsableFiltro.id))
    ) {
      index++;
      if (recursoFiltro == null || e.recurso.id == recursoFiltro.id) {
        entidadesEnTabla.push(e);
        cantidadDisponibleTotal =
          cantidadDisponibleTotal +
          (e.recurso.cantidadDisponible != null
            ? e.recurso.cantidadDisponible
            : 0);
        cantidadFaltanteTotal =
          cantidadFaltanteTotal +
          (e.recurso.cantidadFaltante != null ? e.recurso.cantidadFaltante : 0);
        var item =
          (index % 2 == 0
            ? "<tr style='background-color: #F8F8F8;'>"
            : "<tr>") +
          "<td>" +
          e.recurso.nombre +
          "</td>" +
          "<td>" +
          (e.recurso.cantidadDisponible != null
            ? e.recurso.cantidadDisponible
            : "-") +
          "</td>" +
          "<td>" +
          (e.recurso.cantidadFaltante != null
            ? e.recurso.cantidadFaltante
            : "-") +
          "</td>" +
          "<td>" +
          e.responsable.nombre +
          "</td>" +
          "<td>" +
          e.nombre +
          "</td>" +
          "</tr>";
        $("#analisis-table-recursos").append(item);
      }
    }
  });
  $("#analisis-total-disponible").text(
    "(total: " + cantidadDisponibleTotal + ")"
  );
  $("#analisis-total-faltante").text("(total: " + cantidadFaltanteTotal + ")");
}
function agregarEntidadesADropdown(array) {
  responsables = [];
  recursos = [];
  $("#analisis-dropdown-entidades").append(
    '<li class="analisis-dropdown-entidades-li"><a href="#" onclick="resetEntidadesDropdown()">Todos</a></li>'
  );
  array.forEach(function(e) {
    if (!responsables.some(r => r.id == e.datosContacto.responsable.id)) {
      responsables.push(e.datosContacto.responsable);
    }
    e.capacidades.forEach(function(c) {
      if (!recursos.some(recurso => recurso.id == c.id)) {
        recursos.push(c);
      }
    });
    e.necesidades.forEach(function(c) {
      if (!recursos.some(recurso => recurso.id == c.id)) {
        recursos.push(c);
      }
    });
    $("#analisis-dropdown-entidades").append(
      '<li class="analisis-dropdown-entidades-li"><a href="#" onclick="elegirEntidad(' +
        e.id +
        ')">' +
        e.nombre +
        "</a></li>"
    );
  });
  ordenarJsonArray(recursos, "nombre", true);
  ordenarJsonArray(responsables, "nombre", true);
  agregarRecursosADropdown(recursos);
  agregarResponsablesADropdown(responsables);
}
function agregarRecursosADropdown(array) {
  $(".analisis-dropdown-recursos-li").remove();
  $("#analisis-dropdown-recursos").append(
    '<li class="analisis-dropdown-recursos-li"><a href="#" onclick="resetRecursos()">Todos</a></li>'
  );
  array.forEach(function(a) {
    $("#analisis-dropdown-recursos").append(
      '<li class="analisis-dropdown-recursos-li"><a href="#" onclick="elegirRecurso(' +
        a.id +
        ')">' +
        a.nombre +
        "</a></li>"
    );
  });
}
function agregarResponsablesADropdown(array) {
  $(".analisis-dropdown-responsables-li").remove();
  $("#analisis-dropdown-responsables").append(
    '<li class="analisis-dropdown-responsables-li"><a href="#" onclick="resetResponsables()">Todos</a></li>'
  );
  array.forEach(function(a) {
    $("#analisis-dropdown-responsables").append(
      '<li class="analisis-dropdown-responsables-li"><a href="#" onclick="elegirResponsable(' +
        a.id +
        ')">' +
        a.nombre +
        "</a></li>"
    );
  });
}
function buscarEntidades() {
  var value = $("#analisis-buscador-entidades")
    .val()
    .toLowerCase();
  var entidadesFiltradas = entidades.filter(
    e => e.nombre.toLowerCase().indexOf(value) > -1
  );
  resetEntidades();
  agruparEntidades(entidadesFiltradas);
  agregarEntidadesADropdown(entidadesFiltradas);
}
function buscarRecursos() {
  recursoFiltro = null;
  var value = $("#analisis-buscador-recursos")
    .val()
    .toLowerCase();
  var recursosFiltrados = recursos.filter(
    e => e.nombre.toLowerCase().indexOf(value) > -1
  );
  agregarRecursosADropdown(recursosFiltrados);
}
function buscarResponsables() {
  responsableFiltro = null;
  var value = $("#analisis-buscador-responsables")
    .val()
    .toLowerCase();
  var responsablesFiltradas = responsables.filter(
    e => e.nombre.toLowerCase().indexOf(value) > -1
  );
  agregarResponsablesADropdown(responsablesFiltradas);
}
function elegirEntidad(id) {
  var entidadesFiltradas = entidades.filter(e => e.id == id);
  entidadFiltro = entidadesFiltradas[0];
  $("#analisis-dropdown-entidades-btn").text(entidadesFiltradas[0].nombre);
  document.getElementById("analisis-dropdown-entidades-btn").innerHTML +=
    '<span class="caret"></span>';
  resetEntidades();
  agruparEntidades(entidadesFiltradas);
  agregarEntidadesADropdown(entidades);
}
function elegirRecurso(id) {
  var recurso = recursos.filter(c => c.id == id)[0];
  recursoFiltro = recurso;
  var entidadesFiltradas = entidades.filter(
    e =>
      e.capacidades.some(c => c.id == id) || e.necesidades.some(n => n.id == id)
  );
  $("#analisis-dropdown-recursos-btn").text(recurso.nombre);
  document.getElementById("analisis-dropdown-recursos-btn").innerHTML +=
    '<span class="caret"></span>';
  agruparEntidades(entidadesFiltradas);
}
function elegirResponsable(id) {
  var responsable = responsables.filter(r => r.id == id)[0];
  responsableFiltro = responsable;
  var entidadesFiltradas = entidades.filter(
    e => e.datosContacto.responsable.id == id
  );
  $("#analisis-dropdown-responsables-btn").text(responsable.nombre);
  document.getElementById("analisis-dropdown-responsables-btn").innerHTML +=
    '<span class="caret"></span>';
  agruparEntidades(entidadesFiltradas);
}
function resetEntidades() {
  $(".analisis-dropdown-entidades-li").remove();
}
function resetEntidadesDropdown() {
  resetEntidades();
  entidadFiltro = null;
  agruparEntidades(entidades);
  agregarEntidadesADropdown(entidades);
  $("#analisis-dropdown-entidades-btn").text("Todos");
  document.getElementById("analisis-dropdown-entidades-btn").innerHTML +=
    '<span class="caret"></span>';
}
function resetRecursos() {
  $(".analisis-dropdown-recursos-li").remove();
  recursoFiltro = null;
  agruparEntidades(entidades);
  agregarRecursosADropdown(recursos);
  $("#analisis-dropdown-recursos-btn").text("Todos");
  document.getElementById("analisis-dropdown-recursos-btn").innerHTML +=
    '<span class="caret"></span>';
}
function resetResponsables() {
  $(".analisis-dropdown-responsables-li").remove();
  responsableFiltro = null;
  agruparEntidades(entidades);
  agregarResponsablesADropdown(responsables);
  $("#analisis-dropdown-responsables-btn").text("Todos");
  document.getElementById("analisis-dropdown-responsables-btn").innerHTML +=
    '<span class="caret"></span>';
}
function ordenar(col) {
  $(".analisis-caret").css("opacity", 0);
  if (this.ultimoOrden == col) {
    this.ascendente = !this.ascendente;
  } else {
    this.ascendente = true;
  }
  ultimoOrden = col;
  var entidadesOrdenadas = [];
  switch (col) {
    case "recurso":
    case "responsable":
      entidadesOrdenadas = ordenarJson2doOrden(
        entidadesEnTabla,
        col,
        "nombre",
        this.ascendente
      );
      break;
    case "disponible":
      entidadesOrdenadas = ordenarJson2doOrden(
        entidadesEnTabla,
        "recurso",
        "cantidadDisponible",
        this.ascendente
      );
      break;
    case "faltante":
      entidadesOrdenadas = ordenarJson2doOrden(
        entidadesEnTabla,
        "recurso",
        "cantidadFaltante",
        this.ascendente
      );
      break;
    case "entidad":
      entidadesOrdenadas = ordenarJsonArray(
        entidadesEnTabla,
        "nombre",
        this.ascendente
      );
      break;
  }
  var id = "#analisis-caret-" + col;
  $(id).css("opacity", 1);
  if (this.ascendente == true) {
    $(id).css("transform", "rotate(0deg)");
  } else {
    $(id).css("transform", "rotate(180deg)");
  }
  agregarEntidadesATabla(entidadesOrdenadas);
}
