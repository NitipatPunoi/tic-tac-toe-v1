import { BoardType, GameState, Move, PlayState } from '../types'
import { checkWinner } from './checkWinner'
import { getCheckThreshold } from './getCheckThreshold'

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

const getSimulatedState = (state: GameState): GameState => {
  return JSON.parse(JSON.stringify(state))
}

const getAvailableMoves = (board: BoardType): Move[] => {
  const availableMoves: Move[] = []
  board.forEach((item, row) => {
    item.forEach((cell, col) => {
      if (cell === null) {
        availableMoves.push({ row, col })
      }
    })
  })
  return availableMoves
}

const getStepsBackMove = (logs: PlayState[] | null, stepsBack: number = 1): Move | null =>
  logs && logs.length >= stepsBack ? logs[logs.length - stepsBack].move : null

const toNearby = (state: GameState | null, availableMoves: Move[]): Move | null => {
  if (!state?.logs) {
    return null
  }
  const stepsBackMove = getStepsBackMove(state.logs, 2)

  if (!stepsBackMove) {
    return null
  }

  for (const { dr, dc } of directions) {
    const nearbyMove = {
      row: stepsBackMove.row + dr,
      col: stepsBackMove.col + dc,
    }

    if (availableMoves.some((move) => move.row === nearbyMove.row && move.col === nearbyMove.col)) {
      return nearbyMove
    }
  }

  return null
}

const toRandom = (availableMoves: Move[]): Move => {
  const randomIndex = Math.floor(Math.random() * availableMoves.length)
  return availableMoves[randomIndex]
}

const toRandomNonEdge = (board: BoardType, availableMoves: Move[]): Move | null => {
  const rowsBounds = board.length
  const colsBounds = board[0].length

  const nonEdgeMoves = availableMoves.filter(({ row, col }) => {
    return row > 0 && row < rowsBounds - 1 && col > 0 && col < colsBounds - 1
  })

  return nonEdgeMoves.length !== 0 ? toRandom(nonEdgeMoves) : null
}

const toWin = (state: GameState, availableMoves: Move[], turnToPredict: number): Move | null => {
  for (const move of availableMoves) {
    const simulatedState = getSimulatedState(state)
    simulatedState.board[move.row][move.col] = simulatedState.play.isX ? 'X' : 'O'

    const winningCondition = simulatedState.setting.winningCondition - turnToPredict
    const { isWinning } = checkWinner(simulatedState.board, move, winningCondition)

    if (isWinning) {
      if (turnToPredict > 0) {
        const newMoves = getAvailableMoves(simulatedState.board)
        const toWinMove = toWin(simulatedState, newMoves, turnToPredict - 1)
        if (toWinMove) {
          return move
        }
      } else {
        return move
      }
    }
  }

  return null
}

const toBlock = (state: GameState, availableMoves: Move[], turnToPredict: number): Move | null => {
  for (const move of availableMoves) {
    const simulatedState = getSimulatedState(state)
    simulatedState.play.isX = !simulatedState.play.isX
    simulatedState.board[move.row][move.col] = simulatedState.play.isX ? 'X' : 'O'

    const winningCondition = simulatedState.setting.winningCondition - turnToPredict
    const { isWinning } = checkWinner(simulatedState.board, move, winningCondition)

    if (isWinning) {
      if (turnToPredict > 0) {
        const newMoves = getAvailableMoves(simulatedState.board)
        simulatedState.play.isX = !simulatedState.play.isX
        const toBlockMove = toBlock(simulatedState, newMoves, turnToPredict - 1)
        if (toBlockMove) {
          return move
        }
      } else {
        return move
      }
    }
  }

  return null
}

export const makeDecision = (state: GameState, decisionLevel: number = 0): Move | null => {
  const availableMoves = getAvailableMoves(state.board)

  if (availableMoves.length === 0) {
    return null
  }

  for (let level = 0; level <= decisionLevel; level++) {
    const checkThreshold = getCheckThreshold(state.setting.winningCondition, level)

    if (state.play.turn >= checkThreshold) {
      const toWinMove = toWin(state, availableMoves, level)
      if (toWinMove) {
        return toWinMove
      }

      const toBlockMove = toBlock(state, availableMoves, level)
      if (toBlockMove) {
        return toBlockMove
      }
    }
  }

  if (decisionLevel >= 2) {
    const toNearbyMove = toNearby(state, availableMoves)
    if (toNearbyMove) {
      return toNearbyMove
    }
  }

  if (decisionLevel >= 1) {
    const toRandomNonEdgeMove = toRandomNonEdge(state.board, availableMoves)
    if (toRandomNonEdgeMove) {
      return toRandomNonEdgeMove
    }
  }

  return toRandom(availableMoves)
}
