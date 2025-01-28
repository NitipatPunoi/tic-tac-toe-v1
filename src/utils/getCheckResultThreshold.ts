export const getCheckResultThreshold = (winningCondition: number = 3, decisionLevel: number = 0): number =>
  Math.max(3, 2 * winningCondition - 2 * decisionLevel - 2)
