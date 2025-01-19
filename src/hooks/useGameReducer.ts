import { useReducer } from 'react'
import { gameReducer } from './gameReducer'
import { initGameState } from './gameAction'
import { Setting } from '../types'

export const useGameReducer = (setting: Setting) => {
  const [state, dispatch] = useReducer(gameReducer, initGameState(setting))
  return { state, dispatch }
}
