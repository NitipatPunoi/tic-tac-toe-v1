import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { GameMode, GameModeType } from '../types'
import { getFromLocalStorage, saveToLocalStorage } from '../utils'
import { GAME_MODE_STORAGE_KEY } from '../config/config'
import Loading from '../components/SpinnerLoader'

type GameModeContextType = {
  gameMode: GameMode
  handleSetGameMode: (gameMode: GameMode) => void
}
const GameModeContext = createContext<GameModeContextType>({
  gameMode: GameModeType.Default,
  handleSetGameMode: () => {},
})

export const GameModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameMode, setGameMode] = useState<GameMode>(GameModeType.Default)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const localGameMode = getFromLocalStorage<GameModeType>(GAME_MODE_STORAGE_KEY)
    if (localGameMode) {
      setGameMode(localGameMode)
    }
    setIsLoading(false)
  }, [])

  const handleSetGameMode = (newGameMode: GameModeType) => {
    setGameMode(() => {
      saveToLocalStorage(GAME_MODE_STORAGE_KEY, newGameMode)
      return newGameMode
    })
  }

  return (
    <GameModeContext.Provider value={{ gameMode, handleSetGameMode }}>
      {isLoading ? <Loading /> : children}
    </GameModeContext.Provider>
  )
}

export const useGameModeContext = () => useContext(GameModeContext)
