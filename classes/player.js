const { SYMBOLS } = require('./constants');

function createPlayer(name, symbol) {
    if (!SYMBOLS.includes(symbol)) throw new Error(`Symbol ${symbol} not allowed`);

    const getName = () => name;
    const getSymbol = () => symbol;

    const move = (row, cell) => {
        GameBoard.updatePosition(row, cell, symbol);
    }
    return { 
        getName,
        getSymbol,
        move,
    };
}

module.exports = createPlayer;