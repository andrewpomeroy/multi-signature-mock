import angular from "angular";
import template from "./component-wizard-page.html";
import uuid from "uuid4";

export default {
	bindings: {
		index: "<"
	},
	require: {
		componentWizard: "^",
	},
	template: template,
	controller: ComponentWizardPageController,
	transclude: true,
};

ComponentWizardPageController.$inject = ["$element", "$attrs"];
function ComponentWizardPageController ($element, $attrs) {
	const $ctrl = this;

	$ctrl.uuid = `page-${uuid()}`;
	$element[0].setAttribute("id", $ctrl.uuid);

	Object.defineProperties(this, {
		isActive: {
			get: () => $ctrl.componentWizard.activePage === this.uuid
		}
	});

	$ctrl.$onInit = () => {
		$ctrl.componentWizard.registerPage(this);
		if ($ctrl.isNavigable === undefined) {
			$ctrl.isNavigable = true;
		}
	};
	$ctrl.$onDestroy = function () {
		// If this page disappears (ng-if or whatever), let the parent controller remove it from tracking
		$ctrl.componentWizard.deregisterPage(this);
	};
}
