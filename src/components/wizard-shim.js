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

	const data = {
		invitationsEnabled: true,
		signingMethod: undefined,
		selfSignedOnly: undefined,
		signingRoles: "",
		signingRolesOriginal: "",
		isSelfSigned: undefined,
		signingPassword: "",
		signingChallengeQuestionAnswer: "",
		invites: [
			{
				email: "",
				notes: "",
			}
		],
		electronicSignatureAgreements: [
			{
				checked: undefined,
				text: "I am the owner of the account used to perform the electronic submission and signature."
			},
			{
				checked: undefined,
				text: "I have the authority to submit the data on behalf of the facility I am representing."
			},
			{
				checked: undefined,
				text: "I agree that providing the account credentials to sign the submission document constitutes an electronic signature equivalent to my written signature."
			},
			{
				checked: undefined,
				text: "I have reviewed the electronic form being submitted in its entirety, and agree to the validity and accuracy of the information contained within it to the best of my knowledge."
			},
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

