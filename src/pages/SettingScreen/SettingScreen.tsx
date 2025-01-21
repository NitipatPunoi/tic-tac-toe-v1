import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/UIElement'
import { useSettingContext } from '../../contexts'
import { Setting } from '../../types'

const Settingcreen = () => {
  const { setting, handleSetPartialSetting, handleResetDefault } = useSettingContext()
  const rowsRef = useRef<HTMLInputElement>(null)
  const colsRef = useRef<HTMLInputElement>(null)
  const winningConditionRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (rowsRef.current) rowsRef.current.valueAsNumber = setting.boardSize.rows
    if (colsRef.current) colsRef.current.valueAsNumber = setting.boardSize.cols
    if (winningConditionRef.current) {
      winningConditionRef.current.valueAsNumber = setting.winningCondition
    }
  }, [setting])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const rows = rowsRef.current?.valueAsNumber ?? setting.boardSize.rows
    const cols = colsRef.current?.valueAsNumber ?? setting.boardSize.cols
    const winningCondition = winningConditionRef.current?.valueAsNumber ?? setting.winningCondition

    const maxWinningCondition = Math.min(rows, cols)

    const validWinningCondition = winningCondition > maxWinningCondition ? maxWinningCondition : winningCondition

    const partialSetting: Partial<Setting> = {}
    if (rows !== setting.boardSize.rows || cols !== setting.boardSize.cols) {
      partialSetting.boardSize = {
        rows,
        cols,
      }
    }
    validWinningCondition !== setting.winningCondition && (partialSetting.winningCondition = validWinningCondition)

    Object.keys(partialSetting).length > 0 && handleSetPartialSetting(partialSetting)
  }

  return (
    <div className="grid grid-rows gap-6 w-2/3 md:w-1/2 lg:w-1/3 h-full mx-auto px-0 sm:px-5 md:px-10 py-10 text-center">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit} className="grid grid-rows gap-6 sm:gap-4 pb-5">
        <div className="grid grid-row sm:grid-cols-2 gap-2 sm:gap-4 items-end">
          <label htmlFor="settingRows" className="sm:pb-1 text-left text-nowrap">
            Board Size
          </label>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid">
              <p className="text-left sm:text-center">Rows</p>
              <input
                ref={rowsRef}
                name="settingRows"
                type="number"
                min="3"
                max="10"
                defaultValue={setting.boardSize.rows}
                className="w-full"
              />
            </div>
            <div className="grid">
              <p className="text-left sm:text-center">Cols</p>
              <input
                ref={colsRef}
                name="settingCols"
                type="number"
                min="3"
                max="10"
                defaultValue={setting.boardSize.cols}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-row sm:grid-cols-2 gap-2 sm:gap-4 items-end">
          <label htmlFor="settingWin" className="sm:pb-1 text-left text-nowrap">
            Win Condition
          </label>
          <input
            ref={winningConditionRef}
            name="settingWin"
            type="number"
            min="3"
            max="10"
            defaultValue={setting.winningCondition}
          />
        </div>
        <div className="grid grid-rows sm:grid-cols-2 gap-4 h-fit">
          <Button text="Reset Default" onClick={handleResetDefault} type="button" />
          <Button text="Apply" type="submit" />
        </div>
      </form>

      <Link to="/" className="text-nowrap">
        <Button text="Back to Main Menu" />
      </Link>
    </div>
  )
}

export default Settingcreen
