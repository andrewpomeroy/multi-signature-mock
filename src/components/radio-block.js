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
		description: "?description"
	}
};

RadioBlockCtrl.$inject = ["$scope", "$parse", "$attrs", "$element", "$timeout"];
function RadioBlockCtrl($scope, $parse, $attrs, $element, $timeout) {
	const $ctrl = this;

	$ctrl.id = uuid();
	const radioBtn = $element.find("md-radio-button");

	Object.defineProperties($ctrl, {
		isActive: {
			get: () => $ctrl.radioBlockGroup.model === $ctrl._value
		},
		_value: {
			get: () => 	
				$ctrl.value === "true"
					? true
					: $ctrl.value === "false"
						? false
						: $ctrl.value
		}
	});

	$ctrl.onRadioFocus = $event => {
		console.log($event);
	};

	$ctrl.activate = $event => {
		const isTrusted = $event.isTrusted != null ? $event.isTrusted : $event.originalEvent.isTrusted;
		if (isTrusted && $ctrl.radioBlockGroup.modelValue !== $ctrl._value) {
			$timeout(() => {
				angular.element(radioBtn)[0].click();
			});
		}
	};
} 
