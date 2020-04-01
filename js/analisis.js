var entidades = [
  {
    id: 1,
    nombre: "nombre1",
    posicion: {
      latitud: -34.574509,
      longitud: -58.435715
    },
    datos: {
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
    datos: {
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
    datos: {
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
var capacidades = [];
var necesidades = [];

var entidadFiltro = null;
var necesidadFiltro = null;
var capadidadFiltro = null;
var responsableFiltro = null;

agregarEntidadesATabla(entidades);
agregarEntidadesADropdown(entidades);

function agregarEntidadesATabla(array) {
  $(".analisis-table-body").empty();
  var index = 0;
  array.forEach(function(e) {
    if (
      (entidadFiltro == null ||
        (entidadFiltro != null && e.id == entidadFiltro.id)) &&
      (capadidadFiltro == null ||
        e.capacidades.some(c => c.id == capadidadFiltro.id)) &&
      (necesidadFiltro == null ||
        e.necesidades.some(c => c.id == necesidadFiltro.id)) &&
      (responsableFiltro == null ||
        (responsableFiltro != null &&
          e.datos.responsable.id == responsableFiltro.id))
    ) {
      e.capacidades.forEach(function(c) {
        index++;
        if (capadidadFiltro == null || c.id == capadidadFiltro.id) {
          var item =
            (index % 2 == 0
              ? "<tr style='background-color: #F8F8F8;'>"
              : "<tr>") +
            "<td>" +
            e.nombre +
            "</td>" +
            "<td>" +
            e.datos.responsable.nombre +
            "</td>" +
            "<td>Capacidad</td>" +
            "<td>" +
            c.nombre +
            "</td>" +
            "<td>" +
            c.cantidad +
            "</td>" +
            "</tr>";
          $(".analisis-table-body").append(item);
        }
      });
      e.necesidades.forEach(function(c) {
        index++;
        if (necesidadFiltro == null || c.id == necesidadFiltro.id) {
          var item =
            (index % 2 == 0
              ? "<tr style='background-color: #F8F8F8;'>"
              : "<tr>") +
            "<td>" +
            e.nombre +
            "</td>" +
            "<td>" +
            e.datos.responsable.nombre +
            "</td>" +
            "<td>Necesidad</td>" +
            "<td>" +
            c.nombre +
            "</td>" +
            "<td>" +
            c.cantidad +
            "</td>" +
            "</tr>";
          $(".analisis-table-body").append(item);
        }
      });
    }
  });
}
function agregarEntidadesADropdown(array) {
  responsables = [];
  capacidades = [];
  necesidades = [];
  $("#analisis-dropdown-entidades").append(
    '<li class="analisis-dropdown-entidades-li"><a href="#" onclick="resetEntidadesDropdown()">Todos</a></li>'
  );
  array.forEach(function(e) {
    if (!responsables.some(r => r.id == e.datos.responsable.id)) {
      responsables.push(e.datos.responsable);
    }
    e.capacidades.forEach(function(c) {
      if (!capacidades.some(capacidad => capacidad.nombre == c.nombre)) {
        capacidades.push(c);
      }
    });
    e.necesidades.forEach(function(c) {
      if (!necesidades.some(necesidad => necesidad.nombre == c.nombre)) {
        necesidades.push(c);
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
  ordenarJsonArray(capacidades, "nombre", true);
  ordenarJsonArray(necesidades, "nombre", true);
  ordenarJsonArray(responsables, "nombre", true);
  agregarCapacidadesADropdown(capacidades);
  agregarNecesidadesADropdown(necesidades);
  agregarResponsablesADropdown(responsables);
}
function agregarCapacidadesADropdown(array) {
  $(".analisis-dropdown-capacidades-li").remove();
  $("#analisis-dropdown-capacidades").append(
    '<li class="analisis-dropdown-capacidades-li"><a href="#" onclick="resetCapacidades()">Todos</a></li>'
  );
  array.forEach(function(a) {
    $("#analisis-dropdown-capacidades").append(
      '<li class="analisis-dropdown-capacidades-li"><a href="#" onclick="elegirCapacidad(' +
        a.id +
        ')">' +
        a.nombre +
        "</a></li>"
    );
  });
}
function agregarNecesidadesADropdown(array) {
  $(".analisis-dropdown-necesidades-li").remove();
  $("#analisis-dropdown-necesidades").append(
    '<li class="analisis-dropdown-necesidades-li"><a href="#" onclick="resetNecesidades()">Todos</a></li>'
  );
  array.forEach(function(a) {
    $("#analisis-dropdown-necesidades").append(
      '<li class="analisis-dropdown-necesidades-li"><a href="#" onclick="elegirNecesidad(' +
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
  agregarEntidadesATabla(entidadesFiltradas);
  agregarEntidadesADropdown(entidadesFiltradas);
}
function buscarCapacidades() {
  capadidadFiltro = null;
  var value = $("#analisis-buscador-capacidades")
    .val()
    .toLowerCase();
  var capacidadesFiltradas = capacidades.filter(
    e => e.nombre.toLowerCase().indexOf(value) > -1
  );
  agregarCapacidadesADropdown(capacidadesFiltradas);
}
function buscarNecesidades() {
  necesidadFiltro = null;
  var value = $("#analisis-buscador-necesidades")
    .val()
    .toLowerCase();
  var necesidadesFiltradas = necesidades.filter(
    e => e.nombre.toLowerCase().indexOf(value) > -1
  );
  agregarNecesidadesADropdown(necesidadesFiltradas);
}
function buscarResponsables() {
  responsableFiltro = null;
  var value = $("#analisis-buscador-responsables")
    .val()
    .toLowerCase();
  var responsablesFiltradas = responsables.filter(
    e => e.toLowerCase().indexOf(value) > -1
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
  agregarEntidadesATabla(entidadesFiltradas);
  agregarEntidadesADropdown(entidades);
}
function elegirCapacidad(id) {
  var capacidad = capacidades.filter(c => c.id == id)[0];
  capadidadFiltro = capacidad;
  var entidadesFiltradas = entidades.filter(e =>
    e.capacidades.some(c => c.id == id)
  );
  $("#analisis-dropdown-capacidades-btn").text(capacidad.nombre);
  document.getElementById("analisis-dropdown-capacidades-btn").innerHTML +=
    '<span class="caret"></span>';
  agregarEntidadesATabla(entidadesFiltradas);
}
function elegirNecesidad(id) {
  var necesidad = necesidades.filter(n => n.id == id)[0];
  necesidadFiltro = necesidad;
  var entidadesFiltradas = entidades.filter(e =>
    e.necesidades.some(n => n.id == id)
  );
  $("#analisis-dropdown-necesidades-btn").text(necesidad.nombre);
  document.getElementById("analisis-dropdown-necesidades-btn").innerHTML +=
    '<span class="caret"></span>';
  agregarEntidadesATabla(entidadesFiltradas);
}
function elegirResponsable(id) {
  var responsable = responsables.filter(r => r.id == id)[0];
  responsableFiltro = responsable;
  var entidadesFiltradas = entidades.filter(e => e.datos.responsable.id == id);
  $("#analisis-dropdown-responsables-btn").text(responsable.nombre);
  document.getElementById("analisis-dropdown-responsables-btn").innerHTML +=
    '<span class="caret"></span>';
  agregarEntidadesATabla(entidadesFiltradas);
}
function resetEntidades() {
  $(".analisis-dropdown-entidades-li").remove();
}
function resetEntidadesDropdown() {
  resetEntidades();
  entidadFiltro = null;
  agregarEntidadesATabla(entidades);
  agregarEntidadesADropdown(entidades);
  $("#analisis-dropdown-entidades-btn").text("Todos");
  document.getElementById("analisis-dropdown-entidades-btn").innerHTML +=
    '<span class="caret"></span>';
}
function resetCapacidades() {
  $(".analisis-dropdown-capacidades-li").remove();
  capadidadFiltro = null;
  agregarEntidadesATabla(entidades);
  agregarCapacidadesADropdown(capacidades);
  $("#analisis-dropdown-capacidades-btn").text("Todos");
  document.getElementById("analisis-dropdown-capacidades-btn").innerHTML +=
    '<span class="caret"></span>';
}
function resetNecesidades() {
  $(".analisis-dropdown-necesidades-li").remove();
  necesidadFiltro = null;
  agregarEntidadesATabla(entidades);
  agregarNecesidadesADropdown(necesidades);
  $("#analisis-dropdown-necesidades-btn").text("Todos");
  document.getElementById("analisis-dropdown-necesidades-btn").innerHTML +=
    '<span class="caret"></span>';
}
function resetResponsables() {
  $(".analisis-dropdown-responsables-li").remove();
  responsableFiltro = null;
  agregarEntidadesATabla(entidades);
  agregarResponsablesADropdown(responsables);
  $("#analisis-dropdown-responsables-btn").text("Todos");
  document.getElementById("analisis-dropdown-responsables-btn").innerHTML +=
    '<span class="caret"></span>';
}
