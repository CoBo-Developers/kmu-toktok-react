import { useEffect } from 'react'
import { getChat } from '../api/chatProfApi';
import { useCookies } from 'react-cookie';
import useLastCommentStore from '../store/useLastCommenStore';

const useShowAlarm = () => {
    const [cookies] = useCookies(['accessToken']);
    const setLastCommentIsQuestion = useLastCommentStore((state) => state.setLastCommentIsQuestion);

    useEffect(() => {
        getChat(cookies.accessToken)
          .then((chat) => {
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
      }, [cookies]);
}

export default useShowAlarm;
