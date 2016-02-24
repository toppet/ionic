// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router','ngAnimate','ngCordova'])

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
			 controller: 'PrefCtrl'
		 });
		 $urlRouterProvider.otherwise('/preferences');
})

.controller('MainCtrl', function($scope, $ionicPlatform, $ionicLoading, $timeout, $state, $cordovaBluetoothSerial){
	$ionicPlatform.ready(function(){
		$scope.sendOn = function(){
			bluetoothSerial.write("1", function(){}, function(){});
		};

		$scope.sendOff = function(){
			bluetoothSerial.write("0", function(){}, function(){});
		};
	});
})

.controller('PrefCtrl', function($scope, $ionicPlatform, $ionicLoading, $timeout, $state, $cordovaBluetoothSerial){

	$ionicPlatform.ready(function(){
		$scope.pairedDeviceList = [];
		$scope.newDeviceList = [];

		$scope.listDevices = function(){
			$ionicLoading.show({ template: '<ion-spinner icon="ripple"></ion-spinner>' });
			bluetoothSerial.list(function(devices){
				$scope.pairedDeviceList = devices;
				$ionicLoading.hide();
			},
			function(err){
				alert(err);
			});
		};

		$scope.findNew = function(){
			$ionicLoading.show({ template: '<ion-spinner icon="ripple"></ion-spinner>' });
			bluetoothSerial.discoverUnpaired(function(devices) {
			    $scope.newDeviceList = devices;
			    $ionicLoading.hide();
			}, function(err){alert(err);});
		};
		
		$scope.connectToDevice = function(deviceAdd){
			bluetoothSerial.connect(deviceAdd, function(){
				$scope.msg = 'Sikeres kapcsolódás!';
				$timeout(function(){
					$state.go('main');
				},1500);
			},function(err){ alert(err); });
			
		};
	}); /*ionic ready */
	
});