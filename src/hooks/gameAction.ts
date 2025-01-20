import { Setting, PlayState, GameState, Action, ActionType, ActionPayload } from './../types'
import { checkWinner, checkPlayable } from './../utils'

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

export const actionReset = (state: GameState, action: Action<ActionType.Reset, ActionPayload>): GameState =>
  initGameState(action.payload.setting ?? state.setting)

export const actionMove = (state: GameState, action: Action<ActionType.Move, ActionPayload>): GameState => {
  const { move, isX } = action.payload
  if (!move || isX === null) {
    return state
  }
  const board = state.board.map((boardRow, row) =>
    row === move.row ? boardRow.map((cell, col) => (col === move.col ? (isX ? 'X' : 'O') : cell)) : boardRow
  )
  return { ...state, board, play: { ...state.play, move } }
}

export const actionCheck = (state: GameState, action: Action<ActionType.Move, ActionPayload>): GameState => {
  const { setting, move } = action.payload
  if (!setting || !move) {
    return state
  }
  const checkThreshold = 2 * setting.winningCondition - 1
  if (state.play.turn >= checkThreshold) {
    const board = state.board
    const { isWinning, winningPath } = checkWinner(board, move, setting.winningCondition)

    if (isWinning) return { ...state, play: { ...state.play, isGameOver: true, winningPath } }

    const isPlayable = checkPlayable(board)
    if (!isPlayable) return { ...state, play: { ...state.play, isGameOver: true } }
  }
  return state
}

export const actionLog = (state: GameState): GameState => {
  const logs = state.logs ? [...state.logs, state.play] : [state.play]
  return { ...state, logs }
}

export const actionNext = (state: GameState): GameState => {
  const turn = state.play.turn + 1
  const isX = !state.play.isX
  return { ...state, play: { ...state.play, turn, isX, move: null } }
}
