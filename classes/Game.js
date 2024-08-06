const prompt = require('prompt-sync')({sigint: true});
const GameBoard = require('./Gameboard');
const createPlayer = require('./player');

const Game = (function () {   
    const board = GameBoard.getBoard();
    const boardSize = GameBoard.getSize();

    const player1 = createPlayer('foo', 'X');
    const player2 = createPlayer('bar', 'Y');

    const play = () => {
        let turn = 1;
        let totalTurns = boardSize * boardSize;
        let r, c;
        while (turn <= totalTurns) {
            let player = (turn % 2) ? player1 : player2;
            console.log(`Turn ${turn}: Player '${player.getName()}'`);
            r = Number(prompt('Enter row: '));
            c = Number(prompt('Enter col: '));

            try {
                player.move(r, c);
                GameBoard.displayBoard();

                if (isWin(player)) {
                    console.log(`Player '${player.getName()}' WON!!!`);
                    return;
                }
                turn++;
            } catch(err) {
                console.log(err);
            }
        }
        if (isDraw()) {
            console.log(`It's a DRAW`);
        }
    };

    const isSameSymbol = (str) => {
        return str.repeat(boardSize);
    }

    const checkRows = (player) => {
        let isSame = false;
        for (let i = 0; i < boardSize; i++) {
            isSame = board[i].every((cell) => cell === player.getSymbol());
            if (isSame) return isSame;
        }
        return false;
    }

    const checkCols = (player) => {
        let col = '';
        for (let i = 0; i < boardSize; i++) {
            col = '';
            for (let j = 0; j < boardSize; j++) {
                col += board[j][i];
            }
            isSame = (col === isSameSymbol(player.getSymbol()));
            if (isSame) return true;
        }
        return false;
    }

    const checkPrimaryDiag = (player) => {
        let diag = '';
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (i === j)  {
                    diag += board[i][i];
                }
            }
        }
        return (diag === isSameSymbol(player.getSymbol()));
    }

    const checkSecondaryDiag = (player) => {
        let diag = '';
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if ((i === 0) && (j === boardSize - 1)) {
                    if (board[i][j]) diag += board[i][j];
                } else if ((j === 0) && (i === boardSize - 1)) {
                    if (board[i][j]) diag += board[i][j];
                } else if (i === j && i !== 0 &&  j !== 0 && i !== boardSize - 1 &&  j !== boardSize - 1) {
                    if (board[i][j]) diag += board[i][j];
                }
            }
        }
        return (diag === isSameSymbol(player.getSymbol()));
    }

    const isWin = (player) => {
        return checkRows(player) ||
            checkCols(player) ||
            checkPrimaryDiag(player) ||
            checkSecondaryDiag(player);
    };

    const isDraw = () => {
        let count;
        for (let i = 0; i < boardSize; i++) {
            count = board[i].reduce((count, col) => {
                if (col) count += 1;
                return count;
            }, 0);
        }
        return count === (boardSize * boardSize);
    };

    return { play };
})();

module.exports = Game;
