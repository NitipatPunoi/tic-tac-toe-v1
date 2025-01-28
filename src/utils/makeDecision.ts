import { Board, GameState, Move } from '../types'
import { findWinner } from './findWinner'
import { getCheckResultThreshold } from './getCheckResultThreshold'
import { getNextSymbol } from './getNextSymbol'
import { getStepsBack } from './getStepsBack'

const directions = Object.freeze([
  { dr: -1, dc: -1 },
  { dr: -1, dc: 0 },
  { dr: -1, dc: 1 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
  { dr: 1, dc: -1 },
  { dr: 1, dc: 0 },
  { dr: 1, dc: 1 },
])

const cloneState = (state: GameState): GameState => JSON.parse(JSON.stringify(state))

const getAvailableMoves = (board: Board): Move[] => {
  return board
    .flatMap((cellsRow, row) => cellsRow.map((cell, col) => (cell === null ? { row, col } : null)))
    .filter((move): move is Move => move !== null)
}

const getRandomMove = (availableMoves: Move[]): Move => {
  const randomIndex = Math.floor(Math.random() * availableMoves.length)
  return availableMoves[randomIndex]
}

const filterNonEdgeMoves = (board: Board, availableMoves: Move[]): Move[] => {
  const rows = board.length
  const cols = board[0].length
  return availableMoves.filter(({ row, col }) => row > 0 && row < rows - 1 && col > 0 && col < cols - 1)
}

const getNearbyMove = (state: GameState, availableMoves: Move[], stepsBack: number = 2): Move | null => {
  const stepsBackMove = getStepsBack(state.logs, stepsBack)
  if (!stepsBackMove) return null

  for (const { dr, dc } of directions) {
    const nearbyMove = {
      row: stepsBackMove.row + dr,
      col: stepsBackMove.col + dc,
    }

    const isAvailable = availableMoves.some((move) => move.row === nearbyMove.row && move.col === nearbyMove.col)
    if (isAvailable) return nearbyMove
  }

  return null
}

const getStrategyMove = (
  state: GameState,
  availableMoves: Move[],
  symbol: string,
  turnToPredict: number
): Move | null => {
  for (const move of availableMoves) {
    const simulatedState = cloneState(state)
    simulatedState.board[move.row][move.col] = symbol

    const winningCondition = simulatedState.setting.winningCondition - turnToPredict
    const { isFound } = findWinner(simulatedState.board, move, winningCondition)

    if (isFound) {
      if (turnToPredict > 0) {
        const newMoves = getAvailableMoves(simulatedState.board)
        const nextMove = getStrategyMove(simulatedState, newMoves, symbol, turnToPredict - 1)
        if (nextMove) return move
      } else {
        return move
      }
    }
  }

  return null
}

export const makeDecision = (state: GameState, decisionLevel: number = 0): Move | null => {
  const availableMoves = getAvailableMoves(state.board)
  if (availableMoves.length === 0) return null

  const winningSymbol = state.turn.symbol
  const blockingSymbol = getNextSymbol(state.players, state.turn.symbol)

  for (let level = 0; level <= decisionLevel; level++) {
    const threshold = getCheckResultThreshold(state.setting.winningCondition, level)
    if (state.turn.number < threshold) continue

    for (const symbol of [winningSymbol, blockingSymbol]) {
      const strategyMove = getStrategyMove(state, availableMoves, symbol, level)
      if (strategyMove) return strategyMove
    }
  }

  if (decisionLevel >= 2) {
    const nearbyMove = getNearbyMove(state, availableMoves)
    if (nearbyMove) return nearbyMove
  }

  if (decisionLevel >= 1) {
    const nonEdgeMoves = filterNonEdgeMoves(state.board, availableMoves)
    if (nonEdgeMoves.length > 0) return getRandomMove(nonEdgeMoves)
  }

  return getRandomMove(availableMoves)
}
