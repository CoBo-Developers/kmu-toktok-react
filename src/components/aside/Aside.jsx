import './Aside.css';
import tagIcon from '../../assets/icons/tag-icon.png';
import chatIcon from '../../assets/icons/chat-icon.png';
import personIcon from '../../assets/icons/person-icon.png';
import fileIcon from '../../assets/icons/file-icon.png';
import writingIcon from '../../assets/icons/writing-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import useCurrentPath from '../../hooks/useCurrentPath';

function Aside() {
  const currentPath = useCurrentPath();
  const navigate = useNavigate();

  const handleLogout = () => {
    const cookies = ['accessToken', 'refreshToken', 'isActive'];
  
    cookies.forEach(cookie => {
      document.cookie = `${cookie}=; path=/; max-age=0`;
    });
  
    navigate('/');
  };

  return (
    <aside>
      <section className='aside-menu'>
        <h1 className='aside-title'>kmu<br/>toktok-.</h1>
        <section className='aside-user-info'>
          <img className='aside-user-info-icon' src={tagIcon} alt="tag-icon" />
          <article className='aside-user-info-content'>
            <span className='aside-id'>2022123455</span>
            <span className='aside-logout' onClick={handleLogout}>로그아웃</span>
          </article>
        </section>
        <ul className='aside-menus'>
          <li className={'aside-menus-item ' + (currentPath === 'chatbot' ? 'active' : 'null')}>
            <Link to='/chatbot'>
              <img src={chatIcon} alt="chat-icon" />
              <span>챗봇과 대화하기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'chatprof' ? 'active' : 'null')}>
            <Link to='/chatprof'>
              <img src={personIcon} alt="person-icon" />
              <span>교수님과 대화하기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'file' ? 'active' : 'null')}>
            <Link to='/file'>
              <img src={fileIcon} alt="file-icon" />
              <span>파일 목록 보기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'writing' ? 'active' : 'null')}>
            <Link to='/writing'>
              <img src={writingIcon} alt="writing-icon" />
              <span>나의 글쓰기</span>
            </Link>
          </li>
        </ul>
      </section>
      <section>

      </section>
    </aside>
  )
}

export default Aside;