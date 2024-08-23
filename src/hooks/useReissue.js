import { useEffect } from "react";
import { reissueApi } from '../api/authApi';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from "react-router-dom";

function useReissue() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!cookies.accessToken && cookies.refreshToken) {
      reissueApi(cookies.refreshToken)
        .then((response) => {
          setCookie("accessToken", response.data.accessToken, { path: '/',maxAge: 2 * 60 * 60 });
          setCookie("refreshToken", response.data.refreshToken, { path: '/', maxAge: 24 * 7 * 60 * 60 });
          setCookie('isActive', response.data.registerStateEnum, { path: '/', maxAge: 2 * 60 * 60 });
        })
        .catch((error) => {
          alert(error.message);
          removeCookie('accessToken');
          removeCookie('refreshToken');
          removeCookie('isActive');
        });
    } else if (cookies.accessToken && cookies.refreshToken && cookies.isActive === 'INACTIVE') {
      navigate('/register');
    } else if (!cookies.accessToken && !cookies.refreshToken) {
      navigate('/');
    }
  }, [cookies, location]);
}

export default useReissue;