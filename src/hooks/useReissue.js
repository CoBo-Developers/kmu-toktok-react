import { useEffect } from "react";
import { reissueApi } from '../api/authApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function useReissue() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.accessToken && cookies.refreshToken) {
      reissueApi(cookies.refreshToken)
        .then((response) => {
          setCookie("accessToken", response.data.accessToken, { path: '/',maxAge: 2 * 60 * 60 });
          setCookie("refreshToken", response.data.refreshToken, { path: '/', maxAge: 24 * 7 * 60 * 60 });
          setCookie('isActive', response.data.registerStateEnum, { path: '/', maxAge: 2 * 60 * 60 });
        })
        .catch ((error) => {
            console.log(error);
        })
    }
  }, [cookies]);

  useEffect(() => {
    if (cookies.accessToken) {
      if (cookies.isActive === 'ACTIVE'){
        navigate('/chatbot');
      }
      else{
        navigate('/register');
      }
    }
    else{
      navigate('/');
    }
  }, [cookies]);
}

export default useReissue;