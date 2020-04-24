import angular from "angular";
import "@uirouter/angularjs";
import AppModule from "./bootstrapper";
import "./module";
import "./scss/index.scss";
import WizardShimTemplate from "./wizard-shim.html";

angular.module(AppModule).config(["$locationProvider",
	function ($locationProvider) {
		// $locationProvider.hashPrefix('!');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		});
	}
]);

angular.module(AppModule).config(["$stateProvider",
	function ($stateProvider) {
		$stateProvider.state({
			name: "root",
			url: "/",
			template: WizardShimTemplate
		});

	}
]);
