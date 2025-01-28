import { Board } from '../types'

export const isPlayable = (board: Board): boolean => board.some((row) => row.some((cell) => cell === null))
