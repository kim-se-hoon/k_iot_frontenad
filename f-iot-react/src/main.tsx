import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import { ThemeProvider } from 'styled-components'
import { theme } from './pages/f_style/C_StyleComponents.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {/* 스타일 컴포넌트 내부의 전역 스타일 데이터를 공유 */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>, 
  // <StrictMode></StrictMode> // 이거 때문에 개발자 모드(F12)에서 오류남 하나하나다 세밀하게 오류 잡아주기 때문
)