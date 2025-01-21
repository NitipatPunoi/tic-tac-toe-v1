import { getStepsBack } from '../utils'
import { GameState } from '../types'

type BoardProps = {
  state: GameState
  onClick: (row: number, col: number) => void
}

export const Board: React.FC<BoardProps> = ({ state, onClick }) => {
  const isWinningPath = (row: number, col: number) =>
    state.play.winningPath !== null && state.play.winningPath.some((pos) => pos.row === row && pos.col === col)

  const isLastMove = (row: number, col: number): string => {
    const lastMove = getStepsBack(state.logs)
    return lastMove && lastMove.row === row && lastMove.col === col ? 'lastMove' : ''
  }

  return (
    <div className="board select-none">
      {state.board.map((boardRow, row) => (
        <div key={row} className="flex flex-row items-center justify-center">
          {boardRow.map((cell, col) => (
            <div
              key={col}
              onClick={() => onClick(row, col)}
              className={`flex items-center justify-center w-[50px] h-[50px] text-2xl font-lilita border bg-boardBackground border-boardBorder 
                ${cell !== null ? (cell == 'X' ? 'x-mark' : 'o-mark') : 'cursor-pointer'} 
                ${isLastMove(row, col)}  
                ${isWinningPath(row, col) && 'hilight'}`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
