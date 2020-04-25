import { ValidateModel, ValidateService } from "@windsor/validate-model-js";
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
  
	$ctrl.useDigital = true;
	$ctrl.useHardCopy = true;

	$ctrl.certificationOptions = {
		enableMultipleSignatures: true,
		signingMethods: ["digital", "hardCopy"],
	};
	Object.defineProperties($ctrl.certificationOptions, {
		signingMethods: {
			get: () => {
				const arr = [];
				if ($ctrl.useDigital) arr.push("digital");
				if ($ctrl.useHardCopy) arr.push("hardCopy");
				return arr;
			}
		}
	});
  
	const constraints = {

	};
	const data = {
		signingMethod: undefined,
		// signingMethod: "hardCopy",
		signatureRoles: [
			{
				name: "Owner",
				isRepeatable: false,
				isReadOnly: true
			},
			{
				name: "Operator",
				isRepeatable: true,
				isReadOnly: false
			},
			{
				name: "Engineer",
				isRepeatable: true,
				isReadOnly: false
			},
		],

	};
  
	$ctrl.model = new (ValidateModel())()
		.configureValidation(constraints)
		.initialize(data);
    
	$ctrl.model.validate();

}
