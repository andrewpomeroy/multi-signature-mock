import angular from "angular";
import template from "./component-wizard.html";

export default {
	bindings: {
		model: "<",
	},
	template: template,
	controller: ComponentWizardController,
	transclude: true,
};

ComponentWizardController.$inject = [];
function ComponentWizardController() {
	const $ctrl = this;

	$ctrl.registeredPages = new Map;

	function buildPageList () {
		// $ctrl.pages = Array.from(angular.element(contentElm).find("component-wizard-page"))
		// 	.map(function (pageElement) {
		// 		return pageElement.id;
		// 	})
		// 	.filter(function (id) {
		// 		return (Array.from($ctrl.registeredPages.keys())).find(function (registeredTabId) {
		// 			return registeredTabId === id;
		// 		});
		// 	});
		$ctrl.pages = Array.from($ctrl.registeredPages.keys()).sort((a, b) => {
			if (a.index < b.index) return -1;
			else return 1;
		});
		console.log($ctrl.pages);
	}

	function updatePages() {
		buildPageList();
	}

	$ctrl.registerPage = page => {
		$ctrl.registeredPages.set(page.uuid, page);
		updatePages();
	};
	
	$ctrl.deregisterPage = page => {
		$ctrl.registeredPages.delete(page.uuid);
		updatePages();
	};
	

	$ctrl.$onInit = () => {
	};
	
}
