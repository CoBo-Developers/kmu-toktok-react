import { useEffect, useState, useRef } from 'react';
import { getChat, postChat } from '../api/chatProfApi';
import useLastCommentStore from '../store/useLastCommenStore';
import { useCookies } from 'react-cookie';

const useChatProf = () => {
  const [cookies] = useCookies(['accessToken']);
  const [chatList, setChatList] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef();
  const chatListRef = useRef();
  const sendRef = useRef();
  const setLastCommentIsQuestion = useLastCommentStore((state) => state.setLastCommentIsQuestion);

  useEffect(() => {
    if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatList]);

  useEffect(() => {
    getChat(cookies.accessToken)
      .then((chat) => {
        setChatList(chat.data);
        if (chat.data.length > 0){
          setLastCommentIsQuestion(chat.data[chat.data.length - 1].question);
        }
        else{
          setLastCommentIsQuestion(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cookies.accessToken]);


  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    const newChat = {
      comment: newMessage,
      localDateTime: new Date().toISOString(),
      question: true,
    };

    postChat(cookies.accessToken, newMessage)
      .then(() => {
        setChatList([...chatList, newChat]);
        setNewMessage('');
        inputRef.current.style.height = 'auto';
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    inputRef.current.value = '';
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }
  };

  return {
    chatList,
    newMessage,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleKeyUp,
    inputRef,
    chatListRef,
    sendRef,
  };
};

export default useChatProf;