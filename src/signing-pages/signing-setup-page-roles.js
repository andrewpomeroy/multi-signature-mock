import angular from "angular";
import template from "./signing-setup-page-roles.html";

export default {
	bindings: {
		roles: "<",
		originalRoles: "<",
	},
	require: {
		wndModel: "?^",
		signingWizard: "^"
	},
	template: template,
	controller: SigningSetupPageRolesCtrl,
	transclude: true,
};

SigningSetupPageRolesCtrl.$inject = [];
function SigningSetupPageRolesCtrl() {
	const $ctrl = this;

	Object.defineProperties($ctrl, {
		hasEditableRole: {
			get: () => $ctrl.roles.find(x => !x.isReadOnly)
		}
	});

	
	$ctrl.$onInit = function () {
	};

	$ctrl.removeRole = function (index) {
		$ctrl.roles.splice(index, 1);
	};

	$ctrl.cloneRole = function () {
		$ctrl.roles.push(angular.copy($ctrl.roles[$ctrl.roles.length - 1]));
	};

}
