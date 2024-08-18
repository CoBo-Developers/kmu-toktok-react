import './Writing.css';
import { useParams } from 'react-router-dom';
import useWriting from '../hooks/useWriting';
import { formatAssignmentTime } from '../utils/dateAndTime';
import { writingStateEnum } from '../utils/writingEnum';

function Writing() {
    const { writingId } = useParams();
    const {
        content,
        setContent,
        assignment,
        feedback,
        handleSaveClick,
        handleFeedbackClick,
        isFeedbackActive,
        isWaitingForFeedback,
    } = useWriting(writingId);

    if (!assignment) return <div>Loading...</div>;

    const state = Object.values(writingStateEnum).find(state => state.state === assignment.writingState) || {
        text: '',
        className: '',
    };

    const getSaveButtonText = () => {
       if (state.state === 1) return '다시 제출';
       return state.text === '' ? '제출' : state.text;
    };

    return (
        <main className='writing-main'>
            <section className='writing-header-container'>
                <span className='chat-header-text'>{assignment.title}</span>
            </section>
            <section className='writing-container'>
                <article className='button-container'>
                    <button className='save-button' onClick={handleSaveClick}>
                        {(state.state === 2 || state.state === 3) && (
                            <span className={`writing-state-color ${state.className || ''}`}></span>
                        )}
                        {getSaveButtonText()}
                        {state.state === 3 && (
                            <div className='writing-score-wrapper'>
                                <span className='my-writing-score'>{assignment.writingScore}</span>
                                /
                                <span className='total-writing-score'>{assignment.score} 점</span>
                            </div>
                        )}
                    </button>
                    <button
                        className={!isFeedbackActive ? 'feedback-button inactive' : 'feedback-button'}
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
                        <div><span className={`feedback-label ${isWaitingForFeedback ? 'blink-effect' : ''}`}>피드백</span></div>
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