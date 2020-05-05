import angular from "angular";
import template from "./component-wizard.html";

export default {
	bindings: {
	},
	template: template,
	controller: ComponentWizardController,
	transclude: true,
};

ComponentWizardController.$inject = ["$element", "$timeout"];
function ComponentWizardController($element, $timeout) {
	const $ctrl = this;

	$ctrl.registeredPages = new Map;

	function buildPageList () {
		$ctrl.pages = Array.from(angular.element($element[0]).find("component-wizard-page"))
			.map(function (pageElement) {
				return pageElement.id;
			})
			.filter(function (id) {
				return (Array.from($ctrl.registeredPages.keys())).find(function (registeredPageId) {
					return registeredPageId === id;
				});
			});
		$ctrl.navigablePages = $ctrl.pages.filter(pageId => {
			const page = $ctrl.registeredPages.get(pageId);
			return page && page.isNavigable;
		});
		// console.log("navigable pages", $ctrl.navigablePages);
	}

	$ctrl.getIndex = page => $ctrl.pages.findIndex(x => x === page); 

	function updatePages() {
		buildPageList();
		// In an initalization scenario, or if our current page becomes inaccessible due to model changes, fallback to last viewable page
		if (!$ctrl.activePage || $ctrl.pages.indexOf($ctrl.activePage) === -1) initializeActivePage();
	}

	$ctrl.registerPage = page => {
		$ctrl.registeredPages.set(page.id, page);
		updatePages();
	};
	
	$ctrl.onPageUpdate = page => {
		updatePages();
	};

	$ctrl.deregisterPage = page => {
		$ctrl.registeredPages.delete(page.id);
		updatePages();
	};

	$ctrl.increment = int => {
		$ctrl.activePage = $ctrl.navigablePages[$ctrl.getIndex($ctrl.activePage) + int];
	};
	$ctrl.next = () => $ctrl.increment(1);
	$ctrl.previous = () => $ctrl.increment(-1);

	function initializeActivePage() {
		// $ctrl.activePage = $ctrl.navigablePages && $ctrl.navigablePages[$ctrl.navigablePages.length - 1];
		$ctrl.activePage = $ctrl.navigablePages[0];
	}

	$ctrl.$onInit = () => {
	};

	$ctrl.$postLink = () => {
		$timeout(() => {
			// console.log("postlink", $ctrl.pages, $ctrl.navigablePages);
			initializeActivePage();
		});
		
	};

}
