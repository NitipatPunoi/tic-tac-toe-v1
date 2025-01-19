export const isInBounds = (row: number, col: number, rowsLength: number, colsLength: number): boolean => {
  return row >= 0 && row < rowsLength && col >= 0 && col < colsLength
}
