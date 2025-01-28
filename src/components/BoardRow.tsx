import React from 'react'
import { BoardCell } from './BoardCell'

type BoardRowProps = {
  row: number
  boardRow: (string | null)[]
  onClick: (row: number, col: number) => void
  isWinningPath: (row: number, col: number) => boolean
  isLastMove: (row: number, col: number) => boolean
}

export const BoardRow: React.FC<BoardRowProps> = ({ row, boardRow, onClick, isWinningPath, isLastMove }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      {boardRow.map((cell, col) => (
        <BoardCell
          key={col}
          row={row}
          col={col}
          cell={cell}
          onClick={onClick}
          isWinningPath={isWinningPath(row, col)}
          isLastMove={isLastMove(row, col)}
        />
      ))}
    </div>
  )
}
