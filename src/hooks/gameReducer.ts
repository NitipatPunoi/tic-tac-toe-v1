import { GameState, GameAction, ActionType } from '../types'
import { actionReset, actionMove, actionCheck, actionLog, actionNext } from './gameAction'

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionType.Reset:
      return actionReset(state, action)
    case ActionType.Move:
      let gameState = state
      gameState = actionMove(gameState, action)
      gameState = actionCheck(gameState, action)
      gameState = actionLog(gameState)
      return !gameState.play.isGameOver ? actionNext(gameState) : gameState
    default:
      return state
  }
}
