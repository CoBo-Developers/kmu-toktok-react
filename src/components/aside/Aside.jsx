import { useState } from 'react';
import './Aside.css';
import { useCookies } from 'react-cookie';
import tagIcon from '../../assets/icons/tag-icon.png';
import chatIcon from '../../assets/icons/chat-icon.png';
import personIcon from '../../assets/icons/person-icon.png';
import fileIcon from '../../assets/icons/file-icon.png';
import writingIcon from '../../assets/icons/writing-icon.png';
import mobileAsideIcon from '../../assets/icons/mobile-aside-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import useCurrentPath from '../../hooks/useCurrentPath';
import useLastCommentStore from '../../store/useLastCommenStore';
import useShowExtend from '../../hooks/useShowExtend';
import WritingMenu from './WritingMenu/WritingMenu';
import useIsMobile from '../../hooks/useIsMobile';
import FileMenu from './FileMenu/FileMenu';

function Aside() {
  const [cookies] = useCookies(['studentId']);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const currentPath = useCurrentPath();
  const navigate = useNavigate();
  const showExtend = useShowExtend();
  const lastCommentIsQuestion = useLastCommentStore((state) => state.lastCommentIsQuestion);
  const isMobile = useIsMobile();

  const handleLogout = () => {
    const cookies = ['accessToken', 'refreshToken', 'isActive'];

    cookies.forEach(cookie => {
      document.cookie = `${cookie}=; path=/; max-age=0`;
    });

    navigate('/');
  };

  return (
    <aside className='aside'>
      <section className={`mobile-aside-menu ${isMenuVisible ? 'visible' : ''}`}>
        <h1 className='aside-title'>kmu toktok-.</h1>
        <img
          className='mobile-aside-icon'
          src={mobileAsideIcon}
          alt="mobile-aside-icon"
          onClick={()=>setMenuVisible(!isMenuVisible)}
        />
      </section>
      <section className={`aside-menu ${isMenuVisible ? 'visible' : ''}`}>
        <h1 className='aside-title'>kmu<br/>toktok-.</h1>
        <section className='aside-user-info'>
          <img className='aside-user-info-icon' src={tagIcon} alt="tag-icon" />
          <article className='aside-user-info-content'>
            <span className='aside-id'>{cookies.studentId || ' '}</span>
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
              {!lastCommentIsQuestion && <span className='aside-menus-item-alarm'></span>}
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
          {isMobile && currentPath === 'writing' && <WritingMenu />}
        </ul>
      </section>
      {!isMobile && (
        <section className={'aside-extend-menu ' + (
          showExtend ?
          'active' : null
          )}>
            {
              currentPath === 'writing' ? 
              <WritingMenu /> : null
            }
            {
              currentPath === 'file' ? 
              <FileMenu /> : null
            }
        </section>
      )}
    </aside>
  )
}

export default Aside;