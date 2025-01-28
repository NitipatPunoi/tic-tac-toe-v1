import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Board } from '../../components/Board'
import { Button, Modal } from '../../components/UIElement'
import { useSettingContext, useGameModeContext } from '../../contexts'
import { useGameReducer } from '../../hooks'
import { Move, ActionType, GameModeType, Player } from '../../types'
import { makeDecision } from '../../utils'

const PlayScreen = () => {
  const { gameMode } = useGameModeContext()
  const { setting } = useSettingContext()
  const players: Player[] = [{ symbol: 'X' }, { symbol: 'O' }]
  const { state, dispatch } = useGameReducer(setting, players)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isBotPlay, setIsBotPlay] = useState(false)
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    if (state.result.isGameOver) {
      setTimeout(() => {
        setModalOpen(true)
      }, 300)
    }
  }, [state.result.isGameOver])

  useEffect(() => {
    if (isBotPlay) {
      const decisionLevel = 2
      const botDecision = makeDecision(state, decisionLevel)

      const min = 300
      const max = 800
      const timeout = Math.floor(Math.random() * (max - min)) + min

      setTimeout(() => {
        botDecision && handleMove(botDecision.row, botDecision.col)
      }, timeout)
    }
  }, [isBotPlay])

  const handleMove = (row: number, col: number) => {
    const move: Move = { row, col }
    const symbol: string = state.turn.symbol

    if (!state.result.isGameOver && !state.board[row][col]) {
      dispatch({
        type: ActionType.MOVE,
        payload: { move, symbol },
      })

      if (!stateRef.current.result.isGameOver && gameMode === GameModeType.SinglePlayer)
        setIsBotPlay((prevIsBotPlay) => !prevIsBotPlay)
    }
  }

  const handleClick = (row: number, col: number) => {
    if (isBotPlay) return
    handleMove(row, col)
  }

  const handleReset = () => {
    setIsBotPlay(false)
    dispatch({ type: ActionType.RESET })
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full h-full text-center text-2xl sm:text-3xl font-bold">
        <span className="text-textLightBlue">TIC</span>-<span className="text-textDeepBlue">TAC</span>-
        <span className="text-textRed">TOE</span>
      </div>
      <div className="w-fit mx-auto">
        <div className="flex flex-row justify-between">
          <span>turn {`${state.turn.number}`}</span>
          <span>
            <span className={`${state.turn.symbol.toLowerCase() + '-mark'} px-1`}>{`${state.turn.symbol}`}</span>
            play
          </span>
        </div>
        <Board state={state} onClick={handleClick} />
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
          <p className="mt-4">{state.result.winningPath ? `win is ${state.turn.symbol}` : 'draw'}</p>
          <div className="mt-4 flex justify-around">
            <Button text="Close" onClick={handleCloseModal} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PlayScreen
