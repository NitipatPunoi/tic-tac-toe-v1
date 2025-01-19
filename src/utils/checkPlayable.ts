export const checkPlayable = (board: string[][]): boolean => {
  return board.some((row) => row.some((cell) => cell === null))
}
