import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VijestProvider } from './VijestContext';
import './index.css'
import App from './App.jsx'
import './header.css'
import './profile.css'
import './categories.css'
import './glavna-vijest.css'
import './myblogs.css'
import './malevijesti.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VijestProvider>
      <App />
    </VijestProvider>
  </StrictMode>,
)
