import { GameState, ActionReset, ActionMove, ActionGameOver } from '../types'
import { initGameState } from './gameReducer'

export const handleReset = (action: ActionReset): GameState => {
  const setting = action.setting
  return initGameState(setting)
}

export const handleMove = (state: GameState, action: ActionMove): GameState => {
  const { move, isX } = action
  const board = state.board.map((row, rIdx) =>
    rIdx === move.row ? row.map((col, cIdx) => (cIdx === move.col ? (isX ? 'X' : 'O') : col)) : row
  )
  return { ...state, board, move }
}

export const handleGameOver = (state: GameState, action: ActionGameOver): GameState => {
  return { ...state, isGameOver: true, winningPath: action.winningPath }
}

export const handleNextTurn = (state: GameState): GameState => {
  return { ...state, isX: !state.isX, turn: state.turn + 1 }
}
