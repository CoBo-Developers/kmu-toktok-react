import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './routes/Login/Login';
import Aside from './components/Aside/AsideMenu/Aside';
import Redirect from './routes/Redirect/Redirect';
import Register from './routes/Register/Register';
import useShowAside from './components/Aside/AsideMenu/hooks/useShowAside';
import Chatbot from './routes/Chatbot/Chatbot';
import useReissue from './hooks/useReissue';
import File from './routes/File/File';
import ChatProf from './routes/ChatProf/ChatProf';
import Writing from './routes/Writing/Writing';
import useShowAlarm from './components/Aside/AsideMenu/hooks/useShowAlarm';

function App() {
  const showAside = useShowAside();
  useReissue();
  useShowAlarm();

  return (
    <div className="page">
      {
        showAside ? <Aside /> : null
      }      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/chatprof" element={<ChatProf/>} />
        <Route path="/file" element={<File/>} />
        <Route path="/writing" element={<Writing />}>
          <Route path=":writingId" element={<Writing />} />
        </Route>
        <Route path="/redirect/:option" element={<Redirect />} />
      </Routes>
    </div>
  )
}

export default App