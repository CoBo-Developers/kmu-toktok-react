import './App.css'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/aside/Aside'
import Login from './routes/Login';
import useShowAside from './hooks/useShowAside';
import Register from './routes/Register';

function App() {
  const showAside = useShowAside();

  return (
    <div className="page">
      {
        showAside ? <Aside /> : null
      }      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={""} />
        <Route path="/chatprof" element={""} />
        <Route path="/file" element={""} />
        <Route path="/writing" element={""} />
      </Routes>
    </div>
  )
}

export default App
