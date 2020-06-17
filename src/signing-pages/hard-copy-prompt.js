import angular from "angular";
import template from "./hard-copy-prompt.html";

export default {
	bindings: {
	},
	require: {
		wndModel: "?^",
		signingWizard: "^"
	},
	template: template,
	controller: HardCopyPromptCtrl,
	transclude: true,
};

HardCopyPromptCtrl.$inject = [];
function HardCopyPromptCtrl() {
	const $ctrl = this;

	$ctrl.download = function ($event) {
		$ctrl.userHasDownloaded = true;
	}
	$ctrl.handleAlreadyDownloadedClick = function ($event) {
		$ctrl.userHasDownloaded = true;
	}

	Object.defineProperties($ctrl, {
		isSelfSigned: {
			get: () => $ctrl.wndModel.model.data.isSelfSigned || $ctrl.isSelfSignedOnly
		},
		isSelfSignedOnly: {
			get: () => $ctrl.invites && $ctrl.invites.length === 1 && $ctrl.invites[0].email === "andrewmichaelpomeroy@gmail.com"
		},
		invites: {
			// Mock -- replace as needed
			get: () => $ctrl.wndModel && $ctrl.wndModel.model.data.invites && $ctrl.wndModel.model.data.invites.map((invite) => {
				if (!invite.email.length) invite.email = "andrewmichaelpomeroy@gmail.com"
				return invite;
			})
		},
		// isSelfSignedOnly: {
		// 	// Mock -- replace as needed
		// 	get: () => $ctrl.invites && $ctrl.invites.length === 1 && $ctrl.invites[0].email === "andrewmichaelpomeroy@gmail.com"
		// },
		// invites: {
		// 	// Mock -- replace as needed
		// 	get: () => {
		// 		var invites = $ctrl.wndModel ? $ctrl.wndModel.model.data.invites : [];
		// 		if ($ctrl.wndModel && $ctrl.wndModel.model.data.isSelfSigned) {
		// 			invites.push({
		// 				email: "andrewmichaelpomeroy@gmail.com"
		// 			})
		// 		}
		// 		return invites;
		// 	}

		// },
		signatureLines: {
			get: () => ($ctrl.wndModel.model.data.signingRoles.length > 1 ?
				$ctrl.wndModel.model.data.signingRoles : $ctrl.invites)
		},
	});

	
}
