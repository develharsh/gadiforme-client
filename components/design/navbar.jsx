import { useContext } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import cookie from "js-cookie";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

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
            <a className="no-underline navcolour">Gadi`s for Your Trip</a>
          </Link>

          {user && (
            <Link href="/my-trips">
              <a className="no-underline navcolour">My Trips</a>
            </Link>
          )}

          <Link href="/about-us">
            <a className="no-underline navcolour">About Us</a>
          </Link>

          <Link href="https://blog.gadiforme.com">
            <a className="no-underline navcolour" target="_blank">
              FAQs
            </a>
          </Link>
          <Link href="https://partner.gadiforme.com">
            <a className="no-underline navcolour" target="_blank">
              Drive with us
            </a>
          </Link>
          {user ? (
            <Button colorScheme="red" onClick={logOutNow}>
              Log Out
            </Button>
          ) : (
            <a className="no-underline navcolour" href="#login">
              Sign in
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
