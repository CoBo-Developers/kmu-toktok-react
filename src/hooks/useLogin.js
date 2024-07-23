import { useCookies } from 'react-cookie';
import { loginApi } from '../api/authApi';

function useLogin() {
  const [, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);

  const login = async (code, option) => {
    if (code && option) {
      loginApi(code, option)
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

  return { login };
}

export default useLogin;
