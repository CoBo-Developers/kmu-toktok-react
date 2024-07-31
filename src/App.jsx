import './App.css'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/aside/Aside'
import Login from './routes/Login';
import Redirect from './routes/Redirect';
import useShowAside from './hooks/useShowAside';
import Register from './routes/Register';
import useReissue from './hooks/useReissue';
import ChatProf from './routes/ChatProf';

function App() {
  const showAside = useShowAside();
  useReissue();

  return (
    <div className="page">
      {
        showAside ? <Aside /> : null
      }      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={""} />
        <Route path="/chatprof" element={<ChatProf/>} />
        <Route path="/file" element={""} />
        <Route path="/writing" element={""} />
        <Route path="/redirect/:option" element={<Redirect />} />
      </Routes>
    </div>
  )
}

export default App
