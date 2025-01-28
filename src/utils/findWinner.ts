import { isInBounds } from './isInBounds'
import { Move, Board } from '../types'

const directions = Object.freeze([
  { dr: 0, dc: 1 },
  { dr: 1, dc: 0 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: -1 },
])

const traceDirection = (
  board: Board,
  row: number,
  col: number,
  dr: number,
  dc: number,
  symbol: string
): { count: number; positions: Move[] } => {
  const positions: Move[] = []
  const rowsBounds = board.length
  const colsBounds = board[0].length
  let count = 0
  while (isInBounds(row, col, rowsBounds, colsBounds) && board[row][col] === symbol) {
    positions.push({ row, col })
    row += dr
    col += dc
    count++
  }
  return { count, positions }
}

export const findWinner = (
  board: Board,
  move: Move,
  winningCondition: number
): {
  isFound: boolean
  winningPath?: Move[]
} => {
  const { row, col } = move
  const symbol = board[row][col]
  if (!symbol) return { isFound: false }

  for (const { dr, dc } of directions) {
    const forward = traceDirection(board, row, col, dr, dc, symbol)
    const backward = traceDirection(board, row - dr, col - dc, -dr, -dc, symbol)

    const totalCount = forward.count + backward.count
    const winningPath = [...forward.positions, ...backward.positions]

    if (totalCount >= winningCondition) return { isFound: true, winningPath }
  }

  return { isFound: false }
}
