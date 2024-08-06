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
    const displayBoard = () => console.log(board);

    const updatePosition = (row, cell, player) => {
        if (board[row][cell]) throw new Error(`Cell ${row},${cell} already filled`);
        board[row][cell] = player;
    }

    return { 
        getBoard, 
        getSize,
        displayBoard, 
        updatePosition 
    };
})(BOARD_SIZE);

module.exports = GameBoard;