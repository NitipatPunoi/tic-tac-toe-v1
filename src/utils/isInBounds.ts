export const isInBounds = (row: number, col: number, rowsBounds: number, colsBounds: number): boolean => {
  return row >= 0 && row < rowsBounds && col >= 0 && col < colsBounds
}
