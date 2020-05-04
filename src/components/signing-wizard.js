import angular from "angular";
import template from "./signing-wizard.html";

export default {
	bindings: {
		options: "<"
	},
	require: {
		wndModel: "?^"
	},
	template: template,
	controller: SigningWizardController,
	transclude: true,
};

SigningWizardController.$inject = ["$timeout"];
function SigningWizardController($timeout) {
	const $ctrl = this;

	Object.defineProperties($ctrl, {
		isSingleSigner: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.length === 1 && !$ctrl.wndModel.model.data.signingRoles.find(x => x.isRepeatable)
		},
		canInviteSigners: {
			get: () => $ctrl.wndModel.model.data.invitationsEnabled
		},	
		// It isn't helpful to ask 
		willAskWhoSigns: {
			get: () => $ctrl.canInviteSigners && $ctrl.hasRepeatableRoles
		},
		hasRepeatableRoles: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.find(x => x.isRepeatable && !x.isReadOnly)
		},
		hasMultipleRoles: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.length > 1
		},
		hasMultipleSigningMethods: {
			get: () => $ctrl.options.signingMethods.length > 1
		},
		readyForInvites: {
			get: () => $ctrl.wndModel.model.data.invitationsEnabled && 
				(!$ctrl.hasMultipleRoles || 
					($ctrl.hasMultipleRoles && $ctrl.wndModel.model.data.selfSignedOnly !== true))
		},
	});

	
	$ctrl.$onInit = function () {
		// console.log($ctrl.wndModel);
	};

}
