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

	Object.defineProperties($ctrl, {
		signingRoles: {
			get: () => $ctrl.wndModel.model.data.signingRoles
		},
		invites: {
			get: () => $ctrl.wndModel.model.data.invites
		},
		isSelfSigned: {
			get: () => $ctrl.wndModel.model.data.isSelfSigned
		}
	});
	
}
