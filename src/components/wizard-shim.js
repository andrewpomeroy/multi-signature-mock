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
		// invitationsEnabled: {
		// 	get: () => $ctrl._invitationsEnabled === undefined ? true : $ctrl._invitationsEnabled,
		// 	set: value => {
		// 		$ctrl._invitationsEnabled = value;
		// 		if (value) {
		// 			initOptions();
		// 		}
		// 		else {
		// 			$ctrl.roleSet = {};
		// 		}
		// 	}
		// },
		invitationsEnabled: {
			get: () => $ctrl.model.data.invitationsEnabled === undefined ? true : $ctrl.model.data.invitationsEnabled,
			set: value => {
				$ctrl.model.data.invitationsEnabled = value;
				if (value) {
					initOptions();
				}
				else {
					$ctrl.roleSet = {};
				}
			}
		},
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
			name: "singleRepeatable",
			roles: [
				{
					name: "Signer",
					isRepeatable: true,
					isReadOnly: false
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
		},
		{
			name: "multiReadOnly",
			roles: [
				{
					name: "Owner",
					isRepeatable: false,
					isReadOnly: true
				},
				{
					name: "Operator",
					isRepeatable: true,
					isReadOnly: true
				},
				{
					name: "Engineer",
					description: "Id veniam tempor fugiat ipsum est dolore anim dolor nulla irure officia excepteur.",
					isRepeatable: true,
					isReadOnly: true
				},
			]
		}
	];

	function Invite () {
		return {
			email: "",
			notes: "",
		};
	}

	const data = {
		invitationsEnabled: true,
		// signingMethod: undefined,
		signingMethod: "digital",
		selfSignedOnly: undefined,
		signingRoles: "",
		signingRolesOriginal: "",
		isSelfSigned: undefined,
		invites: [
			new Invite()
		]
	};
	
	$ctrl.model = new (ValidateModel())()
		.configureValidation(constraints)
		.initialize(data);
	
	$ctrl.model.validate();

	function initOptions () {
		// $ctrl.roleSet = $ctrl.roleSets.find(x => x.name === "singleRepeatable");
		$ctrl.roleSet = $ctrl.roleSets.find(x => x.name === "multiRepeatable");
	}
	initOptions();


}

