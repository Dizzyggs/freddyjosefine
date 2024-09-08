

import { Routes, Route } from 'react-router'
import Home from './assets/Home/Home'
import OSA from './assets/OSA/OSA'
import Info from './assets/Info/Info'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/osa" element={<OSA/>}/>
        <Route path="/info" element={<Info/>}/>
      </Routes>
    </>
  )
}

export default App
