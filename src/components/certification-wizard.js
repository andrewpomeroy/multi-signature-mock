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

CertificationWizardController.$inject = ["$timeout"];
function CertificationWizardController($timeout) {
	const $ctrl = this;
	
	$ctrl.letItHappen = true;

	$timeout(() => {
		$ctrl.letItHappen = false;
	}, 500);

}
