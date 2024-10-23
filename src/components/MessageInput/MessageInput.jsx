/* eslint-disable react/prop-types */
import sendIcon from '../../assets/icons/send-icon.svg';
import './MessageInput.css';

function MessageInput({
  textarea,
  handleTextareaChange,
  handleTextareaKeyDown,
  handleTextareaKeyUp,
  handleMessageSubmit,
  submitBtn,
  isBotLoading,
  inputBackground,
  sendIconBackground
}) {
  return (
    <section className="message-input-wrapper" style={inputBackground}>
      <textarea
        name="send-message"
        id="send-message"
        rows={1}
        placeholder="질문을 입력해주세요"
        ref={textarea}
        onChange={handleTextareaChange}
        onKeyUp={handleTextareaKeyUp}
        onKeyDown={handleTextareaKeyDown}
        disabled={isBotLoading}
      ></textarea>
      <button className='send-btn' onClick={handleMessageSubmit} ref={submitBtn} style={sendIconBackground}>
        <img src={sendIcon} alt="send-icon" />
      </button>
    </section>
  );
}

export default MessageInput;
