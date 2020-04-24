import angular from "angular";
import template from "./wizard-shim.html";

export default {
	bindings: {
    
	},
	template: template,
	controller: WizardShimCtrl
};

WizardShimCtrl.$inject = [];
function WizardShimCtrl() {
	const $ctrl = this;
  
	$ctrl.model = {
		signingMethods: ["digital", "hardCopy"]
	};
}
