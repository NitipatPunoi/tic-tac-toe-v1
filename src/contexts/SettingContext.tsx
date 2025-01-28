import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SETTING_STORAGE_KEY, DEFAULT_SETTING } from '../config'
import { Setting } from '../types'
import { getFromLocalStorage, saveToLocalStorage } from '../utils'

type SettingContextType = {
  setting: Setting
  handleSetPartialSetting: (partialSetting: Partial<Setting>) => void
  handleResetDefault: () => void
}

const getDefaultSetting = (): Setting => DEFAULT_SETTING

const SettingContext = createContext<SettingContextType>({
  setting: getDefaultSetting(),
  handleSetPartialSetting: () => {},
  handleResetDefault: () => {},
})

export const SettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [setting, setSetting] = useState<Setting>(getDefaultSetting())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const localSetting = getFromLocalStorage<Setting>(SETTING_STORAGE_KEY)
    if (localSetting) {
      setSetting(localSetting)
    }
    setIsLoading(false)
  }, [])

  const handleSetPartialSetting = (partialSetting: Partial<Setting>) => {
    setSetting((previousSetting) => {
      const newSetting = {
        ...previousSetting,
        ...partialSetting,
      }

      saveToLocalStorage(SETTING_STORAGE_KEY, newSetting)
      return newSetting
    })
  }

  const handleResetDefault = () => {
    const defaultSetting = getDefaultSetting()
    setSetting(defaultSetting)
    saveToLocalStorage(SETTING_STORAGE_KEY, defaultSetting)
  }

  return (
    <SettingContext.Provider value={{ setting, handleSetPartialSetting, handleResetDefault }}>
      {isLoading ? <div>Loading...</div> : children}
    </SettingContext.Provider>
  )
}

export const useSettingContext = () => useContext(SettingContext)
