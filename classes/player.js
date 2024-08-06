const { SYMBOLS } = require('./constants');
const GameBoard = require('./Gameboard');

function createPlayer(name, symbol) {
    if (!SYMBOLS.includes(symbol)) throw new Error(`Symbol ${symbol} not allowed`);

    const getName = () => name;
    const getSymbol = () => symbol;

    const move = (row, col) => {
        GameBoard.updatePosition(row, col, symbol);
    }

    return { 
        getName,
        getSymbol,
        move,
    };
}

module.exports = createPlayer;