import { Setting, BoardSize, GameState, GameAction, ActionType } from '../types'
import { handleReset, handleMove, handleGameOver, handleNextTurn } from './gameAction'

const initBoard = (boardSize: BoardSize): string[][] =>
  Array(boardSize.rows)
    .fill(null)
    .map(() => Array(boardSize.cols).fill(null))

export const initGameState = (setting: Setting): GameState => {
  const boardSize = setting.boardSize
  return {
    board: initBoard(boardSize),
    turn: 1,
    isX: true,
    isGameOver: false,
    move: null,
    winningPath: [],
  }
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionType.Reset:
      return handleReset(action)
    case ActionType.Move:
      return handleMove(state, action)
    case ActionType.GameOver:
      return handleGameOver(state, action)
    case ActionType.NextTurn:
      return handleNextTurn(state)
    default:
      return state
  }
}
