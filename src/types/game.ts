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
  lastMove: Move | null
  winningPath: Move[] | null
}

export enum ActionType {
  Reset = 'RESET',
  Move = 'MOVE',
  Check = 'CHECK',
  Next = 'NEXT',
  End = 'END',
}
export type Action<ActionType extends string, Payload = undefined> = Payload extends undefined
  ? { type: ActionType }
  : { type: ActionType; payload: Payload }

export type GameAction =
  | Action<ActionType.Reset, { setting: Setting }>
  | Action<ActionType.Move, { lastMove: Move; isX: boolean }>
  | Action<ActionType.Check, { setting: Setting; lastMove: Move }>
  | Action<ActionType.Next>
