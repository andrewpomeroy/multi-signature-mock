import angular from "angular";

import wizardShim from "./components/wizard-shim";
import signingWizard from "./components/signing-wizard";
import signingSetupPageMethods from "./signing-pages/signing-setup-page-methods";
import signingSetupPageRoles from "./signing-pages/signing-setup-page-roles";
import signingSetupPageInvites from "./signing-pages/signing-setup-page-invites";
import hardCopyPrompt from "./signing-pages/hard-copy-prompt";

import signingSetupSummary from "./signing-pages/signing-setup-summary";
import signingInvitationForm from "./signing-pages/signing-invitation-form";
import selfSigningSelection from "./signing-pages/self-signing-selection";
import esignTemplate from "./signing-pages/esign-template";
import signatureConfirmation from "./signing-pages/signature-confirmation";

angular.module("app").component("wizardShim", wizardShim);
angular.module("app").component("signingWizard", signingWizard);
angular.module("app").component("signingSetupPageMethods", signingSetupPageMethods);
angular.module("app").component("signingSetupPageRoles", signingSetupPageRoles);
angular.module("app").component("signingSetupPageInvites", signingSetupPageInvites);
angular.module("app").component("signingSetupSummary", signingSetupSummary);
angular.module("app").component("hardCopyPrompt", hardCopyPrompt);

angular.module("app").component("signingInvitationForm", signingInvitationForm);
angular.module("app").component("selfSigningSelection", selfSigningSelection);
angular.module("app").component("esignTemplate", esignTemplate);
angular.module("app").component("signatureConfirmation", signatureConfirmation);

