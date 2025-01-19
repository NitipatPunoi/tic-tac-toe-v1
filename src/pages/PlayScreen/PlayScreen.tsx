import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Board } from './../../components/Board'
import { Button } from './../../components/UIElement'
import { useGameState } from './../../hooks/useGameState'
import { Move } from './../../types'

const PlayScreen = () => {
  const { gameState, handleResetGame, handleMove } = useGameState()

  const handleClick = (rowIndex: number, colIndex: number) => {
    const move: Move = { row: rowIndex, col: colIndex }
    !gameState.isGameOver && handleMove(move, gameState.isX)
  }

  useEffect(() => {
    gameState.isGameOver && gameState.winningPath.length > 0 && alert(`${gameState.isX ? 'X' : 'O'} wins!`)
    gameState.isGameOver && gameState.winningPath.length == 0 && alert('isDraw')
  }, [gameState.isGameOver, gameState.winningPath])

  return (
    <div>
      <div className="flex justify-center items-center w-full h-full text-center text-2xl sm:text-3xl font-bold">
        <span className="text-textLightBlue">TIC</span>-<span className="text-textDeepBlue">TAC</span>-
        <span className="text-textRed">TOE</span>
      </div>
      <div className="w-fit mx-auto">
        <div className="flex flex-row justify-between">
          <span>turn {`${gameState.turn}`}</span>
          <span>
            <span className={`${gameState.isX ? 'x-mark' : 'o-mark'} px-1`}>{`${gameState.isX ? 'X' : 'O'}`}</span>
            play
          </span>
        </div>
        <Board
          board={gameState.board}
          lastMove={gameState.move}
          winningPath={gameState.winningPath}
          onClick={handleClick}
        />
      </div>
      <div className="grid grid-rows gap-6 w-2/3 md:w-1/2 lg:w-1/3 h-full mx-auto px-0 sm:px-5 md:px-10 py-10 text-center">
        <Button text="Reset" onClick={handleResetGame} />
        <Link to="/" className="text-nowrap">
          <Button text="Back to Main Menu" />
        </Link>
      </div>
    </div>
  )
}

export default PlayScreen
