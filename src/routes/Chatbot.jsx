import './Chatbot.css';
import useChatbot from '../hooks/useChatbot';
import MessageInput from '../components/MessageInput';

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
      <MessageInput
        textarea={textarea}
        handleTextareaChange={handleTextareaChange}
        handleTextareaKeyDown={handleTextareaKeyDown}
        handleTextareaKeyUp={handleTextareaKeyUp}
        handleMessageSubmit={handleMessageSubmit}
        submitBtn={submitBtn}
      />
    </main>
  )
}

export default Chatbot