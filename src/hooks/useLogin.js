import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { loginApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function useLogin() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');
  const { option } = useParams(); 

  useEffect(() => {
    if (code && option) {
        loginApi(code, option)
            .then((response) => {
            setCookie("accessToken", response.data.accessToken, { path: '/', maxAge: 2 * 60 * 60 });
            setCookie("refreshToken", response.data.refreshToken, { path: '/', maxAge: 24 * 7 * 60 });
            setCookie('isActive', response.data.registerStateEnum, { path: '/', maxAge: 2 * 60 * 60 });
            })
            .catch((error) => {
            console.log(error.message);
            });
    }
  }, [code, option]);

  useEffect(() => {
    if (cookies.accessToken) {
      navigate('/chatbot');
    }
  }, [cookies]);
}

export default useLogin;
