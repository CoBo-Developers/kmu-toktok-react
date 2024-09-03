import { useState } from 'react';
import './WritingMenu.css';
import WritingItem from './WritingItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getWritingList } from '../../../api/writingApi';
import useWritingStore from '../../../store/useWritingStore';
import LoadingModal from '../../LoadingModal/LoadingModal';

function WritingMenu() {
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const { writingList, myScore, totalScore, setWritingList, updateScores } = useWritingStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getWritingList(cookies.accessToken)
      .then((res) => {
        const assignmentList = res.data.assignmentList;
        const myScore = assignmentList.reduce((sum, item) => sum + (item.writingScore || 0), 0);
        const totalScore = assignmentList.reduce((sum, item) => sum + item.score, 0);

        setWritingList(assignmentList);
        updateScores(myScore, totalScore);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cookies.accessToken]);

  return (
    <section className='writing-menu'>
        <LoadingModal show={isLoading} />
        <h2>주차별 글쓰기</h2>
        <article className='total-score-container'>
            <h3 className='total-score-title'>현재 나의 글쓰기 점수</h3>
            <div className='total-score-wrapper'><span className='my-score'>{myScore}</span> / <span className='total-score'>{totalScore}</span></div>
        </article>
        <ul>
          {writingList.map((item) => (
              <WritingItem key={item.id} item={item} onClick={() => navigate(`/writing/${item.id}`)} />
          ))}
        </ul>
    </section>
  );
}

export default WritingMenu;
