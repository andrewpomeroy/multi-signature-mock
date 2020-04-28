import angular from "angular";
import template from "./certification-wizard.html";

export default {
	bindings: {
		options: "<"
	},
	require: {
		wndModel: "?^"
	},
	template: template,
	controller: CertificationWizardController,
	transclude: true,
};

CertificationWizardController.$inject = ["$timeout"];
function CertificationWizardController($timeout) {
	const $ctrl = this;

	Object.defineProperties($ctrl, {
		isSingleSigner: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.length === 1 && !$ctrl.wndModel.model.data.signingRoles.find(x => x.isRepeatable)
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
	});

	
	$ctrl.$onInit = function () {
		// console.log($ctrl.wndModel);
	};

}
