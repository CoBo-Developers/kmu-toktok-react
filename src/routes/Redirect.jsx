import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

function Redirect() {
  const { option } = useParams(); 
  const { login } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code && option) {
      login(code, option)
        .then(() => {
          navigate('/chatbot');
        });
    }
  },[option]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
export default Redirect;