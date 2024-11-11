import { useEffect, useState, useRef } from 'react';
import { getChat, postChat } from '../../../api/chatProfApi';
import { useCookies } from 'react-cookie';

const useChatProf = () => {
  const [cookies] = useCookies(['accessToken']);
  const [chatList, setChatList] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef();
  const chatListRef = useRef();
  const sendRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatList]);

  useEffect(() => {
    setIsLoading(true);
    getChat(cookies.accessToken)
      .then((chat) => {
        setChatList(chat.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
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
    inputRef.current.value = '';
    inputRef.current.style.height = 'auto';
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }

    if (newMessage.trim() === '') return;

    setIsLoading(true);
    postChat(cookies.accessToken, newMessage)
      .then(() => {
        setIsLoading(true);
        getChat(cookies.accessToken)
          .then((chat) => {
            setChatList(chat.data);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setNewMessage('');
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
    isLoading,
  };
};

export default useChatProf;