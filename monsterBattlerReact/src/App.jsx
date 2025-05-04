import { useState } from 'react'

import './App.css'
import HomePage from './Views/HomePage/HomePage/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import MainNav from './Components/MainNav/MainNav'
import BattlePage from './Views/HomePage/BattlePage'
import MonsterPage from './Views/MonsterPage/MonsterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <div className='App'>
      </div>

      <div className='app-nav'>
        <MainNav />
      </div>

      <div className='app-main'>
        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/battle' element={<BattlePage/>} />
          <Route path='/monsters' element={<MonsterPage/>} />
        </Routes>
      </div>

      <div className='app-footer'>
        <Footer />
      </div>
        </Router>
    </>
  )
}

export default App
