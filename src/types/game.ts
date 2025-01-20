import { Setting } from './setting'

export type Move = {
  row: number
  col: number
}

export type BoardType = string[][]

export type PlayState = {
  turn: number
  isX: boolean
  isGameOver: boolean
  move: Move | null
  winningPath: Move[] | null
}

export type GameState = {
  setting: Setting
  board: BoardType
  play: PlayState
  logs: PlayState[] | null
}

export enum ActionType {
  Reset = 'RESET',
  Move = 'MOVE',
  Check = 'CHECK',
  Next = 'NEXT',
  MoveCheck = 'MoveCheck',
}

export type Action<ActionType extends string, Payload = undefined> = Payload extends undefined
  ? { type: ActionType }
  : { type: ActionType; payload: Payload }

export type ActionPayload = { setting: Setting | null; move: Move | null; isX: boolean | null }

export type GameAction =
  | Action<ActionType.Reset, ActionPayload>
  | Action<ActionType.Move, ActionPayload>
  | Action<ActionType.Check, ActionPayload>
  | Action<ActionType.Next>
  | Action<ActionType.MoveCheck, ActionPayload>
