import sendIcon from '../assets/icons/send-icon.png';
import useChatbot from '../hooks/useChatbot';
import './Chatbot.css';

function Chatbot() {
  const {
    textarea,
    submitBtn,
    chatListRef,
    chatList,
    handleTextareaChange,
    handleTextareaKeyDown,
    handleTextareaKeyUp,
    handleMessageSubmit
  } = useChatbot();

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
          {
            chatList.map((item, i) => {
              return (
                <div key={i}>
                  <div className='message-wrapper'>
                    <div className="message user">
                      { item.question }
                    </div>
                  </div>
                  <div className='message-wrapper'>
                    <div className="message bot">
                      { item.answer || "Loading..." }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </article>
        <div ref={chatListRef}></div>
      </section>
      <section className="message-input-wrapper">
        <textarea name="send-message" id="send-message" rows={1} 
          placeholder="질문을 입력해주세요" ref={textarea} 
          onChange={handleTextareaChange}
          onKeyUp={handleTextareaKeyUp}
          onKeyDown={handleTextareaKeyDown}></textarea>
        <button className='send-btn' onClick={handleMessageSubmit} ref={submitBtn}>
          <img src={sendIcon} alt="send-icon" />
        </button>
      </section>
    </main>
  )
}

export default Chatbot