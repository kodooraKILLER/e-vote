var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
 $routeProvider
 .when("/", { template: "Order Details" })
 .when("/first", { templateUrl: "first.html" })
 .when("/second", { templateUrl: "second.html" })
 .when("/third", { templateUrl: "third.html" })
 .otherwise({ redirectto: "index.html" });
}).config(function($locationProvider) {
 $locationProvider.hashPrefix('!');
});
