import angular from "angular";
import template from "./signing-setup-page-methods.html";

export default {
	bindings: {
		model: "<",
	},
	require: {
		wndModel: "?^",
		signingWizard: "^"
	},
	template: template,
	controller: SigningSetupPageMethodsCtrl,
	transclude: true,
};

SigningSetupPageMethodsCtrl.$inject = [];
function SigningSetupPageMethodsCtrl() {
	const $ctrl = this;
	
	$ctrl.$onInit = function () {
		// console.log("wndModel", $ctrl.wndModel);
		// $ctrl._model = $ctrl.wndModel || $ctrl.model;
	};
	
}
