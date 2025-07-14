import './styles/index.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer/Footer.tsx'
import { AuthProvider } from './Context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)