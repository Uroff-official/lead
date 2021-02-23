var formApp = angular.module('formApp', ['ngAnimate', 'ui.router']);

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
