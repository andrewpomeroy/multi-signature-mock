import angular from "angular";

import testComponent from "./components/test-component";
import wizardShim from "./components/wizard-shim";
import certificationWizard from "./components/certification-wizard";
import componentWizard from "./components/component-wizard";
import componentWizardPage from "./components/component-wizard-page";
import componentWizardNav from "./components/component-wizard-nav";

import signingSetupPageMethods from "./signing-pages/signing-setup-page-methods";
import signingSetupPageRoles from "./signing-pages/signing-setup-page-roles";
import signingSetupPageInvites from "./signing-pages/signing-setup-page-invites";
import signingInvitationForm from "./signing-pages/signing-invitation-form";

import radioBlockGroup from "./components/radio-block-group";
import radioBlock from "./components/radio-block";

angular.module("app").component("testComponent", testComponent);
angular.module("app").component("wizardShim", wizardShim);
angular.module("app").component("certificationWizard", certificationWizard);
angular.module("app").component("componentWizard", componentWizard);
angular.module("app").component("componentWizardPage", componentWizardPage);
angular.module("app").component("componentWizardNav", componentWizardNav);
angular.module("app").component("signingSetupPageMethods", signingSetupPageMethods);
angular.module("app").component("signingSetupPageRoles", signingSetupPageRoles);
angular.module("app").component("signingSetupPageInvites", signingSetupPageInvites);
angular.module("app").component("signingInvitationForm", signingInvitationForm);

angular.module("app").component("radioBlockGroup", radioBlockGroup);
angular.module("app").component("radioBlock", radioBlock);
