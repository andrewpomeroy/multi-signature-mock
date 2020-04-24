import angular from "angular";
import template from "./radio-block-group.html";

export default {
	bindings: {
		model: "<"
	},
	template: template,
	controller: RadioBlockGroupCtrl,
	transclude: true
};

RadioBlockGroupCtrl.$inject = ["$scope", "$parse", "$attrs"];
function RadioBlockGroupCtrl($scope, $parse, $attrs) {
	const $ctrl = this;

}
