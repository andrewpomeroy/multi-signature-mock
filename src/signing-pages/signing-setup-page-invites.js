import angular from "angular";
import template from "./signing-setup-page-roles.html";

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
	controller: SigningSetupPageRolesCtrl,
	transclude: true,
};

SigningSetupPageRolesCtrl.$inject = [];
function SigningSetupPageRolesCtrl() {
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
