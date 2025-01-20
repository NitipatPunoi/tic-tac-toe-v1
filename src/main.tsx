import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SettingProvider } from './contexts'
import { GameModeProvider } from './contexts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // Todo: StrictMode use only in local **not in production
  <StrictMode>
    <BrowserRouter>
      <SettingProvider>
        <GameModeProvider>
          <App />
        </GameModeProvider>
      </SettingProvider>
    </BrowserRouter>
  </StrictMode>
)
