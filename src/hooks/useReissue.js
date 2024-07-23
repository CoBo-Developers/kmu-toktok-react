import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { reissueApi } from '../api/authApi';
import { useCookies } from 'react-cookie';

function useReissue() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const navigate = useNavigate();

  const reissue = async () => {
    if (cookies.refreshToken) {
      reissueApi(cookies.refreshToken)
        .then((response) => {
          setCookie("accessToken", response.data.accessToken, { maxAge: 2 * 60 * 60 });
          setCookie("refreshToken", response.data.refreshToken, { maxAge: 24 * 7 * 60 });
          setCookie('isActive', response.data.registerStateEnum, { maxAge: 2 * 60 * 60 });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    if (!cookies.accessToken && cookies.refreshToken) {
      reissue()
        .then(() => {
            navigate('/chatbot');
      });
    }
  }, [cookies.accessToken]);
}

export default useReissue;
