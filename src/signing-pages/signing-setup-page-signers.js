import angular from "angular";
import template from "./signing-setup-page-signers.html";

export default {
	bindings: {
		model: "<",
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
		$ctrl.roles = $ctrl.wndModel.model.data.signingRoles;
		// console.log("wndModel", $ctrl.wndModel);
		// $ctrl._model = $ctrl.wndModel || $ctrl.model;
	};
	
}
