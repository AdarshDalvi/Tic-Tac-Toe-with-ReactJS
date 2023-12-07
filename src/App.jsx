import './index.scss';
import PlayerCard from './components/PlayerCard.jsx';
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { decideActivePlayer, decideWinner } from './components/helper.js';

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const INITIAL_GAMEBOARDTURNS = {
  gameBoard: [...INITIAL_GAMEBOARD],
  gameTurns: []
}

function App() {
  const [gameBoardTurns, setgameBoardTurns] = useState(INITIAL_GAMEBOARDTURNS)
  const activePlayer = decideActivePlayer(gameBoardTurns.gameTurns)
  let winner;

  const [playerInfo, setPlayerInfo] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })

  const playerNameEdit = (playerSymbol, playerName) => {
    setPlayerInfo(prevInfo => {
      return {
        ...prevInfo,
        [playerSymbol]: playerName
      }
    })
  }


  function handleSquareClicks(rowIndex, elementIndex) {
    setgameBoardTurns(prevgameBoardTurns => {

      const currentActivePlayer = decideActivePlayer(prevgameBoardTurns.gameTurns); // Determine the current active player based on game turns

      // Create updated game turns with the latest click
      const updatedGameTurns = [
        {
          clickedSquare: { rowIndex, elementIndex },
          playerSymbol: currentActivePlayer
        },
        ...prevgameBoardTurns.gameTurns
      ];

      const updatedGameBoard = [...prevgameBoardTurns.gameBoard.map(innerArray => [...innerArray])]; // Deep copy of the game board to prevent direct mutation

      updatedGameBoard[rowIndex][elementIndex] = currentActivePlayer; // Update the clicked square with the current active player's symbol

      // Return the updated state, including game turns and game board
      return {
        ...prevgameBoardTurns,
        gameTurns: updatedGameTurns,
        gameBoard: updatedGameBoard
      };
    });
  }

  if (gameBoardTurns.gameTurns.length >= 5) {
    winner = decideWinner(gameBoardTurns.gameBoard)
  }

  const hasDraw = gameBoardTurns.gameTurns.length === 9 && winner === null

  function handleRematch() {
    setgameBoardTurns(INITIAL_GAMEBOARDTURNS)
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <PlayerCard
            playerName={playerInfo.X}
            playerSymbol='X'
            isActive={activePlayer === 'X'}
            editFunction={playerNameEdit}
          />
          <PlayerCard
            playerName={playerInfo.O}
            playerSymbol='O'
            isActive={activePlayer === 'O'}
            editFunction={playerNameEdit}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={playerInfo[winner]} rematchFunction={handleRematch} />}
        <GameBoard
          gameBoard={gameBoardTurns.gameBoard}
          onSquareClick={handleSquareClicks}
        />
      </div>
      <Log gameTurns={gameBoardTurns.gameTurns} />
    </main>
  )
}

export default App
