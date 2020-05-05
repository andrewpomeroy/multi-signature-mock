import angular from "angular";
import template from "./signing-setup-page-summary.html";

export default {
	bindings: {
	},
	require: {
		wndModel: "?^",
		signingWizard: "^"
	},
	template: template,
	controller: SigningSetupPageRolesCtrl,
	transclude: true,
};

SigningSetupPageRolesCtrl.$inject = [];
function SigningSetupPageRolesCtrl() {
	const $ctrl = this;

	$ctrl.$onInit = function () {
		$ctrl.roles = angular.copy($ctrl.wndModel.model.data.signingRoles);
		// just for mockup purposes!
		if ($ctrl.roles.length > 2) {
			$ctrl.roles[$ctrl.roles.length - 1].isSigned = true;
		}
	};

	$ctrl.selectedRoles = [];

	Object.defineProperties($ctrl, {
		invites: {
			get: () => $ctrl.wndModel.model.data.invites
		},
		isSelfSigned: {
			get: () => $ctrl.wndModel.model.data.isSelfSigned
		}
	});

	$ctrl.selectRole = role => {
		$ctrl.selectedRoles.push(role);
	};

	$ctrl.deselectRole = role => {
		$ctrl.selectedRoles = $ctrl.selectedRoles.filter(x => x.name !== role.name);
	};

	$ctrl.isRoleSelected = role => $ctrl.selectedRoles.find(x => x.name === role.name);

	$ctrl.openSigningDialog = ($event, role) => {
		$ctrl.signingWizard.doSigning($event, role).then(result => {
			console.log(result);
		});
	};

	$ctrl.rescindInvite = (role) => {
		alert("rescind invite placeholder", role);
	};
	
}
