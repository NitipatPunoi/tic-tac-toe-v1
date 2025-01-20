import { createContext, ReactNode, useContext, useState } from 'react'
import { GameMode, GameModeType } from './../types'

type GameModeContextType = {
  gameMode: GameMode
  setGameMode: (gameMode: GameMode) => void
}
const GameModeContext = createContext<GameModeContextType>({
  gameMode: GameModeType.Default,
  setGameMode: () => {},
})

export const GameModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameMode, setGameMode] = useState<GameMode>(GameModeType.Default)
  return <GameModeContext.Provider value={{ gameMode, setGameMode }}>{children}</GameModeContext.Provider>
}

export const useGameModeContext = () => useContext(GameModeContext)
