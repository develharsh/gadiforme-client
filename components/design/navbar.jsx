import { useContext, useEffect } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import cookie from "js-cookie";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";

export default function Navbar() {
  const { dispatch, state } = useContext(DataContext);
  const { user, sidepanel } = state;
  const toggleSidepanel = () => {
    dispatch({ type: ACTIONS.SIDEPANEL, payload: !sidepanel });
  };
  function logOutNow() {
    dispatch({ type: ACTIONS.AUTH, payload: null });
    cookie.remove("token");
    dispatch({
      type: ACTIONS.NOTIFY,
      payload: ["info", "Logged Out Successfully"],
    });
  }

  useEffect(() => {
    if (user === null) {
      if (window.location.href.includes("#login"))
        dispatch({ type: ACTIONS.LOGIN_MODAL, payload: true });
      else if (window.location.href.includes("#register")) {
        dispatch({ type: ACTIONS.REGISTER_MODAL, payload: true });
      }
    }
  }, [user]);

  return (
    <>
      <div className="navmaindiv">
        <Link href="/">
          <a className="text-900">
            Gadi<span>For</span>
            <span>Me</span>
          </a>
        </Link>
        <div>
          <Link href="/add-trip">
            <a>Gadi's for Your Trip</a>
          </Link>

          {user && (
            <Link href="/my-trips">
              <a>My Trips</a>
            </Link>
          )}

          <Link href="/about-us">
            <a>About Us</a>
          </Link>

          <Link href="https://blog.gadiforme.com">
            <a target="_blank">FAQs</a>
          </Link>
          <Link href="https://partner.gadiforme.com">
            <a target="_blank">Drive with us</a>
          </Link>
          {user ? (
            <Button
              colorScheme="red"
              onClick={logOutNow}
              leftIcon={<AiOutlineLogout />}
            >
              Log Out
            </Button>
          ) : (
            <a
              className="navLoginBtn"
              href="#login"
              onClick={() =>
                dispatch({ type: ACTIONS.LOGIN_MODAL, payload: true })
              }
            >
              Log in
            </a>
          )}
        </div>
        <p className="navhamburger" onClick={toggleSidepanel}>
          {sidepanel ? <FaTimes size={30} /> : <AiOutlineMenu size={30} />}
        </p>
      </div>
      <div className="navheighbelow"></div>
      <div className="navheighbelow"></div>
      <div className="navheighbelow"></div>
      <div className="navheighbelow"></div>
    </>
  );
}
