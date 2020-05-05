import angular from "angular";
import template from "./signing-setup-page-summary.html";

export default {
	bindings: {
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

	$ctrl.$onInit = function () {
		$ctrl.roles = angular.copy($ctrl.wndModel.model.data.signingRoles);
	};

	Object.defineProperties($ctrl, {
		invites: {
			get: () => $ctrl.wndModel.model.data.invites
		},
		isSelfSigned: {
			get: () => $ctrl.wndModel.model.data.isSelfSigned
		}
	});

	$ctrl.openSigningDialog = ($event, role) => {
		$ctrl.signingWizard.doSigning($event, role).then(result => {
			console.log(result);
		});
	};
	
}
