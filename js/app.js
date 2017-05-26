function initMap() {
  var latitud,longitud,miUbicacion;
  var laboratoriaLima = {lat:-12.1191427, lng:-77.0349046};
  var mapa= new google.maps.Map(document.getElementById('map'),
                              {zoom:18, center:laboratoriaLima});

  // var marcadorlaboratoria = new google.maps.Marker({position: laboratoriaLima, map: mapa});

// Capturando punto partida y punto destino con autocompletado en inputs
  var inputPartida = document.getElementById('partida');
  var inputDestino = document.getElementById('destino');
  var tarifa = document.getElementById('tarifa');

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;



  function buscar (e){
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
    }
  }

  var funcionExito = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    miUbicacion = new google.maps.Marker({
      position:{lat:latitud, lng:longitud},
      map:mapa
    });
    mapa.setZoom(18);
    mapa.setCenter({lat:latitud, lng:longitud});
  }

  var funcionError = function(error) {
    alert("Tenemos un problema con encontrar tu posicion actual");
  }

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
      directionsService.route({
        origin: inputPartida.value,
        destination: inputDestino.value,
        travelMode: 'DRIVING'
      }, function(response,status){
        if(status === 'OK'){
          console.log(response.routes[0].legs[0].distance.text);
          var distance1 = response.routes[0].legs[0].distance.value/1000;
          var distancia = Number((response.routes[0].legs[0].distance.text.replace(" km","")).replace(",","."));

          tarifa.classList.remove("none");
          var costo = distancia*1.75;
          console.log(typeof costo);
          if (costo < 4) {
            tarifa.appendChild(document.createTextNode("S/. 4.00"));
          }else{
            tarifa.innerHTML=`S/. ${parseInt(costo)}`;
          }
          console.log(response.routes[0].legs[0].distance.text);
          directionsDisplay.setDirections(response);
          if(miUbicacion!==undefined){
            miUbicacion.setMap(null);
          }else {
            window.alert("No encontramos");
          }

        }else {
          window.alert("No encontramos una ruta.");
        }
      });
    }

    directionsDisplay.setMap(mapa);
    var trazarRuta = function(e) {
      e.preventDefault();
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

  document.getElementById('encuentrame').addEventListener("click", buscar);
  document.getElementById('trazar').addEventListener("click", trazarRuta);
}
