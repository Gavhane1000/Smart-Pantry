import { createRoot } from 'react-dom/client'
import Landing from './pages/landing.jsx'
import './global.css'
import { ThemeProvider } from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Landing/>
  </ThemeProvider>,
)
