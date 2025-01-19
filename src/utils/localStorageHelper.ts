export const getFromLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key)
  return value ? (JSON.parse(value) as T) : null
}

export const saveToLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}
