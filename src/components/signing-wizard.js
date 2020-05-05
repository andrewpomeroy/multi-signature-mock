import angular from "angular";
import template from "./signing-wizard.html";
import esignTemplate from "../signing-pages/esign-template.html";
import { EsignCtrl } from "../signing-pages/esign-template";

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
		isSingleSigner: {
			get: () => $ctrl.wndModel.model.data.signingRoles && $ctrl.wndModel.model.data.signingRoles.length === 1 && !$ctrl.wndModel.model.data.signingRoles.find(x => x.isRepeatable)
		},
		canInviteSigners: {
			get: () => $ctrl.wndModel.model.data.invitationsEnabled
		},	
		// It isn't helpful to ask 
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
		isReadyForSummary: {
			// substitute for "is valid" on each of the invites
			get: () => {
				return (!$ctrl.requiresInvites || 
				($ctrl.wndModel.model.data.invites && $ctrl.wndModel.model.data.invites.length && $ctrl.wndModel.model.data.invites.every(x => x.email.length)) 
					|| ($ctrl.wndModel.model.data.invites && $ctrl.wndModel.model.data.invites.length === 1 && $ctrl.wndModel.model.data.isSelfSigned));
			}
		},

	});

	
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

	$ctrl.openSigningModal = ($event, roles) => new Promise((resolve, reject) => {

		$mdDialog.show({
			parent: $window.angular.element(document.body),
			template: "<div class=\"AppForm-section-content\"><esign-template outer-ctrl=\"outerCtrl\"></esign-template></div>",
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
			})
			.catch(error => reject(error));
	});

}
