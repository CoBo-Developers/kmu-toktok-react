import { useEffect, useRef, useState } from 'react';
import sendIcon from '../assets/icons/send-icon.png';
import './Chatbot.css';
import { getChat, postChat } from '../api/chatApi';
import { useCookies } from 'react-cookie';

function Chatbot() {
  const textarea = useRef();
  const submitBtn = useRef();
  const chatListRef = useRef();
  const [chatList, setChatList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [cookies] = useCookies(['accessToken']);
  const [keys, setKeys] = useState({});

  const handleTextareaChange = (e) => {
    setInputMessage(e.target.value);
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }

  const handleTextareaKeyUp = (e) => {
    if (keys['Enter'] && keys['Shift']) {
      submitBtn.current.click();
    }
    let keysCopy = {...keys};
    keysCopy[e.key] = false;
    setKeys(keysCopy);
  }

  const handleTextareaKeyDown = (e) => {
    let keysCopy = {...keys};
    keysCopy[e.key] = true;
    setKeys(keysCopy);
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    textarea.current.value = "";
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
    if (inputMessage.trim().length > 0) {
      let chatListCopy = [...chatList];
      chatListCopy.push({
        createdAt: new Date(),
        answer: null,
        question: inputMessage.trim()
      })
      setChatList(chatListCopy);
      postChat(inputMessage.trim(), cookies.accessToken)
      .then((res) => {
        getChat(cookies.accessToken)
        .then((res) => {
          setChatList(res.data);
        })
        .catch((error) => {
          alert(error.message);
        })
      })
      .catch((err) => {
        alert(err.message);
      })
      setInputMessage("");
    }
  }

  useEffect(() => {
    if (cookies.accessToken) {
      getChat(cookies.accessToken)
      .then((res) => {
        setChatList(res.data);
      })
      .catch((error) => {
        alert(error.message);
      })
    }
  }, [cookies])
  
  useEffect(() => {
    chatListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList])

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