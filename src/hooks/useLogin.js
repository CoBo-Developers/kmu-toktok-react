import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { loginApi } from '../api/authApi';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';

function useLogin() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { option } = useParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code && option) {
      loginApi(code, option)
        .then((response) => {
          setCookie("accessToken", response.data.accessToken, { path: '/', maxAge: 2 * 60 * 60 });
          setCookie("refreshToken", response.data.refreshToken, { path: '/', maxAge: 24 * 7 * 60 });
          setCookie('isActive', response.data.registerStateEnum, { path: '/', maxAge: 2 * 60 * 60 });
          setCookie('studentId',response.data.studentId, { path: '/', maxAge: 2 * 60 * 60 });
        })
        .catch((error) => {
          alert(error.message);
          navigate('/');
        });
    } else {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  }, [searchParams]);

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken && cookies.isActive === 'ACTIVE') {
      navigate('/chatbot');
    }
    else if (cookies.accessToken && cookies.refreshToken && cookies.isActive === 'INACTIVE') {
      navigate('/register');
    }
  }, [cookies]);
}

export default useLogin;
