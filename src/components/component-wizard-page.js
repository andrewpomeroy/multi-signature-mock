import angular from "angular";
import template from "./component-wizard-page.html";
import uuid from "uuid4";

export default {
	bindings: {
		index: "<"
	},
	require: {
		componentWizard: "^"
	},
	template: template,
	controller: ComponentWizardPageController,
	transclude: true,
};

ComponentWizardPageController.$inject = [];
function ComponentWizardPageController () {
	const $ctrl = this;
	$ctrl.uuid = `page-${uuid()}`;
	
	$ctrl.$onInit = () => {
		$ctrl.componentWizard.registerPage(this);
	};
	$ctrl.$onDestroy = function () {
		// If this page disappears (ng-if or whatever), let the parent controller remove it from tracking
		$ctrl.componentWizard.deregisterPage(this);
	};
}
