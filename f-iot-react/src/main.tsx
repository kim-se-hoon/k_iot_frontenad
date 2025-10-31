import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>, 
  // <StrictMode></StrictMode> // 이거 때문에 개발자 모드(F12)에서 오류남 하나하나다 세밀하게 오류 잡아주기 때문
)