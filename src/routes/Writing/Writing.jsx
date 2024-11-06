import "./Writing.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useWriting from "./hooks/useWriting";
import { formatAssignmentTime } from "../../utils/dateAndTime";
import { writingStateEnum } from "../../utils/writingEnum";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import feedbackArrow from "../../assets/icons/feedback-arrow.svg";

function Writing() {
  const { writingId } = useParams();
  const {
    content,
    handleContentChange,
    assignment,
    feedback,
    handleSaveClick,
    handleFeedbackClick,
    isWaitingForFeedback,
    isLoading,
    isExpired,
    writingRef,
    feedbackRef,
  } = useWriting(writingId);

  const [isHovered, setIsHovered] = useState(false);

  if (!writingId || !assignment) return null;

  const state = Object.values(writingStateEnum).find((state) => state.state === assignment.writingState
  ) || {
    text: "",
    className: "",
  };

  const isSaveButtonDisabled = state.state !== 0 || isWaitingForFeedback || isExpired || content.trim().length < 250;
  const saveButtonClassName = `save-button ${ state.state != 4 && content.trim().length < 250 ? "short-content" : ""}`;

  return (
    <main className="writing-main">
      <LoadingModal show={isLoading} />
      <section className="writing-header-container">
        <span className="chat-header-text">{assignment.title}</span>
      </section>
      <section className="writing-container">
        <article className="button-container">
          <button
            className={saveButtonClassName}
            onClick={handleSaveClick}
            disabled={isSaveButtonDisabled}
          >
            {state.state !== 0 && (
              <span className={`writing-state-color ${state.className || ""}`}></span>
            )}
            {state.text === "" ? "제출" : state.text}
            {state.state === 3 && (
              <div className="writing-score-wrapper">
                <span className="my-writing-score">{assignment.writingScore}</span>
                /
                <span className="total-writing-score">{assignment.score} 점</span>
              </div>
            )}
          </button>
        </article>
        <hr />
        <article className="writing-description-container">
          <div className="description-wrapper">
            <span className="description-label">설명</span>
            <span className="description-content">
              {assignment.description}
            </span>
          </div>
          <div>
            <span className="description-label">기간</span>
            <span className="description-content">
              {formatAssignmentTime(assignment.startDate, assignment.endDate)}
            </span>
          </div>
        </article>
        <hr />
        <article className="writing-content-container">
          <div>
            <div className="writing-label-wrapper">
              <span className="writing-label">나의 글</span>
              <span className="content-length">
                공백포함 글자수: {content.trim().length}자
              </span>
            </div>
            <textarea
              name="writing-content"
              id="writing-content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              ref={writingRef}
              disabled={state.state != 0 || isWaitingForFeedback || isExpired}
            />
          </div>
          {state.state != 0 ||
            (!isExpired && (
              <div
                className="feedback-container"
                onMouseEnter={() => {
                  if (!isWaitingForFeedback) setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div>
                  <span className={`feedback-label ${isWaitingForFeedback ? "blink-effect" : ""}`}>
                    피드백
                  </span>
                  <span className="feedback-guide">
                    {isHovered ? "" : !isWaitingForFeedback ? "피드백을 받고 싶다면 마우스를 올려보세요!" : "피드백을 생성하는 중이에요!"}
                  </span>
                </div>
                <textarea
                  name="feedback-content"
                  id="feedback-content"
                  defaultValue={feedback}
                  readOnly
                  ref={feedbackRef}
                  disabled={isWaitingForFeedback}
                />
                {isHovered && (
                  <article className="hover-div" onClick={handleFeedbackClick}>
                    <div>
                      <p>피드백 칸의 면적을 클릭하면</p>
                      <img src={feedbackArrow} alt="feedback-arrow" />
                    </div>
                    <p>나의 글에 대한 피드백이 생성돼요!</p>
                  </article>
                )}
              </div>
            ))}
        </article>
      </section>
    </main>
  );
}

export default Writing;