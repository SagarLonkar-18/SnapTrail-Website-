import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { TrailProvider } from './context/TrailContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TrailProvider>
        <App />
      </TrailProvider>
    </UserProvider>
  </StrictMode>,
)
