import angular from "angular";
import template from "./signing-wizard.html";
// import confirmationTemplate from "../signing-pages/confirmation-template.html"

export default {
	bindings: {
		options: "<"
	},
	require: {
		wndModel: "?^"
	},
	template: template,
	controller: SigningWizardController,
	transclude: true,
};

SigningWizardController.$inject = ["$timeout", "$mdDialog", "$window"];
function SigningWizardController($timeout, $mdDialog, $window) {
	const $ctrl = this;

	Object.defineProperties($ctrl, {
		isSimpleSigning: {
			get: () => !$ctrl.canInviteSigners && !$ctrl.hasMultipleSigningMethods
		},
		isSimpleDigitalSigning: {
			get: () => $ctrl.isSimpleSigning && $ctrl.options.signingMethods[0] === "digital"
		},
		isSimpleHardCopySigning: {
			get: () => $ctrl.isSimpleSigning && $ctrl.options.signingMethods[0] === "hardCopy"
		},
		hasHardCopyOption: {
			get: () => $ctrl.options.signingMethods.find((method) => method === 'hardCopy')
		},
		isHardCopySigning: {
			get: () => ($ctrl.wndModel.model.data.signingMethod === 'hardCopy') || (
				$ctrl.hasHardCopyOption && !$ctrl.hasMultipleSigningMethods
			)
		},
		// convenience abstraction to clarify business rules
		isOpenSigning: {
			get: () => $ctrl.hasMultipleRoles
		},
		isSingleSigner: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.length === 1 && !$ctrl.wndModel.model.data.signingRoles.find(x => x.isRepeatable)
		},
		canInviteSigners: {
			get: () => $ctrl.wndModel.model.data.invitationsEnabled
		},	
		// It isn't super helpful to ask if it's "just me" signing for multiple-role scenarios
		willAskWhoSigns: {
			get: () => $ctrl.canInviteSigners && $ctrl.hasRepeatableRoles
		},
		hasRepeatableRoles: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.find(x => x.isRepeatable && !x.isReadOnly)
		},
		hasMultipleRoles: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.length > 1
		},
		hasMultipleSigningMethods: {
			get: () => $ctrl.options.signingMethods.length > 1
		},
		requiresInvites: {
			get: () => $ctrl.wndModel.model.data.invitationsEnabled && !$ctrl.wndModel.model.data.selfSignedOnly
		},
		isReadyForInvites: {
			get: () => (!$ctrl.hasMultipleSigningMethods || $ctrl.wndModel.model.data.signingMethod) 
				&& !$ctrl.hasMultipleRoles || 
					($ctrl.hasMultipleRoles && $ctrl.wndModel.model.data.selfSignedOnly !== true)
		},
		isReadyForHardCopySignature: {
			get: () => $ctrl.isHardCopySigning && (
				// easy route, no options
				$ctrl.isSimpleHardCopySigning || 
				// user has chosen # of signers, or the option is never presented
				($ctrl.wndModel.model.data.selfSignedOnly != null || $ctrl.hasMultipleRoles || !$ctrl.canInviteSigners)
			)
		},
		isReadyForSummary: {
			// substitute for "is valid" on each of the invites
			get: () => {
				// return (!$ctrl.requiresInvites || 
				return (!$ctrl.isHardCopySigning && !$ctrl.requiresInvites || 
				($ctrl.wndModel.model.data.invites && $ctrl.wndModel.model.data.invites.length && $ctrl.wndModel.model.data.invites.every(x => x.email.length)) 
					|| ($ctrl.wndModel.model.data.invites && $ctrl.wndModel.model.data.invites.length === 1 && $ctrl.wndModel.model.data.isSelfSigned));
			}
		},

	});

	$ctrl.sendInvites = () => $ctrl.isSigningInProcess = true;

	$ctrl.activateHardCopySignature = () => $ctrl.isSigningInProcess = true;

	$ctrl.$onInit = function () {
		// $ctrl.doSigning().then((result) => {
		// 	console.log(result);
		// }).catch(() => {});
	};

	$ctrl.doSigning = ($event, roles) => new Promise((resolve, reject) => {
		$ctrl.openSigningModal($event, roles).then(result => {
			resolve(result);
		}).catch(error => reject(error));
	});

	$ctrl.finishLater = ($event) => alert('lol')

	$ctrl.openSigningModal = ($event, roles) => new Promise((resolve, reject) => {

		$mdDialog.show({
			parent: $window.angular.element(document.body),
			template: `
				<md-dialog class="mdDialog mdDialog--medium">
					<div class="AppForm-section-content">
						<esign-template outer-ctrl="outerCtrl"></esign-template>
					</div>
				</md-dialog>`,
			controller: function ($scope, $mdDialog, outerCtrl) {
				$scope.outerCtrl = outerCtrl;
				$scope.outerCtrl.isModal = true;
				$scope.outerCtrl.roles = roles;
				$scope.outerCtrl.cancel = $mdDialog.cancel;
				$scope.outerCtrl.submit = $mdDialog.hide;
			},
			targetEvent: $event,
			focusOnOpen: true,
			fullscreen: true,
			multiple: true,
			locals: {
				outerCtrl: $ctrl
			}
		})
			.then(result => {
				resolve(result);
				console.log(result);
				$ctrl.openSigningConfirmationModal($event, result.roles)
			})
			.catch(error => reject(error));
	});

	$ctrl.openSigningConfirmationModal = function ($event, roles) {
		$ctrl.signingConfirmationOpenEvent = $event;
		$ctrl.signingConfirmationRoles = roles;
		console.log($event, roles);
	}

	$ctrl.onSigningConfirmationModalClose = function ($event) {
		$ctrl.signingConfirmationRoles = [];
		$ctrl.signingConfirmationOpenEvent = null;
	}
	$ctrl.onSigningConfirmationModalCancel = function ($event) {
		$ctrl.signingConfirmationRoles = [];
		$ctrl.signingConfirmationOpenEvent = null;
	}


}
