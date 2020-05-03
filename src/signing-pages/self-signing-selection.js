import angular from "angular";
import template from "./self-signing-selection.html";

export default {
	bindings: {
	},
	require: {
		// wndModel: "?^",
		signingWizard: "^"
	},
	template: template,
	controller: SigningInvitationFormCtrl,
};

SigningInvitationFormCtrl.$inject = [];
function SigningInvitationFormCtrl() {
	const $ctrl = this;	
}
