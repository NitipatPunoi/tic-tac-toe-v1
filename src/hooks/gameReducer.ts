import { GameState, GameAction, ActionType } from '../types'
import { resetGameState, makeMove, checkResultWithThreshold, logMoved, nextTurn } from './gameAction'

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionType.RESET:
      return resetGameState(state.setting, state.players)
    case ActionType.MOVE:
      let newStage = { ...state }
      newStage = makeMove(newStage, action)
      newStage.result = checkResultWithThreshold(newStage, action)
      newStage.logs = logMoved(newStage, action)
      return !newStage.result.isGameOver ? nextTurn(newStage) : newStage
    default:
      return state
  }
}
