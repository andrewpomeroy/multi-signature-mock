import angular from "angular";

const AppModule = "app";

angular.module(AppModule, [
	"ui.router",
	"ngSanitize",
	"ngAria",
	"ngAnimate",
	"ngMaterial",
	"wnd.form"
]).controller("HelloController", function ($scope) {

});

export default AppModule;
