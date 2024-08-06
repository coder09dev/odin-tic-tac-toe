const GameBoard = require('./Gameboard');
const createPlayer = require('./player');

const Game = (function () {   
    const board = GameBoard.getBoard();
    const boardSize = GameBoard.getSize();

    const player1 = createPlayer('foo', 'X');
    const player2 = createPlayer('bar', 'Y');

    const play = () => {
        let count = boardSize * boardSize;
        let turn = true;
        while (count--) {
            let player = (turn) ? player1 : player2;
            // TODO: fix  -> update row and cell for each turn
            player.move(1, 1);
            GameBoard.displayBoard();
            if (isWin(player)) {
                console.log(`Player ${player.getName()} WON!!!`);
                return;
            }
            turn = !turn;
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
                diag += board[i][i];
            }
        }
        return (diag === isSameSymbol(player.getSymbol()));
    }

    const checkSecondaryDiag = (player) => {
        let diag = '';
        for (let i = boardSize; i >= 0; i--) {
            for (let j = 0; j < boardSize; j++) {
                if (i === j || 
                    ((i === boardSize - 1) && (j === 0)) || 
                    ((i === 0) && (j === boardSize - 1))
                ) {
                    diag += board[i][j];
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
            count = board[i].reduce((count, cell) => {
                if (cell) count += 1;
                return count;
            }, 0);
        }
        return count === (boardSize * boardSize);
    };

    return { play };
})();

module.exports = Game;