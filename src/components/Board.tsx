import { Move } from '../types'

type BoardProps = {
  board: string[][]
  lastMove: Move | null
  winningPath: Move[] | null
  onClick: (rowIndex: number, colIndex: number) => void
}

export const Board: React.FC<BoardProps> = ({ board, lastMove, winningPath, onClick }) => {
  const isWinningPath = (row: number, col: number) =>
    winningPath !== null && winningPath.some((pos) => pos.row === row && pos.col === col)
  return (
    <div className="board select-none">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row items-center justify-center">
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              onClick={() => onClick(rowIndex, colIndex)}
              className={`flex items-center justify-center w-[50px] h-[50px] text-2xl font-lilita border bg-boardBackground border-boardBorder 
                ${col !== null ? (col == 'X' ? 'x-mark' : 'o-mark') : 'cursor-pointer'} 
                ${lastMove && lastMove.row === rowIndex && lastMove.col === colIndex && 'lastMove'}
                ${isWinningPath(rowIndex, colIndex) && 'hilight'}`}
            >
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
