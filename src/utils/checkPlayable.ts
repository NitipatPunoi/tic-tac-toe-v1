import { Board } from '../types'

export const checkPlayable = (board: Board): boolean => {
  return board.some((row) => row.some((cell) => cell === null))
}
