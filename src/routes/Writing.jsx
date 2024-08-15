import './Writing.css';
import { useParams } from 'react-router-dom';
import useWriting from '../hooks/useWriting';
import { formatAssignmentTime } from '../utils/dateAndTime';

function Writing() {
    const { writingId } = useParams();
    const {
        content,
        setContent,
        feedbackActive,
        assignment,
        feedback,
        handleSaveClick,
        handleFeedbackClick,
    } = useWriting(writingId);

    if (!assignment) return <div>Loading...</div>;

    return (
        <main className='writing-main'>
            <section className='writing-header-container'>
                <span className='chat-header-text'>{assignment.title}</span>
            </section>
            <section className='writing-container'>
                <article className='button-container'>
                    <button className='save-button' onClick={handleSaveClick}>
                        {assignment.writingState === 1 ? '다시제출' : '제출'}
                    </button>
                    <button
                        className={feedbackActive ? 'feedback-button inactive' : 'feedback-button'}
                        onClick={handleFeedbackClick}
                    >
                        피드백
                    </button>
                </article>
                <hr />
                <article className='writing-description-container'>
                    <div>
                        <span className='description-label'>설명</span>
                        <span className='description-content'>{assignment.description}</span>
                    </div>
                    <div>
                        <span className='description-label'>기간</span>
                        <span className='description-content'>
                            {formatAssignmentTime(assignment.startDate, assignment.endDate)}
                        </span>
                    </div>
                </article>
                <hr />
                <article className='writing-content-container'>
                    <div>
                        <div><span className='writing-label'>나의 글</span></div>
                        <textarea
                            className='writing-content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <hr />
                    <div>
                        <div><span className='writing-label'>피드백</span></div>
                        <textarea
                            className='feedback-content'
                            value={feedback}
                            readOnly
                        />
                    </div>
                </article>
            </section>
        </main>
    );
}

export default Writing;