import { Link } from 'react-router-dom'
import { Button } from './UIElement/Button'
import { useGameModeContext } from './../contexts'
import { GameModeType } from './../types'

export const MainMenu = () => {
  const { handleSetGameMode } = useGameModeContext()
  return (
    <div className="grid grid-rows gap-6 w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
      <h1 className="text-center">Main Menu</h1>
      <Link to="/play">
        <Button text="Single Player" onClick={() => handleSetGameMode(GameModeType.SinglePlayer)} />
      </Link>
      <Link to="/play">
        <Button text="Multi-Player" onClick={() => handleSetGameMode(GameModeType.MultiPlayer)} />
      </Link>
      <Link to="/settings">
        <Button text="Settings" />
      </Link>
      <Link to="/credits">
        <Button text="Credits" />
      </Link>
    </div>
  )
}
