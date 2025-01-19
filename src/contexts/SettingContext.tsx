import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SETTING_STORAGE_KEY, DEFAULT_SETTING } from './../config'
import { Setting } from './../types/setting'
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

  useEffect(() => {
    const localSetting = getFromLocalStorage<Setting>(SETTING_STORAGE_KEY)
    localSetting && setSetting(localSetting)
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
      {children}
    </SettingContext.Provider>
  )
}

export const useSettingContext = () => useContext(SettingContext)
