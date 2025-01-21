import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { GameMode, GameModeType } from './../types'
import { getFromLocalStorage, saveToLocalStorage } from './../utils'
import { GAME_MODE_STORAGE_KEY } from './../config/config'

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

  useEffect(() => {
    const localGameMode = getFromLocalStorage<GameModeType>(GAME_MODE_STORAGE_KEY)
    localGameMode && setGameMode(localGameMode)
  }, [])

  const handleSetGameMode = (newGameMode: GameModeType) => {
    setGameMode(() => {
      saveToLocalStorage(GAME_MODE_STORAGE_KEY, newGameMode)
      return newGameMode
    })
  }

  return <GameModeContext.Provider value={{ gameMode, handleSetGameMode }}>{children}</GameModeContext.Provider>
}

export const useGameModeContext = () => useContext(GameModeContext)
