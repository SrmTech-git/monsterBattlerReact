import { useState } from 'react'

import './App.css'
import HomePage from './Views/HomePage/HomePage/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import MainNav from './Components/MainNav/MainNav'
import BattlePage from './Views/BattlePage/BattlePage'
import MonsterPage from './Views/MonsterPage/MonsterTeamPage'
import CreateMonster from './Components/CreateMonster/CreateMonster'
import CreateCustomMonster from './Components/CreateCustomMonster/CreateCustomMonster'

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
          <Route path='/create' element={<CreateMonster/>} />
          <Route path='/create-custom' element={<CreateCustomMonster/>} />
          <Route path='/battle' element={<BattlePage/>} />
          <Route path='/team' element={<MonsterPage/>} />
          
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
