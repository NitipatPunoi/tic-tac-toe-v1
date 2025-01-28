import { Move, Log } from '../types'

export const getStepsBack = (logs: Log[] | undefined, stepsBack: number = 1): Move | null =>
  logs !== undefined && logs.length >= stepsBack ? logs[logs.length - stepsBack].move : null
