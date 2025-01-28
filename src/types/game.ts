import { Player } from './player'
import { Setting } from './setting'

export type Move = {
  row: number
  col: number
}

export type Board = string[][]

export type Turn = {
  number: number
  symbol: string
}

export type Log = Turn & {
  move: Move
}

export type Result = {
  isGameOver: boolean
  winningPath?: Move[]
}

export type GameState = {
  setting: Setting
  players: Player[]
  board: Board
  turn: Turn
  logs?: Log[]
  result: Result
}

export enum ActionType {
  RESET = 'RESET',
  MOVE = 'MOVE',
}

export type Action<T extends ActionType, P = undefined> = P extends undefined ? { type: T } : { type: T; payload: P }

export type MovePayload = { move: Move; symbol: string }

export type GameAction = Action<ActionType.RESET> | Action<ActionType.MOVE, MovePayload>
