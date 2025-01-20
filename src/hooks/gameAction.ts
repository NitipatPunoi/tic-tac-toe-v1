import { Move, PlayState, GameState, Action, ActionType, Setting } from '../types'
import { checkWinner, checkPlayable } from '../utils'

export const initGameState = (setting: Setting): GameState => {
  const board = Array(setting.boardSize.rows)
    .fill(null)
    .map(() => Array(setting.boardSize.cols).fill(null))

  const play: PlayState = {
    turn: 1,
    isX: true,
    isGameOver: false,
    move: null,
    winningPath: null,
  }

  return { setting, board, play, logs: null }
}

export const handleReset = (action: Action<ActionType.Reset, { setting: Setting }>): GameState =>
  initGameState(action.payload.setting)

export const handleMove = (
  state: GameState,
  action: Action<ActionType.Move, { move: Move; isX: boolean }>
): GameState => {
  const { move, isX } = action.payload
  const board = state.board.map((row, rIdx) =>
    rIdx === move.row ? row.map((col, cIdx) => (cIdx === move.col ? (isX ? 'X' : 'O') : col)) : row
  )
  return { ...state, board, play: { ...state.play, move } }
}

export const handleCheck = (
  state: GameState,
  action: Action<ActionType.Check, { setting: Setting; move: Move }>
): GameState => {
  const setting = action.payload.setting
  const checkThreshold = 2 * setting.winningCondition - 1
  if (state.play.turn >= checkThreshold) {
    const board = state.board
    const { isWinning, winningPath } = checkWinner(board, action.payload.move, setting.winningCondition)

    if (isWinning) return { ...state, play: { ...state.play, isGameOver: true, winningPath } }

    const isPlayable = checkPlayable(board)
    if (!isPlayable) return { ...state, play: { ...state.play, isGameOver: true } }
  }
  return state
}

export const handleNext = (state: GameState): GameState => {
  const logs = state.logs ? [...state.logs, state.play] : [state.play]
  const turn = state.play.turn + 1
  const isX = !state.play.isX
  return { ...state, play: { ...state.play, turn, isX, move: null }, logs }
}
