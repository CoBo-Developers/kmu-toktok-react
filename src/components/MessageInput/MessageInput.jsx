import sendIcon from '../../assets/icons/send-icon.png';
import './MessageInput.css';

// eslint-disable-next-line react/prop-types
function MessageInput({ textarea, handleTextareaChange, handleTextareaKeyDown, handleTextareaKeyUp, handleMessageSubmit, submitBtn }) {
  return (
    <section className="message-input-wrapper">
      <textarea
        name="send-message"
        id="send-message"
        rows={1}
        placeholder="질문을 입력해주세요"
        ref={textarea}
        onChange={handleTextareaChange}
        onKeyUp={handleTextareaKeyUp}
        onKeyDown={handleTextareaKeyDown}
      ></textarea>
      <button className='send-btn' onClick={handleMessageSubmit} ref={submitBtn}>
        <img src={sendIcon} alt="send-icon" />
      </button>
    </section>
  );
}

export default MessageInput;
