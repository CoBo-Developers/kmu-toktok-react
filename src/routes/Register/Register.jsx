import "./Register.css";
import useRegister from "./hooks/useRegister";
import checkedIcon from "../../assets/icons/checked-icon.png";
import uncheckedIcon from "../../assets/icons/unchecked-icon.png";

function Register() {
  const { 
    name, 
    studentId, 
    handleNameChange, 
    handleStudentIdChange, 
    isButtonActive, 
    handleSubmit, 
    currentStep,
    isChecked,
    handleCheckIcon
  } = useRegister();

  return (
    <main className="register-main">
      <section className="register-content">
        <section className="register-content-left">
          <div className="guide">
            <h2 className={`guide1 ${currentStep === 1 ? 'active' : ''}`}>
              회원정보 입력
            </h2>
            <h2 className={`guide2 ${currentStep === 2 ? 'active' : ''}`}>
              개인정보 이용 동의
            </h2>
            <h2 className={`guide3 ${currentStep === 3 ? 'active' : ''}`}>
              가입완료
            </h2>
          </div>
          <div className="steps" data-active={currentStep}>
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
            </div>
          </div>
          <div className="title">
            <span>kmu</span>
            <span>toktok-.</span>
          </div>
        </section>
        <div className="separator"></div>
        <section className="register-content-right">
          {currentStep === 1 && (
            <article className="content-step1">
              <div className="input-wrapper">
                <label>이름</label>
                <input
                  type="text"
                  placeholder="나학생"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="input-wrapper">
                <label>학번</label>
                <input
                  type="text"
                  placeholder="5800000"
                  value={studentId}
                  onChange={handleStudentIdChange}
                />
              </div>
              <div className="btn-wrapper">
                <button
                  type="submit"
                  className={`next-btn ${isButtonActive ? 'active' : ''}`}
                  onClick={handleSubmit}
                  disabled={!isButtonActive}
                >
                  다음
                </button>
              </div>
            </article>
          )}
          {(currentStep === 2 || currentStep === 3) && (
            <article className="content-step2">
              <div className={`agree-box ${isChecked ? 'active' : ''}`}>
                <input
                  id="agree-check"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckIcon}
                />
                <label htmlFor="agree-check">
                  <img src={isChecked ? checkedIcon : uncheckedIcon} alt="" />
                  아래 개인정보 수집과 이용에 동의합니다.
                </label>
              </div>
              <div className="information-box-content">
                <p>크무톡톡은 회원가입, 회원 관리 등을 위해 아래와 같이 개인정보를 수집·이용합니다.</p>
                <table className="info-table">
                  <thead>
                    <tr>
                      <th>수집 목적</th>
                      <th>수집 항목</th>
                      <th>수집 근거</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>회원 가입 시 재학생 인증</td>
                      <td>이메일</td>
                      <td rowSpan="3">개인정보 보호법 제 15조 제 1항</td>
                    </tr>
                    <tr>
                      <td>학생 식별 및 관리자 답변 관리</td>
                      <td>학번</td>
                    </tr>
                    <tr>
                      <td>사용자 식별</td>
                      <td>쿠키</td>
                    </tr>
                  </tbody>
                </table>
                <p>귀하는 크무톡톡 서비스 이용에 필요한 최소한의 개인정보 수집·이용에 동의하지 않을 수 있으나, 동의를 거부할 경우 회원제 서비스 이용이 불가능합니다.</p>
              </div>
              <div className="btn-wrapper">
                <button
                  type="submit"
                  className={`next-btn ${isChecked ? 'active' : ''}`}
                  onClick={handleSubmit}
                  disabled={!isButtonActive}
                >
                  {currentStep === 2 ? '다음' : '확인'}
                </button>
              </div>
            </article>
          )}
        </section>
      </section>
    </main>
  );
}
export default Register;