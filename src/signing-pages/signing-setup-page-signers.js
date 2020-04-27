import angular from "angular";
import template from "./signing-setup-page-signers.html";

export default {
	bindings: {
		roles: "<",
		originalRoles: "<",
	},
	require: {
		wndModel: "?^",
		certificationWizard: "^"
	},
	template: template,
	controller: SigningSetupPageSignersCtrl,
	transclude: true,
};

SigningSetupPageSignersCtrl.$inject = [];
function SigningSetupPageSignersCtrl() {
	const $ctrl = this;
	
	$ctrl.$onInit = function () {
	};

	$ctrl.removeRole = function (index) {
		$ctrl.roles.splice(index, 1);
	};

	$ctrl.cloneRole = function () {
		$ctrl.roles.push(angular.copy($ctrl.roles[$ctrl.roles.length - 1]));
	};
	
}
