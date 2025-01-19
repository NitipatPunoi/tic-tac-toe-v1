import { useEffect, useCallback, useReducer } from 'react'
import { useSettingContext } from '../contexts'
import { hasGameEnded } from '../utils'
import { gameReducer, initGameState } from './gameReducer'
import { ActionType, Move } from '../types'

export const useGameState = () => {
  const { setting } = useSettingContext()
  const [state, dispatch] = useReducer(gameReducer, initGameState(setting))

  const handleResetGame = useCallback(() => {
    dispatch({ type: ActionType.Reset, setting: setting })
  }, [setting])

  const handleMove = useCallback(
    (move: Move, isX: boolean) => {
      if (state.board[move.row][move.col] !== null) {
        return
      }
      dispatch({ type: ActionType.Move, move, isX })
    },
    [state.board]
  )

  useEffect(() => {
    dispatch({ type: ActionType.Reset, setting })
  }, [setting])

  useEffect(() => {
    if (state.move) {
      const { isGameOver, winningPath } = hasGameEnded(state.board, state.move, setting.winningCondition)

      if (isGameOver) {
        dispatch({ type: ActionType.GameOver, winningPath })
      } else {
        dispatch({ type: ActionType.NextTurn })
      }
    }
  }, [state.move, state.board, setting.winningCondition])

  return {
    gameState: state,
    handleResetGame,
    handleMove,
  }
}
