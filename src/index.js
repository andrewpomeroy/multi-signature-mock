import "jquery";
import angular from "angular";
import "@uirouter/angularjs";
import "@windsor/angular-material";
import "@windsor/form-ng";
import "angular-aria";
import "angular-sanitize";
import "angular-animate";

import AppModule from "./bootstrapper";
import "./module";
import "./scss/index.scss";

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
			template: "<wizard-shim class=\"FlexView\"></wizard-shim>"
		});

	}
]);
