const PLAYER_X = 1;
const PLAYER_O = -1;

//start Cell Object
class Cell {
    constructor(y, x) {
        this.y = y;
        this.x = x;
        this.value = 0;
    }

    //Create cell
    setHTML() {
        let cellLeft = this.x * 30;
        let cellTop = this.y * 30;
        let cellHTML = `<button id='cell${this.y}${this.x}' 
                                class='cell' onclick=playCaro(${this.y},${this.x})
                                style='width:30px; height:30px; 
                                top:${cellTop}px; left:${cellLeft}px; 
                                line-height:30px; position:absolute;'>
                        </button>`;
        return cellHTML;
    }

    //Mark players
    draw() {
        let cellValue = document.getElementById(`cell${this.y}${this.x}`);
        switch (this.value) {
            case PLAYER_X:
                cellValue.innerHTML = 'X';
                break;
            case PLAYER_O:
                cellValue.innerHTML = 'O';
                break;
            default:
                cellValue.innerHTML = '';
        }
    }
}
//end Cell Object

//start CaroBoard Object
class CaroBoard {
    constructor(rows, cols, id) {
        this.rows = rows;
        this.cols = cols;
        this.id = id;
        this.cells = [];
        this.isOver = false;
        this.turn = PLAYER_X;
    }

    //Draw caro board
    drawBoard() {
        const GAMEBOARD = document.getElementById(this.id);
        GAMEBOARD.innerHTML = '';
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            this.cells.push(row);
            for (let x = 0; x < this.cols; x++) {
                let cell = new Cell(y, x);
                row.push(cell);
                GAMEBOARD.innerHTML += cell.setHTML();
            }
            //console.log(row);
        }
        console.log(this.cells);
    }

    //Win condition
    checkWinCondition(count) {
        if (count === 5) {
            this.isOver = true;
            this.turn === PLAYER_X ? alert(`Player X win!!!`) : alert(`Player O wins!!!`)
        }
    }

    //Check win
    //Horizontal
    checkWinHor(y, x) {
        let count = 1;
        let i = 1;
        while (
            (x + i < this.cols) &&
            this.cells[y][x + i].value === this.cells[y][x].value
            ) {
            count++;
            i++
        }

        while (
            (x - i >= 0) &&
            this.cells[y][x - i].value === this.cells[y][x].value
            ) {
            count++;
            i++
        }
        this.checkWinCondition(count);
    }

    //Vertical
    checkWinVer(y, x) {
        let count = 1;
        let i = 1;
        while (
            (y + i < this.rows) &&
            this.cells[y + i][x].value === this.cells[y][x].value
            ) {
            count++;
            i++;
        }

        while (
            (y - i >= 0) &&
            this.cells[y - i][x].value === this.cells[y][x].value
            ) {
            count++;
            i++;
        }
        this.checkWinCondition(count);
    }

    //Diagonal \
    checkWinDiag1(y, x) {
        let count = 1;
        let i = 1;
        while (
            (x + i < this.cols) &&
            (y + i < this.rows) &&
            this.cells[y + i][x + i].value === this.cells[y][x].value
            ) {
            count++;
            i++;
        }

        while (
            (x - i >= 0) &&
            (y - i >= 0) &&
            this.cells[y - i][x - i].value === this.cells[y][x].value
            ) {
            count++;
            i++;
        }
        this.checkWinCondition(count);
    }

    //Diagonal /
    checkWinDiag2(y, x) {
        let count = 1;
        let i = 1;
        while (
            (x + i < this.cols) &&
            (y - i >= 0) &&
            this.cells[y - i][x + i].value === this.cells[y][x].value
            ) {
            count++;
            i++;
        }

        while (
            (x - i >= 0) &&
            (y + i < this.rows) &&
            this.cells[y + i][x - i].value === this.cells[y][x].value
            ) {
            count++;
            i++;
        }
        this.checkWinCondition(count);
    }

    checkWin(y, x) {
        this.checkWinHor(y, x);
        this.checkWinVer(y, x);
        this.checkWinDiag1(y, x);
        this.checkWinDiag2(y, x);
    }

    //Handle gameplay
    playCaro(y, x) {
        if (this.isOver) return;

        if (this.cells[y][x].value === 0) {
            this.cells[y][x].value = this.turn;
            this.cells[y][x].draw();
            this.checkWin(y, x);
            this.turn === PLAYER_X ? this.turn = PLAYER_O : this.turn = PLAYER_X;
        } else {
            alert(`this cell is occupied!`);
        }
    }
}
//end CaroBoard Object

let gameBoard;

function play() {
    let rows = document.getElementById('row').value;
    let cols = document.getElementById('col').value;
    gameBoard = new CaroBoard(rows, cols, 'board');
    gameBoard.drawBoard();
    document.getElementById('btn').innerText = `Reset`;
};


function playCaro(y, x) {
    gameBoard.playCaro(y, x);
}