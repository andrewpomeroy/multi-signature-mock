import angular from "angular";
import template from "./signing-setup-summary.html";

export default {
	bindings: {
	},
	require: {
		wndModel: "?^",
		signingWizard: "^"
	},
	template: template,
	controller: SigningSetupSummaryCtrl,
	transclude: true,
};

SigningSetupSummaryCtrl.$inject = ["$window", "$mdDialog"];
function SigningSetupSummaryCtrl($window, $mdDialog) {
	const $ctrl = this;

	$ctrl.$onInit = function () {
		$ctrl.roles = angular.copy($ctrl.wndModel.model.data.signingRoles);

		// just for mockup purposes!
		$ctrl.roles[$ctrl.roles.length - 1].isSigned = true;
		$ctrl.invites[$ctrl.invites.length - 1].isMissingEsigRole = true;
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

	$ctrl.openAddSignersModal = ($event) => {
		const existingInvites = angular.copy($ctrl.invites);
		$mdDialog.show({
			parent: $window.angular.element(document.body),
			template: `
				<md-dialog class="mdDialog mdDialog--small">
					<div class="AppForm-section-content">
						<signing-invitation-form
							outer-ctrl="outerCtrl"
							existing-invites="existingInvites"
							is-single="outerCtrl.signingWizard.isSingleSigner"></signing-invitation-form>
						<div class="ComponentWizard-buttonGroup">
							<button class="ComponentWizard-button ComponentWizard-button--primary" ng-click="outerCtrl.submit()">Send Invites</button>
							<button class="ComponentWizard-button ComponentWizard-button" ng-click="outerCtrl.cancel()">Cancel</button>
						</div>
					</div>
				</md-dialog>`,
			controller: function ($scope, $mdDialog, outerCtrl) {
				$scope.outerCtrl = outerCtrl;
				$scope.outerCtrl.cancel = $mdDialog.cancel;
				$scope.outerCtrl.submit = $mdDialog.hide;
			},
			targetEvent: $event,
			focusOnOpen: true,
			fullscreen: true,
			closeOnOutsideClick: true,
			multiple: true,
			locals: {
				outerCtrl: $ctrl,
				existingInvites: existingInvites
			}
		});
	};
}
