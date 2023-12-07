import WINNING_COMBINATIONS from '../winningCombinations.js';

function decideActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].playerSymbol == 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function decideWinner(gameBoard) {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = firstSquareSymbol;
            return winner;
        }
    }
    return winner;
}

export { decideWinner, decideActivePlayer };
