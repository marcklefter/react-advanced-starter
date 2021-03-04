import {
  Redirect,

  useLocation
} from 'react-router-dom';

let Login = ({ user, loginError, authLoginSuccess, authLoginFailure }) => {
  const location = useLocation();
  
  if (user) {
    const redirectTo = location.state?.from ?? '/';

    return <Redirect to={redirectTo} />;
  }

  // ...
  // Helper method.
  const login = async (credential) => {
    if (credential === 'admin') {
      // TODO: Dispatch action authLoginSuccess.
    } else {
      // TODO: Dispatch action authLoginFailure.
    }
  };
  const handleSubmit = e => {
    e.preventDefault();

    login(e.target.login.value);
  };

  return (
    <>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input id="login" />
      </form>
      {loginError && 'Login was incorrect'}
    </>
  )
}
    
export { Login }
