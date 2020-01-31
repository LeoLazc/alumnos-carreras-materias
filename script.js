
$(document).ready(function(){
  var alumnos = [];
  var carreras = [];
  var materias = [];
  //obtener alumnos
  $.getJSON("https://5dfa8e7e38678a00145fa4b0.mockapi.io/api/v1/Alumnos", function(arrayAlumnos){
    $.each(arrayAlumnos, function(indice, objeto){
      $("#alumnos").append('<option value="' + objeto.numDoc + '">'  + objeto.apellido + ', ' + objeto.nombre + '</option>');
    });
    alumnos = arrayAlumnos;
    console.log(alumnos);
  });

  //obtener carreras
  $.getJSON("http://5dfa8e7e38678a00145fa4b0.mockapi.io/api/v1/Carreras", function(arrayCarreras){

    carreras = arrayCarreras;
    console.log(carreras);
    });

  //obtener materias
  $.getJSON("http://5dfa8e7e38678a00145fa4b0.mockapi.io/api/v1/Materias", function(arrayMaterias){
    materias = arrayMaterias;
    console.log(materias);
    });

  //llenar las carreras en base al select de alumnos
  var llenarCarreras = function(){
    var seleccion = $("#alumnos").val();
    $("#carreras").empty();
    $.each(carreras, function(indice, objeto){
      var documentoAlumno = seleccion.trim();
      var documentoCarrera = objeto.numDoc.trim();
      if (documentoAlumno == documentoCarrera) {
        $("#carreras").append('<option value="' + objeto.idCarrera + '">'  + objeto.descripcion + '</option>');
      }
    });
  }
  $("#alumnos").change(llenarCarreras);

  //llenar el div con la tabla
  var llenarMaterias = function(){
    var seleccionAlumno = $("#alumnos").val();
    var seleccionCarrera = $("#carreras").val();
    $(".materias").empty();
    $.each(materias, function(indice, objeto){
      var documentoAlumno = seleccionAlumno.trim();
      var documentoMateria = objeto.numDoc.trim();
      if (documentoAlumno == documentoMateria && objeto.idCarrera==seleccionCarrera) {
        $(".materias").
        append('<tr><td>' + objeto.idMateria + '</td><td>' + objeto.descripcion + '</td><td>' + objeto.añoCurso + '</td></tr>');
      }
    });
  }
  $("#carreras").change(llenarMaterias);
  $("#alumnos").change(llenarCarreras, llenarMaterias);




});
