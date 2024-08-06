const { BOARD_SIZE } = require('./constants');

const GameBoard = (function (size) {
    const board = [];
    
    const initialize = () => {
        for (let i = 0; i < size; i++) {
            board.push(new Array(size).fill(0));
        }
    }
    initialize();

    const getBoard = () => board;
    const getSize = () => size;
    const displayBoard = () => {
        board.map((row) => console.log(row))
    };

    const updatePosition = (row, col, symbol) => {
        if (row >= size) throw new Error(`Invalid row ${row}`);
        if (col >= size) throw new Error(`Invalid col ${col}`);
        if (board[row][col]) throw new Error(`Cell ${row},${col} already filled`);
        board[row][col] = symbol;
    }

    return { 
        getBoard, 
        getSize,
        displayBoard, 
        updatePosition 
    };
})(BOARD_SIZE);

module.exports = GameBoard;
