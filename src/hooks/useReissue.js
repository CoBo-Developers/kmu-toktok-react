import { useEffect } from "react";
import { reissueApi } from '../api/authApi';
import { useCookies } from 'react-cookie';

function useReissue() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);

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
}

export default useReissue;