// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router','ngAnimate'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	 $stateProvider
		 .state('main', {
			 url: '/main',
			 templateUrl: 'templates/main.html',
			 controller: 'MainCtrl'
		 })
		 .state('preferences', {
			 url: '/preferences',
			 templateUrl: 'templates/preferences.html',
			 controller: 'PrefCtrl',
			 cache: false
		 });
		 $urlRouterProvider.otherwise('/preferences');
})

.controller('MainCtrl', function($scope, $state, $timeout){
	/*$timeout(function() {
		$state.go('preferences');
	}, 2000);*/
})

.controller('PrefCtrl', function($scope, $timeout, $ionicLoading, $state){
	$scope.pairedDeviceList = [];
	$scope.newDeviceList = [];
	$scope.connected = false;

	$ionicLoading.show({
			template: '<ion-spinner icon="ripple"></ion-spinner>'
	});

	$timeout(function(){
		for(var i=0; i < 3; i++){
			$scope.pairedDeviceList.push(i+1);
		}
		 $ionicLoading.hide();
	}, 1000);

	$scope.findNew = function(){
		for(var i=0; i<5; i++){
			$scope.newDeviceList.push(i+1);
		}
	};

	$scope.logger = function(value){
		$scope.connected = true;
		console.log("ezt nyomtad meg: " + (value));
		
		console.log($scope.connected?'igen':'nem');
		$scope.pairedDeviceList.push(55);
		$state.go('main');
	}

	$scope.connectToDevice = function(value){
		$scope.connected = true;
		console.log("csatlakozás ehhez: " + (value));
		$ionicLoading.show({
			template: '<ion-spinner icon="ripple"></ion-spinner>'
		});
		$timeout(function(){
			 $ionicLoading.hide();
			 console.log("Csatlakozásva: " + (value));
			 connected = true;
			 if(connected == true) {
			 	 $state.go('main');
			 }
		}, 1000);
	}

	
});