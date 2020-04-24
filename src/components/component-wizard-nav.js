import angular from "angular";
import template from "./component-wizard-nav.html";

export default {
	bindings: {
	},
	require: {
		componentWizard: "^",
		page: "^componentWizardPage",
	},
	template: template,
	controller: ComponentWizardNavController
};

ComponentWizardNavController.$inject = [];
function ComponentWizardNavController () {
	const $ctrl = this;

	Object.defineProperties(this, {
		isNextAvailable: {
			get: () => getNeighbor(1)
		},
		isPreviousAvailable: {
			get: () => getNeighbor(-1)
		},
		isNextNavigable: {
			get: () => isNeighborNavigable(1)
		},
		isPreviousNavigable: {
			get: () => isNeighborNavigable(-1)
		},
	});

	function getNeighbor(int) {
		// console.log("id", $ctrl.page.uuid, "index", $ctrl.componentWizard.getIndex($ctrl.page.uuid), "int", int, "w pages", $ctrl.componentWizard.pages);
		return $ctrl.componentWizard.pages[$ctrl.componentWizard.getIndex($ctrl.page.uuid) + int];
	}
	function isNeighborNavigable(int) {
		const neighbor = getNeighbor(int);
		return neighbor && $ctrl.componentWizard.navigablePages.find(page => page === neighbor);
	}

	$ctrl.$onInit = () => {
		$ctrl.next = $ctrl.componentWizard.next;
		$ctrl.previous = $ctrl.componentWizard.previous;
	};

}
