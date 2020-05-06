import angular from "angular";
import template from "./signing-setup-page-invites.html";

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
	
	$ctrl.$onInit = function () {
	};

	Object.defineProperties($ctrl, {
		invites: {
			get: () => $ctrl.wndModel.model.data.invites
		},
		completeButtonText: {
			get: () => (
				$ctrl.wndModel.model.data.selfSignedOnly
					? "Sign"
					: ($ctrl.invites && $ctrl.invites.length > 1)
						? "Send Invites"
						// This is just a way to make it so it doesn't say "send invite" if you're the only one signing
						// the logic will of course have to change here, cause checking email length is just a dumb hack
						: $ctrl.invites.length === 1 && $ctrl.invites[0].email.length
							? "Send Invite"
							: "Next"
			)
		}
	});

	$ctrl.onComplete = ($event) => {
		return $ctrl.wndModel.model.data.selfSignedOnly 
			? $ctrl.signingWizard.doSigning($event)
			: $ctrl.signingWizard.sendInvites();
	};

	$ctrl.removeRole = function (index) {
		$ctrl.roles.splice(index, 1);
	};

	$ctrl.cloneRole = function () {
		$ctrl.roles.push(angular.copy($ctrl.roles[$ctrl.roles.length - 1]));
	};
	
}
