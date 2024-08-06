const BOARD_SIZE = 3;
const SYMBOLS = ['X', 'Y'];

// player 2 wins
const INDICES = [
    [1, 1],
    [0, 1],
    [2, 0],
    [0, 2],
    [2, 2],
    [0, 0],
    [1, 2],
    [1, 0],
    [2, 1]
];

module.exports = {
    BOARD_SIZE, 
    SYMBOLS,
}