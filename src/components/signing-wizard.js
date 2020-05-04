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
		requiresInvites: {
			get: () => $ctrl.wndModel.model.data.invitationsEnabled && !$ctrl.wndModel.model.data.selfSignedOnly
		},
		isReadyForInvites: {
			get: () => (!$ctrl.hasMultipleSigningMethods || $ctrl.wndModel.model.data.signingMethod) 
				&& !$ctrl.hasMultipleRoles || 
					($ctrl.hasMultipleRoles && $ctrl.wndModel.model.data.selfSignedOnly !== true)
		},
		isReadyForSummary: {
			// substitute for "is valid" on each of the invites
			get: () => {
				return (!$ctrl.requiresInvites || 
				($ctrl.wndModel.model.data.invites && $ctrl.wndModel.model.data.invites.length && $ctrl.wndModel.model.data.invites.every(x => x.email.length)) 
					|| ($ctrl.wndModel.model.data.invites && $ctrl.wndModel.model.data.invites.length === 1 && $ctrl.wndModel.model.data.isSelfSigned));
			}
		},

	});

	
	$ctrl.$onInit = function () {
		// console.log($ctrl.wndModel);
	};

	$ctrl.openSigningModal = function () {
		alert("signing modal");
	};


}
