function initMap() {
  var laboratoriaLima = {lat:-12.1191427, lng:-77.0349046};
  var mapita= new google.maps.Map(document.getElementById('map'),
                              {zoom:18, center:laboratoriaLima});

  var marcadorlaboratoria = new google.maps.Marker({position: laboratoriaLima, map: mapita});

  function buscar (){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
    }
  }

  var latitud,longitud;

  var funcionExito = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var mapa= new google.maps.Map(document.getElementById('map'));

    var miUbicacion = new google.maps.Marker({
      position:{lat:latitud, lng:longitud},
      map:mapa
    });
    mapa.setZoom(18);
    mapa.setCenter({lat:latitud, lng:longitud});
  }

  var funcionError=function(error) {
    alert("sdsds");
  }

  document.getElementById('encuentrame').addEventListener("click", buscar);
}
