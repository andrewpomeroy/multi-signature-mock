import angular from "angular";
import _ from "lodash";
import template from "./radio-block-group.html";

export default {
	bindings: {
		model: "<"
	},
	require: {
		wndModel: "?^",
		wndProperty: "?^"
	},
	template: template,
	controller: RadioBlockGroupCtrl,
	transclude: true
};

RadioBlockGroupCtrl.$inject = [];
function RadioBlockGroupCtrl() {
	const $ctrl = this;

	$ctrl.$onInit = function () {
		$ctrl._model = $ctrl.wndModel || $ctrl.model;
	};

	Object.defineProperties(this, {
		model: {
			get: () =>
				$ctrl.wndModel 
					? $ctrl.wndProperty
						? $ctrl.wndProperty.value
						: $ctrl.wndModel.model.data.value
					: $ctrl._model,
			set: value => {
				$ctrl.wndModel
					? ($ctrl.wndProperty 
						? ($ctrl.wndProperty.value = value)
						: ($ctrl.wndModel.model.data.value = value))
					: $ctrl._model = value;
			}
		}
	});

}
