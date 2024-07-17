import './App.css'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/aside/Aside'

function App() {
  return (
    <div className='page'>
      <Aside />
      <Routes>
        <Route />
      </Routes>
    </div>
  )
}

export default App
