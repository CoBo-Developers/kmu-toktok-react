import './ChatProf.css';
import sendIcon from '../assets/icons/send-icon.png';
import useChatProf from '../hooks/useChatProf';
import { formatDate, formatTime } from '../utils/dateAndTime';

function ChatProf() {
  const {
    chatList,
    newMessage,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleKeyUp,
    inputRef,
    chatListRef,
    sendRef,
  } = useChatProf();

  return (
    <main className="chat-container">
      <section className="chat-wrapper" ref={chatListRef}>
        {chatList.map((chat, index) => (
          <section key={index}>
            {(index === 0 || formatDate(chat.localDateTime) !== formatDate(chatList[index - 1].localDateTime)) && (
              <div className="date-wrapper">{formatDate(chat.localDateTime)}</div>
            )}
            <article className={`message ${chat.question ? 'question' : 'answer'}`}>
              <div className={`message-content ${chat.question ? 'question' : 'answer'}`}>
                {chat.comment}
              </div>
              {(index === chatList.length - 1 || formatDate(chat.localDateTime) !== formatDate(chatList[index + 1].localDateTime) || chat.question !== chatList[index + 1].question) && (
                <span className="message-time">{formatTime(chat.localDateTime)}</span>
              )}
            </article>
          </section>
        ))}
      </section>

      <section className="input-wrapper">
        <textarea
          rows={1}
          className="input-text"
          placeholder="메시지를 입력해주세요"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
        <button type="submit" className="send-btn" onClick={handleSend} ref={sendRef}>
          <img src={sendIcon} alt="Send" />
        </button>
      </section>
    </main>
  );
}

export default ChatProf;