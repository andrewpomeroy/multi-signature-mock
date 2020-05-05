import angular from "angular";
import template from "./esign-template.html";

export default {
	bindings: {
		outerCtrl: "<",
		roles: "<"
	},
	require: {
		wndModel: "?^",
		signingWizard: "?^"
	},
	template: template,
	controller: EsignCtrl,
};

EsignCtrl.$inject = ["$scope"];
function EsignCtrl($scope) {
	const $ctrl = this;
	$ctrl.$onInit = function () {
		$scope.esignCtrl = $ctrl.outerCtrl || $ctrl;
	};
}

