import { useContext } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import cookie from "js-cookie";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { Button } from "primereact/button";
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
            mo<span>refined</span>
          </a>
        </Link>
        <div>
          <Link href="/request-for-mock-interview">
            <a className="no-underline navcolour">Refer Me</a>
          </Link>
          <Link href="/pricing">
            <a className="no-underline navcolour">Pricing</a>
          </Link>
          <Link href="/faqs">
            <a className="no-underline navcolour">FAQs</a>
          </Link>
          <Link href="https://hire.morefined.com">
            <a className="no-underline navcolour">Hire with us</a>
          </Link>
          {user ? (
            <Button
              label="Log Out"
              onClick={logOutNow}
              className="p-button-rounded p-button-danger"
            />
          ) : (
            <Link href="/login">
              <a className="no-underline navcolour">Sign in</a>
            </Link>
          )}
        </div>
        <p className="navhamburger" onClick={toggleSidepanel}>
          {sidepanel ? <FaTimes size={25} /> : <AiOutlineMenu size={25} />}
        </p>
      </div>
      <div className="navheighbelow"></div>
      <div className="navheighbelow"></div>
      <div className="navheighbelow"></div>
      <div className="navheighbelow"></div>
    </>
  );
}
