import { Link } from 'react-router-dom'
import { Button } from './../../components/UIElement'

const CreditScreen = () => {
  return (
    <div className="grid grid-rows gap-6 w-2/3 md:w-1/2 lg:w-1/3 h-full mx-auto px-0 sm:px-5 md:px-10 py-10 text-center">
      <h1>Credits</h1>
      <h3>Game Designer</h3>
      <p className="text-textDeepBlue">Nitipat Punoi</p>
      <h3>Game Coding</h3>
      <p className="text-textDeepBlue">Nitipat Punoi</p>
      <h3>Game Tester</h3>
      <p className="text-textDeepBlue">Nitipat Punoi</p>
      <Link to="/" className="text-nowrap">
        <Button text="Back to Main Menu" />
      </Link>
    </div>
  )
}

export default CreditScreen
