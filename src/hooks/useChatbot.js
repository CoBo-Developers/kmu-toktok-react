import { useEffect, useRef, useState } from 'react';
import { getChat, postChat } from '../api/chatApi';
import { useCookies } from 'react-cookie';

function useChatbot() {
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

  return {
    textarea,
    submitBtn,
    chatListRef,
    chatList,
    handleTextareaChange,
    handleTextareaKeyDown,
    handleTextareaKeyUp,
    handleMessageSubmit
  }
}

export default useChatbot