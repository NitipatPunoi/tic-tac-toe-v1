import { Move, PlayState } from '../types'

export const getStepsBack = (logs: PlayState[] | null, stepsBack: number = 1): Move | null =>
  logs && logs.length >= stepsBack ? logs[logs.length - stepsBack].move : null
