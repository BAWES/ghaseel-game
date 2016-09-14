System.register(['angular2/core', './game.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, game_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (game_component_1_1) {
                game_component_1 = game_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <div style='text-align:center;'>\n        <img src='images/ghaseel-logo.png' style='width:100px'/>\n        <h2>Ghaseel Game</h2>\n    </div>\n    <game></game>\n\n    <div  style='text-align:center; margin-top:10px;'>\n    <a href='https://itunes.apple.com/us/app/ghaseel-ghsyl/id1052534178?ls=1&mt=8' target='_blank'>\n        <img src='images/appstore.png' style='width:130px'/>\n    </a>\n\n    <br/><br/>\n\n    <div class=\"well well-sm\" style='display:inline;'>\n        <a href='http://bawes.net' target='_blank'>\n            <img src='http://bawes.net/wp-content/uploads/2016/03/logo.png' style='width:50px;'/>\n            Built Awesome by BAWES</a>\n    </div>\n    </div>\n\n    ",
                        directives: [game_component_1.GameComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map