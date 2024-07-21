import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Redirect() {
  const { option } = useParams(); 
  const { login } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code && option) {
      login(code, option);
    }
  },[]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
export default Redirect;