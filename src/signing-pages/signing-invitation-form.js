import angular from "angular";
import template from "./signing-invitation-form.html";

export default {
	bindings: {
		// roles: "<",
		// originalRoles: "<",
		isSingle: "<",
		invites: "<"
	},
	require: {
		wndModel: "?^",
		signingWizard: "^"
	},
	template: template,
	controller: SigningInvitationFormCtrl,
	transclude: true,
};

SigningInvitationFormCtrl.$inject = [];
function SigningInvitationFormCtrl() {
	const $ctrl = this;

	Object.defineProperties($ctrl, {
		oneInviteLeft: {
			get: () => $ctrl.invites.length === 1
		}
	});

	
	$ctrl.$onInit = function () {
		$ctrl.invites = [{}];
	};

	$ctrl.removeInvite = function (index) {
		$ctrl.invites.splice(index, 1);
	};

	$ctrl.addNew = function () {
		$ctrl.invites.push({
			email: "",
			notes: ""
		});
	};
	
}
