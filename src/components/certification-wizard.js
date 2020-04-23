import angular from "angular";
import template from "./certification-wizard.html";

export default {
	bindings: {
		model: "<",
	},
	template: template,
	controller: CertificationWizardController,
	transclude: true,
};

CertificationWizardController.$inject = [];
function CertificationWizardController() {
	const $ctrl = this;

	
}
