import './App.css'
import Basic from '@/pages/a_basic';
import { Img } from './pages/a_basic/C_Component';
import { ExampleComponent } from './pages/a_basic/F_Review';

function App() {
  return (
    <>
      <h1>안녕하세요 첫 리액트입니다 :)</h1>
      <Basic />
      {/* <ExampleComponent /> */}
    </>
  )
}

export default App