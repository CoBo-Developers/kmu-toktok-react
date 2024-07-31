import { useEffect, useState } from 'react';
import './ChatProf.css';
import sendIcon from '../assets/icons/send-icon.png'
import { getChat, postChat } from '../api/chatProfApi';
import { useCookies } from 'react-cookie';
import { formatDate, formatTime } from '../utils/dateAndTime';

function ChatProf() {
  const [cookies] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const [chatList, setChatList] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    getChat(cookies.accessToken)
      .then((chat) => {
        setChatList(chat.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '')
        return;
    
    const newChat = {
      comment: newMessage,
      localDateTime: new Date().toISOString(),
      question: true,
    };

    postChat(cookies.accessToken, newMessage)
      .then(() => {
        setChatList([...chatList, newChat]);
        setNewMessage('');
      })
      .catch((error) => {
        console.error(error);
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  };

  return (
    <main className="chat-container">
        <section className='chat-wrapper'>
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
        <input
          type="text"
          className="input-text"
          placeholder="메시지를 입력해주세요"
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button type='submit' className='send-btn' onClick={handleSend}>
          <img src={sendIcon} alt="Send" />
        </button>
      </section>
    </main>
  );
}

export default ChatProf;
