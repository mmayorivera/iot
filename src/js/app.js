'use strict';

var app = angular.module('iot', ['ionic','ngCordova','chart.js', 'btford.socket-io','ngResource'])

app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  
  $stateProvider
    .state('router', {
      url: "/route",
      abstract: true,
      templateUrl: "templates/side-menu-left.html"
    })
    .state('router.dashboard', {
      url: "/dashboard",
	  	abstract: true,
      views: {
        'menuContent' :{
          templateUrl: "templates/dashboard.html",
          controller: 'Dashboard'
        }
      }
    })
	.state('router.dashboard.home', {
      url: "/home",
      views: {
        'home-tab' :{
          templateUrl: "templates/home.html"
        }
      }
    })
	.state('router.dashboard.favorites', {
      url: "/favorites",
      views: {
        'favorites-tab' :{
          templateUrl: "templates/favorites.html"
        }
      }
    })
	.state('router.dashboard.settings', {
      url: "/settings",
      views: {
        'settings-tab' :{
          templateUrl: "templates/settings.html",
          controller: 'settings'
        }
      }
    })
	.state('router.devices', {
      url: "/devices",
      views: {
        'menuContent' :{
          templateUrl: "templates/devices.html",
          controller: "deviceCtrl"
        }
      }
    })
	.state('router.device', {
      url: "/device",
      views: {
        'menuContent' :{
          templateUrl: "templates/device-single.html"
        }
      }
    })
  .state('router.editdevice', {
      url: "/editdevice",
      views: {
        'menuContent' :{
          templateUrl: "templates/edit-device.html",
          controller: "editDevice"
        }
      }
    })
	.state('router.locations', {
      url: "/locations",
      views: {
        'menuContent' :{
          templateUrl: "templates/locations.html",
          controller:"locations"
        }
      }
    })
	.state('router.editlocations', {
      url: "/editLocation",
      views: {
        'menuContent' :{
          templateUrl: "templates/editLocation.html",
          controller:"editLocation"
        }
      }
    })    
  .state('router.products', {
    url: "/products",
    views: {
      'menuContent' :{
        templateUrl: "templates/products.html",
        controller: "productCtrl"
      }
    }
  })
  .state('router.editproduct', {
    url: "/editproduct",
    views: {
      'menuContent' :{
        templateUrl: "templates/edit-product.html",
        controller: "editProduct"
      }
    }
  })
	.state('router.users', {
      url: "/users",
      views: {
        'menuContent' :{
          templateUrl: "templates/users.html",
          controller: "Users"
        }
      }
    })
	.state('router.addUser', {
      url: "/add-user",
      views: {
        'menuContent' :{
          templateUrl: "templates/add-user.html",
          controller: "addUser"
        }
      }
    })
	.state('router.addDevice', {
      url: "/add-device",
      views: {
        'menuContent' :{
          templateUrl: "templates/add-device.html",
          controller: "addDevice"
        }
      }
    })
	.state('router.addLocation', {
      url: "/add-location",
      views: {
        'menuContent' :{
          templateUrl: "templates/add-location.html",
          controller: "addLocation"
        }
      }
    })
  .state('router.addProduct', {
    url: "/add-product",
    views: {
      'menuContent' :{
        templateUrl: "templates/add-product.html",
        controller: "addProduct"
      }
    }
  })
	.state('intro', {
      url: "/intro",
      templateUrl: "templates/intro.html",
      controller: "Intro"
    })
  $urlRouterProvider.otherwise("/intro");
  
  $httpProvider.interceptors.push('AuthInterceptor');
}).
constant("API_URL", 'http://iottemplate-mmayorivera.c9.io');

app.directive('wrapOwlcarousel', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var options = scope.$eval($(element).attr('data-options'));
            $(element).owlCarousel(options);
        }
    };
});