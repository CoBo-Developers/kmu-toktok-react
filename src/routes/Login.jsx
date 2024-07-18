import './Login.css';
import kakaoImg from '../assets/images/kakao_logo.png';
import naverImg from '../assets/images/naver_logo.png';
import googleImg from '../assets/images/google_logo.png';

function Login() {
    return (
        <main className='login-main'>
            <section className='login-content'>
                <section className='login-content-left'>
                    <span>kmu</span>
                    <span>toktok-.</span>
                </section>
                <div className='separator'></div>
                <section className='login-content-right'>
                    <h2>로그인</h2>
                    <ul>
                        <li className='kakao-login-btn'>
                            <img src={kakaoImg} alt='' />
                        </li>
                        <li className='naver-login-btn'>
                            <img src={naverImg} alt='' />
                        </li>
                        <li className='google-login-btn'>
                            <img src={googleImg} alt='' />
                        </li>
                    </ul>
                    <a id="mailBtn" href="#">문의하기</a>
                </section>
            </section>
        </main>
    );
}

export default Login;
