

import { Routes, Route } from 'react-router'
import Home from './assets/Home/Home'
import OSA from './assets/OSA/OSA'
import Info from './assets/Info/Info'
import AdminPage from './assets/AdminPage/AdminPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/osa" element={<OSA/>}/>
        <Route path="/info" element={<Info/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
      </Routes>
    </>
  )
}

export default App
