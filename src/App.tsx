import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header, Footer } from './components/layouts'
import { HomeScreen, PlayScreen, SettingScreen, CreditScreen } from './pages'
import './assets/global.css'

const App = () => {
  const location = useLocation()

  const page = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  }

  return (
    <div className="grid grid-rows-[1fr_18fr_1fr] h-screen min-h-fit bg-primary font-pressStart text-xs">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={page.initial}
          animate={page.animate}
          exit={page.exit}
          transition={page.transition}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/play" element={<PlayScreen />} />
            <Route path="/settings" element={<SettingScreen />} />
            <Route path="/credits" element={<CreditScreen />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
