var formApp = angular.module('formApp', ['ngAnimate', 'ui.router','gm']);


var cities = [
              {
                  city : 'India',
                  desc : 'This is the best country in the world!',
                  lat : 23.200000,
                  long : 79.225487
              },
              {
                  city : 'New Delhi',
                  desc : 'The Heart of India!',
                  lat : 28.500000,
                  long : 77.250000
              },
              {
                  city : 'Mumbai',
                  desc : 'Bollywood city!',
                  lat : 19.000000,
                  long : 72.90000
              },
              {
                  city : 'Kolkata',
                  desc : 'Howrah Bridge!',
                  lat : 22.500000,
                  long : 88.400000
              },
              {
                  city : 'Chennai  ',
                  desc : 'Kathipara Bridge!',
                  lat : 13.000000,
                  long : 80.250000
              }
          ];





formApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    // Route to show base form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })

    // Nested states
    // Url will be nested (/form/espacios)
        .state('form.espacios', {
            url: '/espacios',
            templateUrl: 'form-espacios.html'
        })

        .state('form.ubicacion', {
            url: '/ubicacion',
            templateUrl: 'form-ubicacion.html',
            controller: 'MapCtrl'
        })

    // url will be (/form/interests)
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'form-interests.html'
        })


        .state('form.payment', {
            url: '/payment',
            templateUrl: 'form-payment.html'
        })

        .state('form.greetings', {
            url: '/greetings',
            templateUrl: 'form-payment_backup.html'
        })

        .state('form.equipamiento', {
            url: '/equipamiento',
            templateUrl: 'form-equipamiento.html'
        });

    // Catch all route
    // Send users to form page
    $urlRouterProvider.otherwise('/form/espacios');

});

formApp.controller('formController', function ($scope, $http, $state) {

    // Store all form data in this object
    $scope.espacios = {};
    $scope.espacios.anfitrion = "si";
    var url = "https://docs.google.com/forms/d/e/1FAIpQLSfMau3csnnfCxuzJCmzkKL6MT7WSPqxbkXCNhRj8pvcvf2WTg/formResponse?";
    //Function to process the form
    $scope.processForm = function () {


        if($scope.espacios.espacio1){
          //alert("si");
          url = url + "entry.2034663610=hotdesk";
        }
        if($scope.espacios.espacio2){
          //alert("si");
          url = url + "&entry.2034663610=saladereunion";
        }
        if($scope.espacios.espacio3){
          //alert("si");
          url = url + "&entry.2034663610=oficinaprivada";
        }
        if($scope.espacios.espacio4){
          //alert("si");
          url = url+"&entry.2034663610=roomoffice";
        }
        if($scope.espacios.anfitrion){
          if($scope.espacios.anfitrion == 'si'){
            //alert("afitrion si")
            url = url + "&entry.633493258=Si";
          }else{
            url = url + "&entry.633493258=No";
            //alert("anfitrion no");
          }

        }
        if($scope.espacios.equipamiento1){
            url = url+"&entry.335737359=wifi";
        }
        if($scope.espacios.equipamiento2){
            url = url+"&entry.335737359=aireacondicionado";
        }
        if($scope.espacios.equipamiento3){
            url = url+"&entry.335737359=cocina";
        }
        if($scope.espacios.equipamiento4){
            url = url+"&entry.335737359=terraza";
        }
        if($scope.espacios.equipamiento5){
            url = url+"&entry.335737359=estacionamiento";
        }
        if($scope.espacios.equipamiento6){
            url = url+"&entry.335737359=areascomunes";
        }
        if($scope.espacios.equipamiento7){
            url = url+"&entry.335737359=areasdedescanso";
        }
        if($scope.espacios.equipamiento8){
            url = url+"&entry.335737359=impresora";
        }
        if($scope.espacios.equipamiento9){
            url = url+"&entry.335737359=cafetera";
        }
        if($scope.espacios.equipamiento10){
            url = url+"&entry.335737359=dispensadordeagua";
        }



        if($scope.espacios.nombre){
          url = url + "&entry.752939772="+$scope.espacios.nombre;
        }
        if($scope.espacios.correo){
          url = url + "&entry.1486648297="+$scope.espacios.correo;
        }
        //alert(url);
        $state.go("form.greetings");
        alert('Información Enviada!');
        $http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };


    //$http.post(url).then(function (response) {

      // This function handles success

    //}, function (response) {

      // this function handles error

    //});



});

formApp.controller('MapCtrl', function ($scope) {

  angular.element(document).ready(function () {
  $scope.map = new google.maps.Map(document.getElementById('map'));

  $scope.lat = undefined;
  $scope.lng = undefined;
  var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(-33.463637,-70.6733087),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    // Center on user's current location if geolocation prompt allowed
    var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.map.setCenter(initialLocation);
    $scope.map.setZoom(15);
    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){

    var location = $scope.autocomplete.getPlace().geometry.location;

    $scope.lat = location.lat();
    $scope.lng = location.lng();
    $scope.$apply();

    $scope.map.setCenter(new google.maps.LatLng($scope.lat, $scope.lng));

    var citiesInfo = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(citi.lat, citi.long),
      title: "Tu oficina
    });


});
  }, function(positionError) {
    // User denied geolocation prompt - default to Chicago
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
    var location = $scope.autocomplete.getPlace().geometry.location;
    $scope.lat = location.lat();
    $scope.lng = location.lng();
    $scope.$apply();
    $scope.map.setCenter(new google.maps.LatLng($scope.lat, $scope.lng));



  });







    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }



});
});
