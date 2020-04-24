import angular from "angular";
import template from "./signing-setup-page-methods.html";

export default {
	bindings: {
		model: "<",
	},
	template: template,
	controller: SigningSetupPageMethodsCtrl,
	transclude: true,
};

SigningSetupPageMethodsCtrl.$inject = [];
function SigningSetupPageMethodsCtrl() {
	const $ctrl = this;
	
}
