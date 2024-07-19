import "./Register.css";
import useRegister from "../hooks/useRegister";

function Register() {
  const { 
    name, 
    studentId, 
    handleNameChange, 
    handleStudentIdChange, 
    isButtonActive, 
    handleSubmit 
  } = useRegister();

  return (
    <main className="register-main">
      <section className="register-content">
        <section className="register-content-left">
          <h2>회원정보 입력</h2>
          <div className="steps">
            <div className="step active">
              <span className="step-number">1</span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
            </div>
            <div className="step">
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
              placeholder="2021111222"
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
        </section>
      </section>
    </main>
  );
}
export default Register;
