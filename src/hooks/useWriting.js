import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { postWriting, getWriting, getFeedback } from '../api/writingApi';
import useWritingStore from '../store/useWritingStore';

const useWriting = (writingId) => {
    const [cookies] = useCookies(['accessToken']);
    const [content, setContent] = useState(''); 
    const [assignment, setAssignment] = useState(null);
    const [feedback, setFeedback] = useState(''); 
    const [isFeedbackActive, setIsFeedbackActive] = useState(false);
    const [writingList] = useWritingStore((state) => [state.writingList, state.setWritingList]);

    useEffect(() => {
        const assignment = writingList.find((item) => item.id === parseInt(writingId));
        if (!assignment) return;
        setAssignment(assignment);

        getWriting(cookies.accessToken, writingId)
            .then((res) => {
                setContent(res.data.content);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [writingId, cookies.accessToken, writingList]);

    const handleSaveClick = () => {
        postWriting(cookies.accessToken, writingId, 1, content)
            .then(() => {
                alert('과제가 제출되었습니다.');
                setIsFeedbackActive(true);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const handleFeedbackClick = () => {
        getFeedback(cookies.accessToken, writingId, content)
            .then((res) => {
                setFeedback(res.data.feedback);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return {
        content,
        setContent,
        assignment,
        feedback,
        handleSaveClick,
        handleFeedbackClick,
        isFeedbackActive,
    };
};

export default useWriting;