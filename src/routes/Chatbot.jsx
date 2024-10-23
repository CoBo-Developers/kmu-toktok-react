import './Chatbot.css';
import useChatbot from '../hooks/useChatbot';
import MessageInput from '../components/MessageInput/MessageInput';
import Loading from '../components/Loading/Loading';
import LoadingModal from '../components/LoadingModal/LoadingModal';

function Chatbot() {
  const {
    textarea,
    submitBtn,
    chatListRef,
    chatList,
    handleTextareaChange,
    handleTextareaKeyDown,
    handleTextareaKeyUp,
    handleMessageSubmit,
    isLoading
  } = useChatbot();
  
  let isBotLoading = false;

  return (
    <main className="chatbot">
      <LoadingModal show={isLoading} />
      <section className="message-container">
        <article className="message-container-inner">
          <div className='message-wrapper'>
            <div className="message bot">
            안녕하세요! 크무톡톡입니다. <br /><br />
            크무톡톡은 우리 교과목을 위해 자체 개발한 AI챗봇이예요. AI챗봇은 질문내용(프롬프트)에 따라 더 정확한 답변을 받을 수 있어요.<br /><br />
            1)교과목과 관련된 질문은 교과목 이름을 붙여야 챗봇이 더 잘 인식합니다! AI와 컴퓨팅사고 교과목에 대해 궁금한 점이 있다면 아래와 같이 질문해보세요!<br />
            Ex)<br />
            1. AI와 컴퓨팅사고 교과목의 평가기준을 알려줘.<br />
            2. AI와 컴퓨팅사고 교과목의 교육목표를 알려줘.<br />
            3. 2주차 글쓰기 주제가 궁금해<br /><br />

            자, 이제 크무톡톡과 대화해볼까요?<br /><br />
            질문을 입력해주세요!
            </div>
          </div>
          {
            chatList.map((item, i) => {
              let formattedAnswer;
              let lastCharIdx;

              if (item.answer) lastCharIdx = item.answer.length - 1;

              if (item.answer && item.answer[0] === '\"' && item.answer[lastCharIdx] === '\"') {
                formattedAnswer = item.answer
                .slice(1, lastCharIdx)
                .replace(/""/g, '"')
                .replace(/\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/【\d+:\d+†source】/g, '');
              } else if (item.answer) {
                formattedAnswer = item.answer
                .replace(/""/g, '"')
                .replace(/\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/【\d+:\d+†source】/g, '');
              }

              if (!formattedAnswer) {
                isBotLoading = true;
              }
              return (
                <div key={i}>
                  <div className='message-wrapper'>
                    <div className="message user">
                      { item.question }
                    </div>
                  </div>
                  <div className='message-wrapper'>
                    <div className="message bot">
                      { formattedAnswer || <Loading /> }
                    </div>
                  </div>
                </div>
              )
            })
          }   
        </article>
        <div ref={chatListRef}></div>
      </section>
      <MessageInput
        textarea={textarea}
        handleTextareaChange={handleTextareaChange}
        handleTextareaKeyDown={handleTextareaKeyDown}
        handleTextareaKeyUp={handleTextareaKeyUp}
        handleMessageSubmit={handleMessageSubmit}
        submitBtn={submitBtn}
        isBotLoading={isBotLoading}
        inputBackground={{background: '#F0F1F3'}}
        sendIconBackground={{background: '#001832'}}
      />
    </main>
  )
}

export default Chatbot