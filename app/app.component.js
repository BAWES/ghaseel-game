"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div style='text-align:center; margin:0;padding:0;'>\n        <img src='images/ghaseel-logo.png' style='width:100px;margin:0;padding:0;'/>\n        <h2 style='margin-top:0; padding-top:0;'>Ghaseel Game</h2>\n    </div>\n    <game></game>\n\n    <div  style='text-align:center; margin-top:10px;'>\n        <a href='https://itunes.apple.com/us/app/ghaseel-ghsyl/id1052534178?ls=1&mt=8' target='_blank'>\n            <img src='images/appstore.png' style='width:130px'/>\n        </a>\n\n        <br/><br/><br/><br/>\n\n        <div class=\"well well-sm\" style='display:inline;'>\n            <a href='http://bawes.net' target='_blank'>\n                <img src='http://bawes.net/wp-content/uploads/2016/03/logo.png' style='width:50px;'/>\n                Built Awesome by BAWES</a>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map