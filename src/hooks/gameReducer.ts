import { GameState, GameAction, ActionType } from '../types'
import { handleReset, handleMove, handleCheck, handleNext } from './gameAction'

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionType.Reset:
      return handleReset(action)
    case ActionType.Move:
      return handleMove(state, action)
    case ActionType.Check:
      return handleCheck(state, action)
    case ActionType.Next:
      return handleNext(state)
    default:
      return state
  }
}
