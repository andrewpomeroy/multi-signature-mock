import angular from "angular";
import { ValidateModel, ValidateService } from "@windsor/validate-model-js";
import template from "./wizard-shim.html";

export default {
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
		},
	});
	Object.defineProperties($ctrl, {
		roleSet: {
			get: () => $ctrl._roleSet,
			set: value => {
				$ctrl._roleSet = value;
				$ctrl.model.data.signingRoles = angular.copy(value.roles);
				$ctrl.model.data.signingRolesOriginal = angular.copy(value.roles);
			}
		}
	});
			
	const constraints = {

	};

	$ctrl.roleSets = [
		{
			name: "single",
			roles: [
				{
					name: "Signer",
					isRepeatable: false,
				}
			],
		},
		{
			name: "singleRepeating",
			roles: [
				{
					name: "Signer",
					isRepeatable: true,
				}
			],
		},
		{
			name: "multiNonRepeatable",
			roles: [
				{
					name: "Owner",
					isRepeatable: false,
					isReadOnly: true
				},
				{
					name: "Operator",
					isRepeatable: false,
					isReadOnly: false
				},
				{
					name: "Engineer",
					description: "Id veniam tempor fugiat ipsum est dolore anim dolor nulla irure officia excepteur.",
					isRepeatable: false,
					isReadOnly: false
				},
			],
		},
		{
			name: "multiRepeatable",
			roles: [
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
					description: "Id veniam tempor fugiat ipsum est dolore anim dolor nulla irure officia excepteur.",
					isRepeatable: true,
					isReadOnly: false
				},
			]
		}
	];

	const data = {
		// signingMethod: undefined,
		signingMethod: "digital",
		selfSignedOnly: undefined,
		signingRoles: "",
		signingRolesOriginal: "",
	};
	
	$ctrl.model = new (ValidateModel())()
		.configureValidation(constraints)
		.initialize(data);
	
	$ctrl.model.validate();

	$ctrl.roleSet = $ctrl.roleSets.find(x => x.name === "single");

}

