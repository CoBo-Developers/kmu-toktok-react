import './Login.css';
import kakaoImg from '../assets/images/kakao_logo.png';
import naverImg from '../assets/images/naver_logo.png';

function Login() {
    const handleLoginBtn = (option) => {
        let url = '';
        switch(option) {
            case 'kakao':
                url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_APP_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_KAKAO_REDIRECT_URI}`;
                break;
            case 'naver':
                url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_APP_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_NAVER_REDIRECT_URI}`;
                break;
        }
        window.location.href = url;
    }
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
                        <li className='kakao-login-btn' onClick={() => handleLoginBtn('kakao')}>
                            <img src={kakaoImg} alt='' />
                        </li>
                        <li className='naver-login-btn' onClick={()=> handleLoginBtn('naver')}>
                            <img src={naverImg} alt='' />
                        </li>
                    </ul>
                    <a id="mailBtn" href="mailto:kmutoktok@gmail.com">문의하기</a>
                </section>
            </section>
        </main>
    );
}

export default Login;
