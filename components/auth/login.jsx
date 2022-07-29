import { useContext } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";

const Login = () => {
  const { dispatch, state } = useContext(DataContext);
  const { loginModal } = state;
  const toggleLoginModal = () => {
    dispatch({ type: ACTIONS.LOGIN_MODAL, payload: !loginModal });
  };

  const LoginModal = () => {
    return <></>;
  };
  return <>{loginModal && <LoginModal />}</>;
};

export default Login;
