import angular from "angular";
import template from "./component-wizard-page.html";
import uuid from "uuid4";

export default {
	bindings: {
		index: "<",
		_isNavigable: "<isNavigable"
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

	$ctrl.id = `page-${uuid()}`;
	$element[0].setAttribute("id", $ctrl.id);

	Object.defineProperties($ctrl, {
		isActive: {
			get: () => $ctrl.componentWizard.activePage === $ctrl.id
		},
		// proxying isNavigable so it defaults to true
		isNavigable: {
			get: () => {
				// console.log($attrs.isNavigable, $ctrl._isNavigable);
				return $attrs.isNavigable === undefined ? true : $ctrl._isNavigable;
			}
		}
	});

	$ctrl.$onInit = () => {
		$ctrl.componentWizard.registerPage(this);
	};

	$ctrl.$onChanges = (changes) => {
		if (changes._isNavigable) {
			$ctrl.componentWizard.onPageUpdate(this);
		}
	};

	$ctrl.$postLink = function () {
	};

	$ctrl.$onDestroy = function () {
		// If this page disappears (ng-if or whatever), let the parent controller remove it from tracking
		$ctrl.componentWizard.deregisterPage(this);
	};
}
