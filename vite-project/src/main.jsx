import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SovaProvider, VijestProvider } from './VijestContext';
import './index.css'
import App from './App.jsx'
import './header.css'
import './profile.css'
import './categories.css'
import './glavna-vijest.css'
import './myblogs.css'
import './malevijesti.css'
import './make-post.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VijestProvider>
      <SovaProvider>
        <App />
      </SovaProvider>
    </VijestProvider>
  </StrictMode>,
)
