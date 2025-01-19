// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Board } from './../../components/Board'
import { Button } from './../../components/UIElement'
import { useSettingContext } from '../../contexts'
import { ActionType } from './../../types'
import { useGameReducer } from '../../hooks'

const PlayScreen = () => {
  const { setting } = useSettingContext()
  const { state, dispatch } = useGameReducer(setting)

  const handleClick = (row: number, col: number) => {
    if (!state.isGameOver && !state.board[row][col]) {
      dispatch({
        type: ActionType.Move,
        payload: { lastMove: { row, col }, isX: state.isX },
      })

      dispatch({
        type: ActionType.Check,
        payload: { setting, lastMove: { row, col } },
      })

      if (!state.isGameOver) {
        dispatch({ type: ActionType.Next })
      }
    }
  }

  const handleResetGame = () => {
    dispatch({ type: ActionType.Reset, payload: { setting } })
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full h-full text-center text-2xl sm:text-3xl font-bold">
        <span className="text-textLightBlue">TIC</span>-<span className="text-textDeepBlue">TAC</span>-
        <span className="text-textRed">TOE</span>
      </div>
      <div className="w-fit mx-auto">
        <div className="flex flex-row justify-between">
          <span>turn {`${state.turn}`}</span>
          <span>
            <span className={`${state.isX ? 'x-mark' : 'o-mark'} px-1`}>{`${state.isX ? 'X' : 'O'}`}</span>
            play
          </span>
        </div>
        <Board board={state.board} lastMove={state.lastMove} winningPath={state.winningPath} onClick={handleClick} />
      </div>
      <div className="grid grid-rows gap-6 w-2/3 md:w-1/2 lg:w-1/3 h-full mx-auto px-0 sm:px-5 md:px-10 py-10 text-center">
        <Button text="Reset" onClick={handleResetGame} />
        <Link to="/" className="text-nowrap">
          <Button text="Back to Main Menu" />
        </Link>
      </div>
    </div>
  )
}

export default PlayScreen
