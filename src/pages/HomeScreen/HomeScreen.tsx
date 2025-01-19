import { MainMenu } from '../../components/MainMenu'

const HomeScreen = () => {
  return (
    <div className="grid grid-rows-[3fr_7fr] p-5">
      <div className="flex justify-center items-center w-full h-full text-center text-2xl sm:text-3xl font-bold">
        <span className="text-textLightBlue">TIC</span>-
        <span className="text-textDeepBlue">TAC</span>-
        <span className="text-textRed">TOE</span>
      </div>
      <MainMenu />
    </div>
  )
}

export default HomeScreen
