import { GameState, Move } from '../types'
import { checkWinner } from './checkWinner'

const getAvailableMoves = (state: GameState): Move[] => {
  const availableMoves: Move[] = []
  state.board.forEach((item, row) => {
    item.forEach((cell, col) => {
      if (cell === null) {
        availableMoves.push({ row, col })
      }
    })
  })
  return availableMoves
}

const toRandom = (availableMoves: Move[]): Move => {
  const randomIndex = Math.floor(Math.random() * availableMoves.length)
  return availableMoves[randomIndex]
}

const toWin = (state: GameState, availableMoves: Move[]): Move | null => {
  for (const move of availableMoves) {
    const { row, col } = move
    const simulatedState = JSON.parse(JSON.stringify(state))
    simulatedState.board[row][col] = simulatedState.play.isX ? 'X' : 'O'

    const { isWinning } = checkWinner(simulatedState.board, move, simulatedState.setting.winningCondition)

    if (isWinning) {
      return move
    }
  }

  return null
}

const toBlock = (state: GameState, availableMoves: Move[]): Move | null => {
  for (const move of availableMoves) {
    const { row, col } = move
    const simulatedState = JSON.parse(JSON.stringify(state))
    simulatedState.play.isX = !simulatedState.play.isX
    simulatedState.board[row][col] = simulatedState.play.isX ? 'X' : 'O'

    const { isWinning } = checkWinner(simulatedState.board, move, simulatedState.setting.winningCondition)

    if (isWinning) {
      return move
    }
  }

  return null
}

export const makeDecision = (state: GameState): Move => {
  const availableMoves = getAvailableMoves(state)

  const checkThreshold = 2 * state.setting.winningCondition - 1
  if (state.play.turn >= checkThreshold) {
    const toWinMoves = toWin(state, availableMoves)
    if (toWinMoves) {
      return toWinMoves
    }

    const toBlockMoves = toBlock(state, availableMoves)
    if (toBlockMoves) {
      return toBlockMoves
    }
  }

  return toRandom(availableMoves)
}
