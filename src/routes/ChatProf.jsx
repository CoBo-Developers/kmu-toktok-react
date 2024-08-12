import './ChatProf.css';
import useChatProf from '../hooks/useChatProf';
import { formatDate, formatTime } from '../utils/dateAndTime';
import MessageInput from '../components/MessageInput';

function ChatProf() {
  const {
    chatList,
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
      <MessageInput
        textarea={inputRef}
        handleTextareaChange={handleInputChange}
        handleTextareaKeyDown={handleKeyDown}
        handleTextareaKeyUp={handleKeyUp}
        handleMessageSubmit={handleSend}
        submitBtn={sendRef}
      />
    </main>
  );
}

export default ChatProf;