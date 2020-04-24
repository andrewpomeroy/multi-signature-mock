import angular from "angular";

import testComponent from "./components/test-component";
import certificationWizard from "./components/certification-wizard";
import componentWizard from "./components/component-wizard";
import componentWizardPage from "./components/component-wizard-page";
import componentWizardNav from "./components/component-wizard-nav";

angular.module("app").component("testComponent", testComponent);
angular.module("app").component("certificationWizard", certificationWizard);
angular.module("app").component("componentWizard", componentWizard);
angular.module("app").component("componentWizardPage", componentWizardPage);
angular.module("app").component("componentWizardNav", componentWizardNav);
