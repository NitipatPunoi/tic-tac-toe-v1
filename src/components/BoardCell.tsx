type BoardCellProps = {
  row: number
  col: number
  cell: string | null
  onClick: (row: number, col: number) => void
  isWinningPath: boolean
  isLastMove: boolean
}

export const BoardCell: React.FC<BoardCellProps> = ({ row, col, cell, onClick, isWinningPath, isLastMove }) => {
  return (
    <div
      onClick={() => onClick(row, col)}
      className={`flex items-center justify-center w-[50px] h-[50px] text-2xl font-lilita border bg-boardBackground border-boardBorder 
                ${cell !== null ? (cell == 'X' ? 'x-mark' : 'o-mark') : 'non-mark'} 
        ${isLastMove ? 'lastMove' : ''} 
        ${isWinningPath ? 'hilight' : ''}`}
    >
      {cell}
    </div>
  )
}
