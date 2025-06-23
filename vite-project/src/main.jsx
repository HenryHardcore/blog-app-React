import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SovaProvider, VijestProvider, EditBlogProvider } from './VijestContext';
import './index.css'
import App from './App.jsx'
import './header.css'
import './profile.css'
import './categories.css'
import './glavna-vijest.css'
import './myblogs.css'
import './malevijesti.css'
import './make-post.css'
import './app.css'
import './ligin-form.css'
import { AuthProvider } from './auth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VijestProvider>
      <SovaProvider>
        <EditBlogProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </EditBlogProvider>
      </SovaProvider>
    </VijestProvider>
  </StrictMode>,
)
