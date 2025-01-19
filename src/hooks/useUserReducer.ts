import { GameState, GameAction, ActionType } from '../types'
import { handleReset, handleMove } from './gameAction'

export const userReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionType.Reset:
      return handleReset()
    case ActionType.Move:
      return handleMove(state, action)
    default:
      return state
  }
}
