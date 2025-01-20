import { isInBounds } from './isInBounds'
import { Move, BoardType } from './../types'

const directions = Object.freeze([
  { dr: 0, dc: 1 }, // Horizontal
  { dr: 1, dc: 0 }, // Vertical
  { dr: 1, dc: 1 }, // Diagonal Up
  { dr: 1, dc: -1 }, // Diagonal Down
])

const traceDirection = (
  board: BoardType,
  row: number,
  col: number,
  dr: number,
  dc: number,
  mark: string
): { count: number; positions: Move[] } => {
  const positions: Move[] = []
  const rowsBounds = board.length
  const colsBounds = board[0].length
  let count = 0
  while (isInBounds(row, col, rowsBounds, colsBounds) && board[row][col] === mark) {
    positions.push({ row, col })
    row += dr
    col += dc
    count++
  }
  return { count, positions }
}

export const checkWinner = (
  board: BoardType,
  move: Move,
  winningCondition: number
): {
  isWinning: boolean
  winningPath: Move[] | null
} => {
  const { row, col } = move
  const mark = board[row][col]
  if (!mark) return { isWinning: false, winningPath: null }

  for (const { dr, dc } of directions) {
    const forward = traceDirection(board, row, col, dr, dc, mark)
    const backward = traceDirection(board, row - dr, col - dc, -dr, -dc, mark)

    const totalCount = forward.count + backward.count
    const winningPath = [...forward.positions, ...backward.positions]

    if (totalCount >= winningCondition) {
      return { isWinning: true, winningPath }
    }
  }

  return { isWinning: false, winningPath: null }
}
