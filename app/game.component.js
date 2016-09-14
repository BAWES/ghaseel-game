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
var Rx_1 = require('rxjs/Rx');
var GameComponent = (function () {
    function GameComponent() {
        this.gameOver = false;
        this.numRows = 4; //Any value works
        this.numColumns = 4; //Possible values: 2, 3, 4, 6, 12
        this.columnSize = 12 / this.numColumns;
        this.defaultValue = null;
        this.numberOfRandomDigits = 10;
        this.sequenceCurrentlyAt = 1;
        this.sequenceEndsAt = 50;
        // List of unique numbers currently on the board
        this.numbersOnBoard = [];
        this.timer = 0;
        /**
         * Two dimensional array of game columns
         * @type {Array}
         */
        this.gameColumns = [];
    }
    GameComponent.prototype.restartGame = function () {
        this.startGame();
    };
    GameComponent.prototype.startGame = function () {
        var _this = this;
        this.numbersOnBoard = [];
        this.timer = 0;
        this.gameOver = false;
        this.sequenceCurrentlyAt = 1;
        // Create empty column content
        var columnContents = [];
        for (var x = 0; x < this.numColumns; x++) {
            columnContents.push(this.defaultValue);
        }
        //Create two dimensional array
        for (var i = 0; i < this.numRows; i++) {
            this.gameColumns[i] = columnContents.slice(0);
        }
        // Add Initial Number (1) to start the game
        this.putValueInRandomLocation(1);
        // Populate random unique digits at random locations
        for (var i = 0; i < this.numberOfRandomDigits; i++) {
            this.addRandomFakeOnBoard();
        }
        //Start timer
        this.ticker = Rx_1.Observable.timer(800, 100).takeWhile(function (x) { return !_this.gameOver; });
    };
    //Adds a random upcoming number on the board
    GameComponent.prototype.addRandomFakeOnBoard = function () {
        var numOfPossibilities = this.sequenceEndsAt - this.sequenceCurrentlyAt;
        for (var x = 0; x < numOfPossibilities; x++) {
            //random number between this.sequenceCurrentlyAt and this.sequenceEndsAt
            var randomVal = this.randomIntFromInterval(this.sequenceCurrentlyAt + 1, this.sequenceEndsAt);
            // If random val doesnt exist on board, add it there. Otherwise it will attempt a different number
            if (!this.isNumberOnBoard(randomVal)) {
                this.putValueInRandomLocation(randomVal);
                return;
            }
        }
    };
    /**
     * Check if the number is already on the board
     * @return boolean
     */
    GameComponent.prototype.isNumberOnBoard = function (num) {
        for (var i = 0; i < this.gameColumns.length; i++) {
            var row = this.gameColumns[i];
            for (var x = 0; x < row.length; x++) {
                var column = row[x];
                if (this.gameColumns[i][x] == num) {
                    return true;
                }
            }
        }
        return false;
    };
    GameComponent.prototype.deleteNumberFromBoard = function (num) {
        for (var i = 0; i < this.gameColumns.length; i++) {
            var row = this.gameColumns[i];
            for (var x = 0; x < row.length; x++) {
                var column = row[x];
                if (this.gameColumns[i][x] == num) {
                    this.gameColumns[i][x] = this.defaultValue;
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Puts a value in a random location that isnt already occupied [Recursive]
     * @return boolean       whether successfully added or not
     */
    GameComponent.prototype.putValueInRandomLocation = function (value) {
        for (var x = 0; x < 20; x++) {
            //Random Row and Col Index to check
            var rowIndexToCheck = Math.floor((Math.random() * (this.numRows)));
            var colIndexToCheck = Math.floor((Math.random() * (this.numColumns)));
            if (this.gameColumns[rowIndexToCheck][colIndexToCheck] == this.defaultValue) {
                this.gameColumns[rowIndexToCheck][colIndexToCheck] = value;
                return true;
            }
        }
    };
    GameComponent.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    GameComponent.prototype.onClick = function (event) {
        var _this = this;
        var numberClicked = event.target.dataset.number;
        // Check if number correctly selected
        if (numberClicked == this.sequenceCurrentlyAt) {
            //Start timer on game start
            if (numberClicked == 1) {
                this.ticker.subscribe(function (t) {
                    _this.timer += 0.1;
                });
            }
            //End the game if sequence ended
            if (this.sequenceCurrentlyAt == this.sequenceEndsAt) {
                this.gameOver = true;
                return;
            }
            //Jump to next number in sequence
            this.sequenceCurrentlyAt++;
            // Clear this fields number
            this.deleteNumberFromBoard(numberClicked);
            // If next number is already on board, add fake number. Otherwise show correct sequence
            if (this.isNumberOnBoard(this.sequenceCurrentlyAt)) {
                this.addRandomFakeOnBoard();
            }
            else
                this.putValueInRandomLocation(this.sequenceCurrentlyAt);
        }
    };
    GameComponent.prototype.ngOnInit = function () {
        //Start the game
        this.startGame();
    };
    GameComponent = __decorate([
        core_1.Component({
            selector: 'game',
            template: "\n        <div class='row' *ngFor=\"let gameRow of gameColumns; let rowIndex=index\">\n            <div style='margin:0;padding:0;' class='col-xs-{{ columnSize }}' *ngFor=\"let gameColumn of gameRow; let colIndex=index\">\n                <button\n                style='font-size:1.4em; background-color:00bfff; text-align:left;'\n                [attr.data-number]=\"gameColumns[rowIndex][colIndex]\"\n                class='btn btn-primary btn-block' (click)=\"onClick($event)\">\n                    <i class=\"fa fa-car\"\n                    [attr.data-number]=\"gameColumns[rowIndex][colIndex]\"\n                    aria-hidden=\"true\"></i>\n                    {{ gameColumns[rowIndex][colIndex]? gameColumns[rowIndex][colIndex]:\"&nbsp;\" }}\n                </button>\n            </div>\n        </div>\n\n        <h3 *ngIf=\"!gameOver\" style='text-align:center'>Time spent: {{ timer | number }}</h3>\n        <h2 *ngIf=\"gameOver\" style='text-align:center'>\n            Game Over, finished game in {{ timer | number }} seconds<br/>\n            <a (click)=\"restartGame()\">Restart</a>\n        </h2>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map