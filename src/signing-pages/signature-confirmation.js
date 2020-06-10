import angular from "angular";
import template from "./signature-confirmation.html";

export default {
	bindings: {
		openEvent: "<",
		roles: "<",
		onClose: "<",
		onCancel: "<"
	},
	require: {
		wndModel: "?^",
		signingWizard: "?^"
	},
	controller: signatureConfirmationCtrl,
};

signatureConfirmationCtrl.$inject = ["$scope", "$mdDialog", "$window"];
function signatureConfirmationCtrl($scope, $mdDialog, $window) {
	const $ctrl = this;
	$ctrl.$onInit = function () {
		$scope.sigConfCtrl = $ctrl.outerCtrl || $ctrl;
	};

	$ctrl.$onChanges = function (changes) {
		console.log(changes);
		if (changes.openEvent && changes.openEvent.currentValue) {
			$mdDialog.show({
				parent: $window.angular.element(document.body),
				template: template,
				controller: ["$scope", "$mdDialog", "outerCtrl", "roles", function ($scope, $mdDialog, outerCtrl, roles) {
					const $ctrl = this;

					$scope.outerCtrl = outerCtrl;
					$scope.outerCtrl.isModal = true;
					
					$ctrl.signedRoles = roles;
					$ctrl.allRoles = outerCtrl.wndModel.model.data.signingRoles;
					$ctrl.invites = outerCtrl.wndModel.model.data.invites;
					$ctrl.signatureLines = (outerCtrl.wndModel.model.data.signingRoles.length > 1 ?
						outerCtrl.wndModel.model.data.signingRoles : $ctrl.invites)

					$ctrl.signatureLines = $ctrl.signatureLines.map((line, index) => {
							if (!line.email) {
								line.email = "andrew_pomeroy@windsorsolutions.com";
							}
							return {
								description: line.name || line.email,
								isSigned: false, // -- MOCK - please replace as needed
								isSignedByCurrentUser: false, // -- MOCK - please replace as needed
								signedBy: null, // -- MOCK - please replace as needed
								signedOnString: "39 minutes ago" // -- MOCK - please replace as needed
							}
						});

					$ctrl.signatureLines[0].isSignedByCurrentUser = true;
					$ctrl.signatureLines[0].signedOnString = "1 minute ago";

					if ($ctrl.signatureLines.length > 1) {
						$ctrl.signatureLines[1].isSigned = true;
						$ctrl.signatureLines[1].signedBy = "Brett Peake";
					}

					Object.defineProperties($ctrl, {
						signatureCount: {
							get: () => $ctrl.signatureLines.filter(line => line.signedBy || line.isSignedByCurrentUser).length
						}
					})

					$ctrl.cancel = $mdDialog.cancel;
					$ctrl.close = $mdDialog.hide;

				}],
				bindToController: true,
				controllerAs: "$ctrl",
				// targetEvent: $event,
				clickOutsideToClose: true,
				focusOnOpen: true,
				fullscreen: true,
				multiple: true,
				locals: {
					outerCtrl: $ctrl,
					roles: $ctrl.roles,
				}
			}).then(result => {
				$ctrl.onClose(result)
			})
				.catch(error => {
					$ctrl.onCancel();
				});

		}
	}
}

