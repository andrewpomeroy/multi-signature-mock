import angular from "angular";
import template from "./component-wizard-nav.html";

export default {
	bindings: {
	},
	require: {
		componentWizard: "^"
	},
	template: template,
	controller: ComponentWizardNavController
};

ComponentWizardNavController.$inject = [];
function ComponentWizardNavController () {
	const $ctrl = this;

	$ctrl.$onInit = () => {
	};
	
}
