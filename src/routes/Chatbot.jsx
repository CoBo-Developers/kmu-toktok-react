import { useRef } from 'react';
import sendIcon from '../assets/icons/send-icon.png';
import './Chatbot.css';

function Chatbot() {
  const textarea = useRef();
  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto'; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };
  return (
    <main className="chatbot">
      <section className="message-container">

      </section>
      <section className="message-input-wrapper">
        <textarea name="send-message" id="send-message" rows={1} placeholder="질문을 입력해주세요" ref={textarea} onChange={handleResizeHeight}></textarea>
        <button className='send-btn'>
          <img src={sendIcon} alt="send-icon" />
        </button>
      </section>
    </main>
  )
}

export default Chatbot