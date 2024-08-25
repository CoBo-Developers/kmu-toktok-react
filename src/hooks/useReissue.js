import { useEffect } from "react";
import { reissueApi } from '../api/authApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import useCurrentPath from "../hooks/useCurrentPath";

function useReissue() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'isActive', 'studentId']);
  const navigate = useNavigate();
  const currentPath = useCurrentPath();

  useEffect(() => {
    if (!cookies.accessToken && cookies.refreshToken) {
      reissueApi(cookies.refreshToken)
        .then((response) => {
          setCookie("accessToken", response.data.accessToken, { path: '/',maxAge: 2 * 60 * 60 });
          setCookie("refreshToken", response.data.refreshToken, { path: '/', maxAge: 24 * 7 * 60 * 60 });
          setCookie('isActive', response.data.registerStateEnum, { path: '/', maxAge: 2 * 60 * 60 });
          setCookie('studentId',response.data.studentId, { path: '/', maxAge: 2 * 60 * 60 });
        })
        .catch((error) => {
          alert(error.message);
          removeCookie('accessToken');
          removeCookie('refreshToken');
          removeCookie('isActive');
          removeCookie('studentId');
        });
    } else if (cookies.accessToken && cookies.refreshToken && cookies.isActive === 'INACTIVE' && currentPath !== 'register') {
      navigate('/register');
    } else if (!cookies.accessToken && !cookies.refreshToken && currentPath !== '' && currentPath !== 'redirect') {
      navigate('/');
    }
  }, [cookies, currentPath]);
}

export default useReissue;