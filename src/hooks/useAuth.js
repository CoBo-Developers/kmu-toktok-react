
import { useNavigate} from 'react-router-dom';
import { loginApi, reissueApi } from '../api/authApi';
import { useCookies } from 'react-cookie';

function useAuth() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const navigate = useNavigate();

  const login = (code, option) => {
    if(code && option) {
        loginApi(code, option)
            .then((response) => {
                setCookie("accessToken", response.data.accessToken, {maxAge: 2 * 60 * 60});
                setCookie("refreshToken", response.data.refreshToken, {maxAge: 24 * 14 * 60});
                setCookie('isActive', response.data.registerStateEnum, {maxAge: 2 * 60 * 60});
                navigate('/chatbot');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
  };

  const reissue = () => {
    reissueApi(cookies.refreshToken)
      .then((response) => {
        setCookie("accessToken", response.data.accessToken, {maxAge: 2 * 60 * 60});
        setCookie("refreshToken", response.data.refreshToken, {maxAge: 24 * 14 * 60});
        setCookie('isActive', response.data.registerStateEnum, {maxAge: 2 * 60 * 60});
        navigate('/chatbot');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return { login, reissue };
}

export default useAuth;
