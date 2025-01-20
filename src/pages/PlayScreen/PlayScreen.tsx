import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Board } from './../../components/Board'
import { Button, Modal } from './../../components/UIElement'
import { useSettingContext, useGameModeContext } from '../../contexts'
import { useGameReducer } from '../../hooks'
import { Move, ActionType, GameModeType } from './../../types'

const PlayScreen = () => {
  const { gameMode } = useGameModeContext()
  const { setting } = useSettingContext()
  const { state, dispatch } = useGameReducer(setting)
  const [isModalOpen, setModalOpen] = useState(false)
  const stateRef = useRef(state)
  const [isBotPlay, setIsBotPlay] = useState(false)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    handleReset()
  }, [setting])

  useEffect(() => {
    if (state.play.isGameOver) {
      setModalOpen(true)
    }
  }, [state.play.isGameOver])

  const handleMove = (row: number, col: number) => {
    const move: Move = { row, col }
    const isX: boolean = state.play.isX
    if (!state.play.isGameOver && !state.board[row][col]) {
      dispatch({
        type: ActionType.Move,
        payload: { setting, move, isX },
      })
      if (!stateRef.current.play.isGameOver) {
        gameMode === GameModeType.SinglePlayer && setIsBotPlay((prevIsBotPlay) => !prevIsBotPlay)
      }
    }
  }

  const handleClick = (row: number, col: number) => {
    if (isBotPlay) return
    handleMove(row, col)
  }

  const handleReset = () => {
    setIsBotPlay(false)
    dispatch({ type: ActionType.Reset, payload: { setting, move: null, isX: null } })
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const getRandomMove = (): { row: number; col: number } | null => {
    const availableMoves: { row: number; col: number }[] = []

    state.board.forEach((boardRow, row) => {
      boardRow.forEach((cell, col) => {
        if (cell === null) {
          availableMoves.push({ row, col })
        }
      })
    })

    if (availableMoves.length === 0) {
      return null
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length)
    return availableMoves[randomIndex]
  }

  if (isBotPlay) {
    // Bot Make Decision
    const randMove = getRandomMove()
    if (randMove !== null) handleMove(randMove.row, randMove.col)
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full h-full text-center text-2xl sm:text-3xl font-bold">
        <span className="text-textLightBlue">TIC</span>-<span className="text-textDeepBlue">TAC</span>-
        <span className="text-textRed">TOE</span>
      </div>
      <div className="w-fit mx-auto">
        <div className="flex flex-row justify-between">
          <span>turn {`${state.play.turn}`}</span>
          <span>
            <span className={`${state.play.isX ? 'x-mark' : 'o-mark'} px-1`}>{`${state.play.isX ? 'X' : 'O'}`}</span>
            play
          </span>
        </div>
        <Board board={state.board} move={state.play.move} winningPath={state.play.winningPath} onClick={handleClick} />
      </div>
      <div className="grid grid-rows gap-6 w-2/3 md:w-1/2 lg:w-1/3 h-full mx-auto px-0 sm:px-5 md:px-10 py-10 text-center">
        <Button text="Reset" onClick={handleReset} />
        <Link to="/" className="text-nowrap">
          <Button text="Back to Main Menu" />
        </Link>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div>
          <h2 className="text-3xl font-bold">Game Over!</h2>
          <p className="mt-4">win is {`${state.play.isX ? 'X' : 'O'} ${state.play.turn}`}</p>
          <div className="mt-4 flex justify-around">
            <Button text="Close" onClick={handleCloseModal} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PlayScreen
