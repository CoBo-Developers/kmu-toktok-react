import { useRef } from 'react';
import sendIcon from '../assets/icons/send-icon.png';
import './Chatbot.css';

function Chatbot() {
  const textarea = useRef();
  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };
  return (
    <main className="chatbot">
      <section className="message-container">
        <article className="message-container-inner">
          <div className='message-wrapper'>
            <div className="message bot">
              안녕하세요! 궁금한 것이 있으신가요?<br />
              아래 입력창에 질문해주세요.
            </div>
          </div>
          <div className='message-wrapper'>
            <div className="message user">
              파이썬 과목의 수강계획서를 알고 싶어.
            </div>
          </div>
        </article>
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