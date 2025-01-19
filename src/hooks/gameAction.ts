import { Move, GameState, Action, ActionType, Setting } from '../types'
import { checkWinner, checkPlayable } from '../utils'

export const initGameState = (setting: Setting): GameState => {
  const initBoard = Array(setting.boardSize.rows)
    .fill(null)
    .map(() => Array(setting.boardSize.cols).fill(null))

  return {
    board: initBoard,
    turn: 1,
    isX: true,
    isGameOver: false,
    lastMove: null,
    winningPath: [],
  }
}

export const handleReset = (action: Action<ActionType.Reset, { setting: Setting }>): GameState => {
  const setting = action.payload.setting
  return initGameState(setting)
}

export const handleMove = (
  state: GameState,
  action: Action<ActionType.Move, { lastMove: Move; isX: boolean }>
): GameState => {
  const { lastMove, isX } = action.payload
  const board = state.board.map((row, rIdx) =>
    rIdx === lastMove.row ? row.map((col, cIdx) => (cIdx === lastMove.col ? (isX ? 'X' : 'O') : col)) : row
  )
  return { ...state, board, lastMove }
}

export const handleCheck = (
  state: GameState,
  action: Action<ActionType.Check, { setting: Setting; lastMove: Move }>
): GameState => {
  const setting = action.payload.setting
  const checkThreshold = 2 * setting.winningCondition - 1
  if (state.turn >= checkThreshold) {
    const board = state.board
    const { isWinning, winningPath } = checkWinner(board, action.payload.lastMove, setting.winningCondition)

    if (isWinning) {
      return { ...state, isGameOver: true, winningPath }
    }

    const isPlayable = checkPlayable(board)
    if (!isPlayable) return { ...state, isGameOver: true }
  }
  return state
}

export const handleNext = (state: GameState): GameState => {
  const isX = !state.isX
  const turn = state.turn + 1
  return { ...state, isX, turn }
}
