import { useReducer } from 'react'
import { gameReducer } from './gameReducer'
import { initialGameState } from './gameAction'
import { Setting, Player } from '../types'

export const useGameReducer = (setting: Setting, players: Player[]) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState(setting, players))
  return { state, dispatch }
}
