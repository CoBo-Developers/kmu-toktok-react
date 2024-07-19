import './App.css'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/aside/Aside'
import Login from './routes/Login';
import useShowAside from './hooks/useShowAside';

function App() {
  const showAside = useShowAside();

  return (
    <div className="page">
      {
        showAside ? <Aside /> : null
      }      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatbot" />
        <Route path="/chatprof" />
        <Route path="/file" />
        <Route path="/writing" />
      </Routes>
    </div>
  )
}

export default App
