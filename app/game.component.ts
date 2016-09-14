import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'game',
    template: `
        <div class='row' *ngFor="let gameRow of gameColumns; let rowIndex=index">
            <div style='margin:0;padding:0;' class='col-xs-{{ columnSize }}' *ngFor="let gameColumn of gameRow; let colIndex=index">
                <button
                style='font-size:1.35em; /*background-color:00bfff;*/ text-align:left;'
                [attr.data-number]="gameColumns[rowIndex][colIndex]"
                class='btn btn-info btn-block' (click)="onClick($event)">
                    <i class="fa fa-car"
                    [attr.data-number]="gameColumns[rowIndex][colIndex]"
                    aria-hidden="true"></i>
                    {{ gameColumns[rowIndex][colIndex]? gameColumns[rowIndex][colIndex]:"&nbsp;" }}
                </button>
            </div>
        </div>

        <h3 *ngIf="!gameOver" style='text-align:center'>Time spent: {{ timer | number }}</h3>
        <h2 *ngIf="gameOver" style='text-align:center'>
            Game finished in {{ timer | number }} seconds<br/>
            <a (click)="restartGame()">Restart</a>
        </h2>
    `
})
export class GameComponent implements OnInit {
    gameOver = false;

    numRows = 4; //Any value works
    numColumns = 4; //Possible values: 2, 3, 4, 6, 12

    columnSize = 12/this.numColumns;
    defaultValue = null;

    numberOfRandomDigits = 10;

    sequenceCurrentlyAt = 1;
    sequenceEndsAt = 50;

    // List of unique numbers currently on the board
    numbersOnBoard = [];

    ticker; //observable
    timer:number = 0;


    /**
     * Two dimensional array of game columns
     * @type {Array}
     */
    gameColumns = [];

    constructor(){
    }

    restartGame(){
        this.startGame();
    }

    startGame(){
        this.numbersOnBoard = [];
        this.timer = 0;
        this.gameOver = false;
        this.sequenceCurrentlyAt = 1;

        // Create empty column content
        let columnContents = [];
        for(let x=0; x<this.numColumns; x++){
            columnContents.push(this.defaultValue);
        }

        //Create two dimensional array
        for(let i=0; i<this.numRows; i++){
            this.gameColumns[i] = columnContents.slice(0);
        }

        // Add Initial Number (1) to start the game
        this.putValueInRandomLocation(1);

        // Populate random unique digits at random locations
        for(let i=0; i<this.numberOfRandomDigits; i++){
            this.addRandomFakeOnBoard();
        }

        //Start timer
        this.ticker = Observable.timer(800,100).takeWhile(x => !this.gameOver);

    }

    //Adds a random upcoming number on the board
    addRandomFakeOnBoard(){
        const numOfPossibilities = this.sequenceEndsAt - this.sequenceCurrentlyAt;

        for(let x = 0; x < numOfPossibilities; x++){
            //random number between this.sequenceCurrentlyAt and this.sequenceEndsAt
            const randomVal = this.randomIntFromInterval(this.sequenceCurrentlyAt+1, this.sequenceEndsAt);

            // If random val doesnt exist on board, add it there. Otherwise it will attempt a different number
            if(!this.isNumberOnBoard(randomVal)){
                this.putValueInRandomLocation(randomVal);
                return;
            }
        }
    }

    /**
     * Check if the number is already on the board
     * @return boolean
     */
    isNumberOnBoard(num){
        for(let i = 0; i < this.gameColumns.length; i++) {
            let row = this.gameColumns[i];
            for(let x = 0; x < row.length; x++) {
                let column = row[x];
                if(this.gameColumns[i][x] == num){
                    return true;
                }
            }
        }

        return false;
    }

    deleteNumberFromBoard(num){
        for(let i = 0; i < this.gameColumns.length; i++) {
            let row = this.gameColumns[i];
            for(let x = 0; x < row.length; x++) {
                let column = row[x];
                if(this.gameColumns[i][x] == num){
                    this.gameColumns[i][x] = this.defaultValue;
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Puts a value in a random location that isnt already occupied [Recursive]
     * @return boolean       whether successfully added or not
     */
    putValueInRandomLocation(value){
        for(let x=0; x<20; x++){
            //Random Row and Col Index to check
            let rowIndexToCheck = Math.floor((Math.random() * (this.numRows)));
            let colIndexToCheck = Math.floor((Math.random() * (this.numColumns)));

            if(this.gameColumns[rowIndexToCheck][colIndexToCheck] == this.defaultValue){
                this.gameColumns[rowIndexToCheck][colIndexToCheck] = value;
                return true;
            }
        }
    }

    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }


    onClick(event){
        const numberClicked = event.target.dataset.number;

        // Check if number correctly selected
        if(numberClicked == this.sequenceCurrentlyAt){
            //Start timer on game start
            if(numberClicked == 1){
                this.ticker.subscribe(t => {
                    this.timer += 0.1
                });
            }

            //End the game if sequence ended
            if(this.sequenceCurrentlyAt == this.sequenceEndsAt){
                this.gameOver = true;
                return;
            }

            //Jump to next number in sequence
            this.sequenceCurrentlyAt++;

            // Clear this fields number
            this.deleteNumberFromBoard(numberClicked);

            // If next number is already on board, add fake number. Otherwise show correct sequence
            if(this.isNumberOnBoard(this.sequenceCurrentlyAt)){
                this.addRandomFakeOnBoard();
            }else this.putValueInRandomLocation(this.sequenceCurrentlyAt);

        }
    }

    ngOnInit(){
        //Start the game
        this.startGame();

    }
}
