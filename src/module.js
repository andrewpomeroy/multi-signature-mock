import angular from "angular";
import "@uirouter/angularjs";
import WizardShimTemplate from "./wizard-shim.html";

angular.module("app", ["ui.router"]).controller("HelloController", function ($scope) {
	$scope.person = "andrew";
});

angular.module("app").config(["$locationProvider",
	function ($locationProvider) {
		// $locationProvider.hashPrefix('!');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		});
	}
]);

angular.module("app").config(["$stateProvider",
	function ($stateProvider) {
		$stateProvider.state({
			name: "root",
			url: "/",
			template: WizardShimTemplate
		});

	}
]);

import testComponent from "./components/test-component";
angular.module("app").component("testComponent", testComponent);
import certificationWizard from "./components/certification-wizard";
angular.module("app").component("certificationWizard", certificationWizard);
import componentWizard from "./components/component-wizard";
angular.module("app").component("componentWizard", componentWizard);
import componentWizardPage from "./components/component-wizard-page";
angular.module("app").component("componentWizardPage", componentWizardPage);
import componentWizardNav from "./components/component-wizard-nav";
angular.module("app").component("componentWizardNav", componentWizardNav);
