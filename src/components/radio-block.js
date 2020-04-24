import angular from "angular";
import template from "./radio-block.html";
import uuid from "uuid4";

export default {
	bindings: {
		value: "@",
	},
	require: {
		radioBlockGroup: "^"
	},
	template: template,
	controller: RadioBlockCtrl,
	transclude: {
		heading: "heading",
		description: "description"
	}
};

RadioBlockCtrl.$inject = ["$scope", "$parse", "$attrs", "$element", "$timeout"];
function RadioBlockCtrl($scope, $parse, $attrs, $element, $timeout) {
	const $ctrl = this;

	$ctrl.uuid = uuid();
	const radioBtn = $element.find("md-radio-button");

	Object.defineProperties(this, {
		isActive: {
			get: () => $ctrl.radioBlockGroup.model === $ctrl.value
		}
	});

	$ctrl.activate = $event => {
		if ($event.isTrusted && $ctrl.radioBlockGroup.model !== $ctrl.value) {
			$timeout(() => {
				angular.element(radioBtn)[0].click();
			});
		}
	};
}
