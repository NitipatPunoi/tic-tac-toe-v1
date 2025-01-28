import { Setting, Player, Board, Turn, Log, Result, GameState, Action, ActionType, MovePayload } from '../types'
import { findWinner, isPlayable, getCheckResultThreshold, getNextSymbol } from '../utils'

const initialBoard = (setting: Setting): Board =>
  Array.from({ length: setting.boardSize.rows }, () => Array(setting.boardSize.cols).fill(null))

const initialTurn = (symbol: string): Turn => {
  return { number: 1, symbol }
}

const initialResult = (): Result => {
  return { isGameOver: false }
}

const updateBoard = (board: Board, payload: MovePayload): Board => {
  return board.map((cellsRow, row) =>
    row === payload.move.row
      ? cellsRow.map((cell, col) => (col === payload.move.col ? payload.symbol : cell))
      : cellsRow
  )
}

export const initialGameState = (setting: Setting, players: Player[]): GameState => {
  return {
    setting: setting,
    players: players,
    board: initialBoard(setting),
    turn: initialTurn(players[0].symbol),
    result: initialResult(),
  }
}

export const resetGameState = (setting: Setting, players: Player[]): GameState => initialGameState(setting, players)

export const makeMove = (state: GameState, action: Action<ActionType.MOVE, MovePayload>): GameState => {
  return { ...state, board: updateBoard(state.board, action.payload) }
}

export const checkResult = (state: GameState, action: Action<ActionType.MOVE, MovePayload>): Result => {
  const { isFound, winningPath } = findWinner(state.board, action.payload.move, state.setting.winningCondition)
  return isFound
    ? { ...state.result, isGameOver: true, winningPath }
    : { ...state.result, isGameOver: !isPlayable(state.board) }
}

export const checkResultWithThreshold = (state: GameState, action: Action<ActionType.MOVE, MovePayload>): Result => {
  return state.turn.number >= getCheckResultThreshold(state.setting.winningCondition)
    ? checkResult(state, action)
    : state.result
}

export const logMoved = (state: GameState, action: Action<ActionType.MOVE, MovePayload>): Log[] => {
  const log: Log = { ...state.turn, move: action.payload.move }
  return state.logs === undefined ? [log] : [...state.logs, log]
}

export const nextTurn = (state: GameState): GameState => {
  const number = state.turn.number + 1
  const symbol = getNextSymbol(state.players, state.turn.symbol)
  return { ...state, turn: { ...state.turn, number, symbol } }
}
