import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { postWriting, getWriting, getFeedback } from '../api/writingApi';
import useWritingStore from '../store/useWritingStore';

const useWriting = (writingId) => {
    const [cookies] = useCookies(['accessToken']);
    const [content, setContent] = useState('');
    const [originalContent, setOriginalContent] = useState('');
    const [isContentModified, setIsContentModified] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [writingList] = useWritingStore((state) => [state.writingList, state.setWritingList]);

    useEffect(() => {
        const assignment = writingList.find((item) => item.id === parseInt(writingId));
        if (!assignment) return;
        setAssignment(assignment);

        getWriting(cookies.accessToken, writingId)
            .then((res) => {
                setContent(res.data.content);
                setOriginalContent(res.data.content);
                setIsContentModified(false);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [writingId, cookies.accessToken, writingList]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
        setIsContentModified(newContent !== originalContent);
    };

    const handleSaveClick = () => {
        postWriting(cookies.accessToken, writingId, 1, content)
            .then(() => {
                alert('과제가 제출되었습니다.');
                setOriginalContent(content);
                setIsContentModified(false);
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
        assignment,
        feedback,
        handleSaveClick,
        handleFeedbackClick,
        isContentModified,
        handleContentChange,
    };
};

export default useWriting;