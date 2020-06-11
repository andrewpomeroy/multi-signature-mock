import angular from "angular";
import template from "./signing-invitation-form.html";

export default {
	bindings: {
		isSingle: "<",
		existingInvites: "<",
		outerCtrl: "<",
	},
	require: {
		wndModel: "?^",
		signingWizard: "?^"
	},
	template: template,
	controller: SigningInvitationFormCtrl,
	transclude: true,
};

SigningInvitationFormCtrl.$inject = ["$scope"];
function SigningInvitationFormCtrl($scope) {
	const $ctrl = this;
	
	this.$onInit = function () {
		$scope.wndModel = $ctrl.wndModel || $ctrl.outerCtrl.wndModel;
		$scope.outerCtrl = this.outerCtrl || $ctrl;
		$ctrl.invites = angular.copy($ctrl.existingInvites || [{}]);
		
		Object.defineProperties($ctrl, {
			oneInviteLeft: {
				get: () => $ctrl.invites.length === 1
			},
			emailInvitesEnabled: {
				get: () => !$ctrl.signingWizard.isHardCopySigning
			}
		});

		$ctrl.removeInvite = function (index) {
			$ctrl.invites.splice(index, 1);
		};
	
		$ctrl.addNew = function () {
			$ctrl.invites.push({
				email: "",
				notes: ""
			});
		};
	};

	
}
