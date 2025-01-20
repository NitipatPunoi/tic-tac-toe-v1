import { Move, BoardType } from './../types'

type BoardProps = {
  board: BoardType
  move: Move | null
  winningPath: Move[] | null
  onClick: (row: number, col: number) => void
}

export const Board: React.FC<BoardProps> = ({ board, move, winningPath, onClick }) => {
  const isWinningPath = (row: number, col: number) =>
    winningPath !== null && winningPath.some((pos) => pos.row === row && pos.col === col)
  return (
    <div className="board select-none">
      {board.map((boardRow, row) => (
        <div key={row} className="flex flex-row items-center justify-center">
          {boardRow.map((cell, col) => (
            <div
              key={col}
              onClick={() => onClick(row, col)}
              className={`flex items-center justify-center w-[50px] h-[50px] text-2xl font-lilita border bg-boardBackground border-boardBorder 
                ${cell !== null ? (cell == 'X' ? 'x-mark' : 'o-mark') : 'cursor-pointer'} 
                ${move && move.row === row && move.col === col && 'lastMove'}
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
