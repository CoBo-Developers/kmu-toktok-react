import { useEffect, useRef, useState } from 'react';
import { getChat, postChat } from '../api/chatBotApi';
import { useCookies } from 'react-cookie';

function useChatbot() {
  const textarea = useRef();
  const submitBtn = useRef();
  const chatListRef = useRef();
  const [chatList, setChatList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [cookies] = useCookies(['accessToken']);
  const [keys, setKeys] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleTextareaChange = (e) => {
    setInputMessage(e.target.value);
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }

  const handleTextareaKeyUp = (e) => {
    if (e.key == 'Enter' && !keys['Shift']) {
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
    if (e.key == 'Enter' && !keys['Shift']) {
      e.preventDefault();
    }
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    textarea.current.value = "";
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
    if (inputMessage.trim().length > 0) {
      if(inputMessage.trim().length > 5000) {
        alert("5000자 이하로 입력해주세요.");
        return;
      }
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
      setIsLoading(true);
      getChat(cookies.accessToken)
      .then((res) => {
        setChatList(res.data);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    handleMessageSubmit,
    isLoading,
  }
}

export default useChatbot