import './App.css'
import tagIcon from './assets/icons/tag-icon.png'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='page'>
      <aside>
        <section className='aside-menu'>
          <h1 className='aside-title'>kmu<br/>toktok-.</h1>
          <section className='aside-user-info'>
            <img className='aside-user-info-icon' src={tagIcon} alt="tag-icon" />
            <article className='aside-user-info-content'>
              <span className='aside-id'>2022123455</span>
              <span className='aside-logout'>로그아웃</span>
            </article>
          </section>
        </section>
        <section>

        </section>
      </aside>
      <Routes>
        <Route />
      </Routes>
    </div>
  )
}

export default App
