import { BoardType } from './../types'

export const checkPlayable = (board: BoardType): boolean => {
  return board.some((row) => row.some((cell) => cell === null))
}
