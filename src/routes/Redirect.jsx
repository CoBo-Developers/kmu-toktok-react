import useLogin from '../routes/Login/hooks/useLogin';

function Redirect() {
  useLogin();

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
export default Redirect;