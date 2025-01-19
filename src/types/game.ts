import { Setting } from './setting'

export type Move = {
  row: number
  col: number
}

export type GameState = {
  board: string[][]
  turn: number
  isX: boolean
  isGameOver: boolean
  move: Move | null
  winningPath: Move[]
}

export enum ActionType {
  Reset = 'RESET',
  Move = 'MOVE',
  GameOver = 'GAME_OVER',
  NextTurn = 'NEXT_TURN',
}

export type ActionReset = { type: ActionType.Reset; setting: Setting }
export type ActionMove = { type: ActionType.Move; move: Move; isX: boolean }
export type ActionGameOver = { type: ActionType.GameOver; winningPath: Move[] }
export type ActionNextTurn = { type: ActionType.NextTurn }

export type GameAction = ActionReset | ActionMove | ActionGameOver | ActionNextTurn
