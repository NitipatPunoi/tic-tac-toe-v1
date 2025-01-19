import { isInBounds } from './isInBounds'
import { Move } from '../types'

const directions = Object.freeze([
  { dr: 0, dc: 1 }, // Horizontal
  { dr: 1, dc: 0 }, // Vertical
  { dr: 1, dc: 1 }, // Diagonal Up
  { dr: 1, dc: -1 }, // Diagonal Down
])

const traceDirection = (
  board: string[][],
  row: number,
  col: number,
  dr: number,
  dc: number,
  mark: string
): { count: number; positions: Move[] } => {
  const positions: Move[] = []
  const rowsLength = board.length
  const colsLength = board[0].length
  let count = 0
  while (isInBounds(row, col, rowsLength, colsLength) && board[row][col] === mark) {
    positions.push({ row, col })
    row += dr
    col += dc
    count++
  }
  return { count, positions }
}

export const hasGameEnded = (
  board: string[][],
  move: Move,
  winCondition: number
): {
  isGameOver: boolean
  winningPath: Move[]
} => {
  const { row, col } = move
  const mark = board[row][col]
  if (!mark) return { isGameOver: false, winningPath: [] }

  for (const { dr, dc } of directions) {
    const forward = traceDirection(board, row, col, dr, dc, mark)
    const backward = traceDirection(board, row - dr, col - dc, -dr, -dc, mark)

    const totalCount = forward.count + backward.count
    const winningPath = [...forward.positions, ...backward.positions]

    if (totalCount >= winCondition) {
      return { isGameOver: true, winningPath }
    }
  }

  const isDraw = board.every((row) => row.every((cell) => cell !== null))
  if (isDraw) {
    return { isGameOver: true, winningPath: [] }
  }

  return { isGameOver: false, winningPath: [] }
}
