import { Setting } from './setting'

export type Move = {
  row: number
  col: number
}

export type BoardState = string[][]

export type PlayState = {
  turn: number
  isX: boolean
  isGameOver: boolean
  move: Move | null
  winningPath: Move[] | null
}

export type GameState = {
  setting: Setting
  board: BoardState
  play: PlayState
  logs: PlayState[] | null
}

export enum ActionType {
  Reset = 'RESET',
  Move = 'MOVE',
  Check = 'CHECK',
  Next = 'NEXT',
}

export type Action<ActionType extends string, Payload = undefined> = Payload extends undefined
  ? { type: ActionType }
  : { type: ActionType; payload: Payload }

export type GameAction =
  | Action<ActionType.Reset, { setting: Setting }>
  | Action<ActionType.Move, { move: Move; isX: boolean }>
  | Action<ActionType.Check, { setting: Setting; move: Move }>
  | Action<ActionType.Next>
