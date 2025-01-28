import { getStepsBack } from '../utils'
import { GameState } from '../types'
import { BoardRow } from './BoardRow'

type BoardProps = {
  state: GameState
  onClick: (row: number, col: number) => void
}

export const Board: React.FC<BoardProps> = ({ state, onClick }) => {
  const isWinningPath = (row: number, col: number): boolean => {
    return state.result.winningPath !== undefined
      ? state.result.winningPath.some((pos) => pos.row === row && pos.col === col)
      : false
  }

  const isLastMove = (row: number, col: number): boolean => {
    const lastMove = getStepsBack(state.logs)
    return lastMove ? lastMove.row === row && lastMove.col === col : false
  }

  return (
    <div className="board select-none">
      {state.board.map((cellsRow, row) => (
        <BoardRow
          key={row}
          row={row}
          boardRow={cellsRow}
          onClick={onClick}
          isWinningPath={isWinningPath}
          isLastMove={isLastMove}
        />
      ))}
    </div>
  )
}
