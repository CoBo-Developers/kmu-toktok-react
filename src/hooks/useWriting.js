import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { postWriting, getWriting, getFeedback } from '../api/writingApi';
import useWritingStore from '../store/useWritingStore';

const useWriting = (writingId) => {
    const [cookies] = useCookies(['accessToken']);
    const [content, setContent] = useState('');
    const [feedbackActive, setFeedbackActive] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [writingList] = useWritingStore((state) => [state.writingList, state.setWritingList]);

    useEffect(() => {
        const assignment = writingList.find((item) => item.id === parseInt(writingId));
        if (!assignment) return;
        setAssignment(assignment);
        setFeedbackActive(assignment.writingState === 1);

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
                setFeedbackActive(false);
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
        feedbackActive,
        assignment,
        feedback,
        handleSaveClick,
        handleFeedbackClick,
    };
};

export default useWriting;